import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, newPassword } = await req.json();
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Email not found" }, { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}
