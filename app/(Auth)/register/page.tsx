"use client";
import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background";
import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";
import { useAuthStore } from "@/store/Auth"; // object → destructuring
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterPage() {
    const router = useRouter(); // value → direct assignment
    const { createAccount, login } = useAuthStore();  // object → destructuring
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //collect data
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const name: string = `${firstName} ${lastName}`;

        //validate
        if (!email || !password || !firstName || !lastName) {
            setError(() => "All fields are required");
            return;
        }

        //call the store
        setLoading(true);
        setError(() => "");

        const response = await createAccount(
            email?.toString() ?? "",
            password?.toString() ?? "",
            name
        );

        if (response.error) {
            setError(() => response.error!.message);
        } else {
            const loginResponse = await login(
                email.toString(),
                password.toString()
            );
            if (loginResponse.error) {
                setError(() => loginResponse.error!.message);
            } else {
                router.push("/");
            }
        }
        setLoading(false);
    };


    return (
        <BubbleBackground interactive={true}>
            <div className="relative z-10">
                <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
                    <h1 className="text-4xl font-bold">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>
                        {error && <p className="mt-4 text-red-500">{error}</p>}
                    </form>
                </div>

            </div >
        </BubbleBackground>
    )
}

