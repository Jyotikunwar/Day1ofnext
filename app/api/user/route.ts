import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}