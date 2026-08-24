import { NextResponse } from "next/server";
import { getBearerToken, verifySessionToken } from "@/lib/auth";
import { EVENT_DETAILS, roleAllowsEvent, type EventKey } from "@/lib/events";
import { sendRsvpConfirmation } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase";

type RsvpBody = {
  eventKey?: EventKey;
  fullName?: string;
  email?: string;
  attending?: boolean;
  guestCount?: number;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const role = verifySessionToken(getBearerToken(request));
    if (!role || role === "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as RsvpBody;
    const eventKey = body.eventKey;
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const attending = Boolean(body.attending);
    const guestCount = Number(body.guestCount ?? 1);
    const message = body.message?.trim() || null;

    if (!eventKey || !(eventKey in EVENT_DETAILS)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }
    if (!roleAllowsEvent(role, eventKey)) {
      return NextResponse.json({ error: "This event is not available with your invite" }, { status: 403 });
    }
    if (!fullName || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
    }
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 6) {
      return NextResponse.json({ error: "Guest count must be between 1 and 6" }, { status: 400 });
    }

    const event = EVENT_DETAILS[eventKey];
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("rsvps")
      .insert({
        full_name: fullName,
        email,
        event_key: eventKey,
        event_name: event.name,
        attending,
        guest_count: attending ? guestCount : 0,
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
        fullName,
        email,
        attending,
        guestCount: attending ? guestCount : 0,
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
