"use client";

import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";
import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation";
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
    const { session } = useAuthStore();
    const router = useRouter()

    React.useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])

    if (session) {
        return null
    }

    return (
        <BubbleBackground interactive={true} className="flex min-h-screen items-center justify-center">
            <BackgroundBeams />
            <div className="relative z-10 w-full">{children}</div>
        </BubbleBackground>
    )
}


export default Layout