'use server';

import { redirect } from "next/navigation";

import { deleteCookie } from "@/lib/cookie";

export default async function logout() {
    await deleteCookie("authToken");
    redirect("/");
}