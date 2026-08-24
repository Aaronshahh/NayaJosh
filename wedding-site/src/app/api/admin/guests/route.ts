import { NextResponse } from "next/server";
import { getBearerToken, verifySessionToken } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const role = verifySessionToken(getBearerToken(request));
    if (role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("rsvps")
      .select(
        "id, created_at, full_name, email, event_key, event_name, attending, guest_count, message, event_date, event_time, event_location"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("supabase list error", error);
      return NextResponse.json({ error: "Could not load guests" }, { status: 500 });
    }

    return NextResponse.json({ guests: data ?? [] });
  } catch (error) {
    console.error("admin guests error", error);
    return NextResponse.json({ error: "Unable to load guests" }, { status: 500 });
  }
}
