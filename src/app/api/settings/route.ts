import { NextResponse } from "next/server"

let settings = {
  name: "Francisco",
  email: "francisco@example.com",
  avatar: null,
  darkMode: true,
  notifications: true,
  twoFA: false,
  language: "en",
}

// GET: Return current settings
export async function GET() {
  return NextResponse.json(settings)
}

// POST: Update settings
export async function POST(req: Request) {
  const body = await req.json()
  settings = { ...settings, ...body }
  return NextResponse.json({ success: true, settings })
}
