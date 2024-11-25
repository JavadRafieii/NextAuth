'use server';

import { redirect } from "next/navigation";

import supabase from "@/supabase/supabase.config";

import { hashPassword } from "@/lib/hashPassword";
import { generateToken, setCookie } from "@/lib/cookie";


export default async function signup(currentState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = {};

  if (!email.includes("@") || email.trim() === "") errors.email = "Please enter a valid email.";
  if (password.trim() === "" || password.trim().length < 8) errors.password = "Please enter a valid password.";
  if (Object.keys(errors).length > 0) return { errors };

  const hashedPassword = await hashPassword(password);

  try {

    const newToken = generateToken();

    const authToken = await setCookie("authToken", newToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
    });

    const { data, error } = await supabase
      .from('app_users')
      .insert([
        {
          email: email,
          password: hashedPassword,
          authToken,
        },
      ]);

    if (error) {
      if (error.code === "23505") {
        return { errors: { email: "This email is already registered. Please use another email." } };
      }
    }

    console.log({ email, hashedPassword });
    

  } catch (error) {
    console.log(error);

    return { errors: { tryAgain: "Please try again later.", error } }
  }

  redirect("/panel");
}