import { useFormStatus } from "react-dom";

export default function Submit({ mode }) {
    const { pending, data, method, action } = useFormStatus();

    return (
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{mode === "login" ? "Login" : "Create"}</button>
    );
}