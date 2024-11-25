import { getCookie } from "@/lib/cookie";
import { redirect } from "next/navigation";

export default async function PanelPage() {
    const token = await getCookie("authToken");

    if (!token) {
        redirect("/");
    }

    return (
        <h1 className=" text-4xl font-bold text-center mt-10">Panel Page</h1>
    )
}