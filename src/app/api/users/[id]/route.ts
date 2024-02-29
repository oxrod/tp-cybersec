import prisma from "@/utils/db";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const authHeader = req.headers.get("Authorization");

  let token: string = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    return NextResponse.json({ error: { message: "Unauthorized" } });
  }

  const decodedToken = jwt.decode(token) as { user: User };
  const userFromToken = decodedToken.user;

  try {
    const user = await prisma.$executeRawUnsafe(
      `SELECT * FROM User WHERE id = ${id}`
    );

    console.log(user);

    return NextResponse.json({
      status: "ok",
      data: user,
    });
  } catch (e) {
    return NextResponse.json({
      error: { message: "Couldn't create post" },
      content: e,
    });
  }
};
