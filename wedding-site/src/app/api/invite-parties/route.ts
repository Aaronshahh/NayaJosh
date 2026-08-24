import { NextResponse } from "next/server";
import { getBearerToken, verifySessionToken } from "@/lib/auth";
import { roleAllowsEvent, type EventKey } from "@/lib/events";
import { getSupabaseAdmin, type InvitePartyRow } from "@/lib/supabase";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchScore(value: string, query: string) {
  const normalized = normalize(value);
  if (normalized === query) return 0;
  if (normalized.startsWith(query)) return 1;
  if (normalized.split(" ").some((word) => word.startsWith(query))) return 2;
  if (normalized.includes(query)) return 3;
  return Number.POSITIVE_INFINITY;
}

export async function GET(request: Request) {
  try {
    const role = verifySessionToken(getBearerToken(request));
    if (!role || role === "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventKey = searchParams.get("eventKey") as EventKey | null;
    const query = normalize(searchParams.get("q") ?? "");

    if (!eventKey || !roleAllowsEvent(role, eventKey)) {
      return NextResponse.json({ error: "This event is not available with your invite" }, { status: 403 });
    }
    if (query.length < 2) {
      return NextResponse.json({ parties: [] });
    }

    const { data, error } = await getSupabaseAdmin()
      .from("invite_parties")
      .select("id, event_key, display_name, invited_names, party_size_limit, sort_order")
      .eq("event_key", eventKey)
      .order("sort_order");

    if (error) {
      console.error("invite party search error", error);
      return NextResponse.json({ error: "Could not search the invitation list" }, { status: 500 });
    }

    const parties = ((data ?? []) as InvitePartyRow[])
      .map((party) => {
        const rankedNames = party.invited_names
          .map((name) => ({ name, score: matchScore(name, query) }))
          .sort((a, b) => a.score - b.score);
        const partyScore = matchScore(party.display_name, query);
        const score = Math.min(rankedNames[0]?.score ?? Number.POSITIVE_INFINITY, partyScore);

        return {
          id: party.id,
          displayName: party.display_name,
          invitedNames: party.invited_names,
          maxAdditionalGuests: party.party_size_limit - party.invited_names.length,
          score,
          sortOrder: party.sort_order,
        };
      })
      .filter((party) => Number.isFinite(party.score))
      .sort((a, b) => a.score - b.score || a.sortOrder - b.sortOrder)
      .slice(0, 8)
      .map((party) => ({
        id: party.id,
        displayName: party.displayName,
        invitedNames: party.invitedNames,
        maxAdditionalGuests: party.maxAdditionalGuests,
      }));

    return NextResponse.json(
      { parties },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (error) {
    console.error("invite party search error", error);
    return NextResponse.json({ error: "Unable to search the invitation list" }, { status: 500 });
  }
}
