'use client'

import Link from "next/link";

import { useActionState } from "react";

import auth from "@/actions/auth";

const initialState = {};

export default function Form({ mode }) {
    const [state, formAction, isPending] = useActionState(auth.bind(null, mode), initialState);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action={formAction}>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                        </div>
                        {state?.errors?.email && <span className="text-sm text-red-500">{state.errors.email}</span>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                        </div>
                        {state?.errors?.password && <span className="text-sm text-red-500">{state.errors.password}</span>}
                    </div>

                    <div>
                        {isPending ? <p className="font-semibold text-lg text-indigo-600 text-center">Please wait...</p> : <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{mode === "login" ? "Login" : "Create"}</button>}
                    </div>
                </form>
                {state?.errors?.tryAgain && <span className="text-sm text-red-500 block text-center mt-5">{state.errors.tryAgain}</span>}
                {mode === "login" && <Link href="/?mode=signup" className="text-indigo-600 text-base text-center mt-5 block">Create a new account.</Link>}
                {mode === "signup" && <Link href="/?mode=login" className="text-indigo-600 text-base text-center mt-5 block">Login with existing account.</Link>}
            </div>
        </div>
    );
};