import { Metadata } from "next"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { ScreenCenter } from "@/components/ui/display"
export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
}


export default function LoginPage() {
    return (
        <>
            <div className="container flex h-screen w-screen flex-col items-center justify-center">
                <nav className="absolute left-4 top-4 md:left-8 md:top-8">
                    <ScreenCenter size={"xl"}>
                        <Logo />
                    </ScreenCenter>
                </nav>
                <div className="text-primary text-4xl font-bold text-center mt-[2vh] mb-6;">Welcome</div>
                <UserAuthForm />
            </div>

            

        </>
    )
}