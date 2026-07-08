import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    await prisma.user.delete({
      where: {
        id: body.id,
      },
    });

    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}