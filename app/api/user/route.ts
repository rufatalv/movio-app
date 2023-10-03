import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const data = await req.json();
  const { currentPassword, newPassword, ...newData } = data;

  const { name, email } = newData;

  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let newPasswordHash;

  if (newPassword) {
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.hashedPassword!
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid credentials!" },
        { status: 401 }
      );
    }

    newPasswordHash = await bcrypt.hash(newPassword, 12);
  }

  const userUpdated = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data: {
      ...newData,
      hashedPassword: newPasswordHash,
    },
  });


  return NextResponse.json(userUpdated);
}
