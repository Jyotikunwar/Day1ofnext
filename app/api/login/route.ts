import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // Frontend बाट email र password लिने
    const { email, password } = await request.json();

    // Check required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required." },
        { status: 400 }
      );
    }

    // Database बाट email खोज्ने
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // User भेटिएन भने
    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    // Password compare गर्ने
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    // Password नमिलेमा
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );
    }

    // Login Success Response
    const response = NextResponse.json(
      {
        message: "Login Successful",
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          contact: user.contact,
        },
      },
      { status: 200 }
    );

    // Cookie Set
    response.cookies.set("isLoggedIn", "true", {
      httpOnly: true,
      secure: false, // Development मा false
      sameSite: "lax",
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}