import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { username, password } = await req.json();

  try {
    const encodedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: username,
        password: encodedPassword,
      },
    });

    if (user) {
      return NextResponse.json({ message: "User successfully created" });
    }
  } catch (e) {
    return NextResponse.json({
      error: { message: "Error while trying to create user" },
    });
  }
};
