import prisma from "@/utils/db";
import { Post, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { title, content } = (await req.json()) as Post;

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
    const user = await prisma.user.findFirst({
      where: {
        email: userFromToken.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: { message: "Couldn't find user" } });
    }

    await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: user,
        },
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Post created successfully",
    });
  } catch (e) {
    return NextResponse.json({
      error: { message: "Couldn't create post" },
      content: e,
    });
  }
};

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ status: "ok", data: posts });
  } catch (e) {
    return NextResponse.json({
      status: "error",
      data: { message: "Couldn't retrieve posts" },
    });
  }
};
