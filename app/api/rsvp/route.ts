import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, eventId, eventTitle, startsAt } = body ?? {};

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    // TODO: qui integriamo Brevo/Mailchimp/Sheet/Zapier
    console.log("RSVP:", { email, eventId, eventTitle, startsAt });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
