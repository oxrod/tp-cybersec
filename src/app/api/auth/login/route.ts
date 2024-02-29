import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { username, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });

  if (user) {
    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    if (doPasswordsMatch) {
      const token = jwt.sign({ user }, "12345");
      return NextResponse.json({ user: { email: user.email }, token: token });
    } else {
      return NextResponse.json({ error: { message: "Invalid credentials" } });
    }
  }

  return NextResponse.json({ message: "ok" });
};
