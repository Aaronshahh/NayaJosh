import { NextResponse } from "next/server";
import { getBearerToken, verifySessionToken } from "@/lib/auth";
import { EVENT_DETAILS, roleAllowsEvent, type EventKey } from "@/lib/events";
import { sendRsvpConfirmation } from "@/lib/email";
import { getSupabaseAdmin, type InviteeResponse, type InvitePartyRow } from "@/lib/supabase";

type RsvpBody = {
  eventKey?: EventKey;
  invitePartyId?: string;
  email?: string;
  inviteeResponses?: InviteeResponse[];
  guestNames?: string[];
  message?: string;
};

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export async function POST(request: Request) {
  try {
    const role = verifySessionToken(getBearerToken(request));
    if (!role || role === "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as RsvpBody;
    const eventKey = body.eventKey;
    const invitePartyId = body.invitePartyId?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const submittedInviteeResponses = Array.isArray(body.inviteeResponses) ? body.inviteeResponses : [];
    const submittedGuestNames = Array.isArray(body.guestNames) ? body.guestNames : [];
    const guestNames = submittedGuestNames.map((name) => String(name).trim()).filter(Boolean);
    const message = body.message?.trim() || null;

    if (!eventKey || !(eventKey in EVENT_DETAILS)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }
    if (!roleAllowsEvent(role, eventKey)) {
      return NextResponse.json({ error: "This event is not available with your invite" }, { status: 403 });
    }
    if (!invitePartyId) {
      return NextResponse.json({ error: "Select your invitation party from the search results" }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    const event = EVENT_DETAILS[eventKey];
    const supabase = getSupabaseAdmin();
    const { data: partyData, error: partyError } = await supabase
      .from("invite_parties")
      .select("id, event_key, display_name, invited_names, party_size_limit, sort_order")
      .eq("id", invitePartyId)
      .eq("event_key", eventKey)
      .single();

    if (partyError || !partyData) {
      return NextResponse.json({ error: "That invitation party could not be found" }, { status: 400 });
    }

    const party = partyData as InvitePartyRow;
    const normalizedResponseNames = submittedInviteeResponses.map((response) =>
      normalizeName(String(response?.name ?? ""))
    );
    const hasEveryInviteeResponse =
      submittedInviteeResponses.length === party.invited_names.length &&
      new Set(normalizedResponseNames).size === party.invited_names.length &&
      submittedInviteeResponses.every((response) => typeof response?.attending === "boolean") &&
      party.invited_names.every((name) => normalizedResponseNames.includes(normalizeName(name)));

    if (!hasEveryInviteeResponse) {
      return NextResponse.json(
        { error: "Please accept or decline for each person named on the invitation" },
        { status: 400 }
      );
    }

    const inviteeResponses = party.invited_names.map((name) => {
      const response = submittedInviteeResponses.find(
        (candidate) => normalizeName(String(candidate.name ?? "")) === normalizeName(name)
      )!;
      return { name, attending: response.attending };
    });
    const attending = inviteeResponses.some((response) => response.attending);
    const maxAdditionalGuests = party.party_size_limit - party.invited_names.length;
    if (
      guestNames.length > maxAdditionalGuests ||
      guestNames.some((name) => name.length > 100)
    ) {
      return NextResponse.json(
        {
          error: `This invitation allows ${maxAdditionalGuests} additional ${
            maxAdditionalGuests === 1 ? "guest" : "guests"
          }`,
        },
        { status: 400 }
      );
    }

    const attendingGuestNames = attending ? guestNames : [];

    const { data, error } = await supabase
      .from("rsvps")
      .insert({
        invite_party_id: party.id,
        full_name: party.display_name,
        email,
        event_key: eventKey,
        event_name: event.name,
        attending,
        guest_count: attendingGuestNames.length,
        guest_names: attendingGuestNames,
        invitee_responses: inviteeResponses,
        message,
        event_date: event.date,
        event_time: event.time,
        event_location: event.location,
      })
      .select("id")
      .single();

    if (error) {
      console.error("supabase insert error", error);
      return NextResponse.json({ error: "Could not save RSVP" }, { status: 500 });
    }

    try {
      await sendRsvpConfirmation({
        fullName: party.display_name,
        email,
        attending,
        inviteeResponses,
        guestNames: attendingGuestNames,
        message,
        eventName: event.name,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
      });
    } catch (emailError) {
      console.error("email error", emailError);
      return NextResponse.json(
        {
          id: data.id,
          warning: "RSVP saved, but confirmation email could not be sent. Check Resend settings.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ id: data.id, ok: true }, { status: 201 });
  } catch (error) {
    console.error("rsvp error", error);
    return NextResponse.json({ error: "Unable to submit RSVP" }, { status: 500 });
  }
}
