import { NextResponse } from 'next/server';

const clean = (value: unknown, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown> | null;
    const name = clean(body?.name, 120);
    const phone = clean(body?.phone, 40);
    const email = clean(body?.email, 160);

    if (!name || !phone || !email) {
      return NextResponse.json(
        { ok: false, message: 'Name, phone, and email are required.' },
        { status: 400 },
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    // Keep the response contract stable for the current client. A persistence
    // provider can be connected here later without changing the form flow.
    return NextResponse.json({
      ok: true,
      message: 'Thank you. Our property advisor will contact you shortly.',
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Please try again.' },
      { status: 400 },
    );
  }
}
