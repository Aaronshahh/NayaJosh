import { NextResponse } from "next/server";
import { createSessionToken, resolvePasswordRole } from "@/lib/auth";
import { eventsForRole } from "@/lib/events";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password ?? "";
    const role = resolvePasswordRole(password);

    if (!role) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const token = createSessionToken(role);
    return NextResponse.json({
      role,
      token,
      events: eventsForRole(role),
    });
  } catch (error) {
    console.error("unlock error", error);
    return NextResponse.json({ error: "Unable to unlock site" }, { status: 500 });
  }
}
