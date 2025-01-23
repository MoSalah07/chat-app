"use server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, userName, password } = body;

  if (!email || !userName || !password) {
    return NextResponse.json(
      { success: false, message: `Missing information` },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already exists",
          },
          { status: 401 }
        );
      }
    }

    const user = await prisma.user.create({
      data: {
        email,
        userName,
        hashedPassword,
      },
      select: {
        conversationIds: true,
        userName: true,
        email: true,
        createdAt: true,
        emailVerified: true,
        id: true,
        image: true,
        updatedAt: true,
        seenMessageIds: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "User created successfully", user },
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}
