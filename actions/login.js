'use server';

import { redirect } from "next/navigation";

import supabase from "@/supabase/supabase.config";

import { verifyPassword } from "@/lib/hashPassword";
import { deleteCookie, generateToken, setCookie } from "@/lib/cookie";


export default async function login(currentState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const errors = {};

    try {
        const { data, error } = await supabase
            .from("app_users")
            .select("email, password")
            .eq("email", email)
            .single();

        if (!data) errors.email = "User does not exist.";
        if (error) errors.email = error.message;
        if (Object.keys(errors).length > 0) return { errors };

        const isPasswordValid = await verifyPassword(password, data.password);

        if (!isPasswordValid) errors.password = "The password is not valid.";
        if (Object.keys(errors).length > 0) return { errors };

        await deleteCookie("authToken");

        const newToken = generateToken();

        const authToken = await setCookie("authToken", newToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
            sameSite: "strict",
        });

        const information = await supabase
            .from("app_users")
            .update({ authToken })
            .eq("email", email);

        console.log(information);

    } catch (error) {
        return { errors: { tryAgain: "Please try again later.", error } }
    }

    redirect("/panel");
}
