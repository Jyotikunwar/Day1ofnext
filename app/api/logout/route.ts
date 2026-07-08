import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    {
      message: "Logout Successful",
    },
    { status: 200 }
  );

  // Cookie Delete
  response.cookies.set("isLoggedIn", "", {
    expires: new Date(0),
    path: "/",
  });

  return response;
} 