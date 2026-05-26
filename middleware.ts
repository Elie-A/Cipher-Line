import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const existing = req.cookies.get("cipher_user")?.value;

  if (!existing) {
    const id = crypto.randomUUID();

    res.cookies.set("cipher_user", id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}
