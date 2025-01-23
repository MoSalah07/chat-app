"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
