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

import { db } from "@/lib/db"


const checkUser = async (email: string) => {
    const user = await db.authorizedUser.findFirst({
        where: {
            email,
        },
    })

    if (user) {
        return true
    } else {
        return false
    }
    
}

type SearchParamsProps = {
    searchParams: {
        id: string
    }
}

export default async function LoginPage({ searchParams }: SearchParamsProps) {
    console.log(searchParams.id)
    let allow = await checkUser(searchParams.id)
    if(!searchParams.id){
        console.log("no id")
        allow = false
    }
    
    console.log(allow)
    if (!allow) {
        return <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <nav className="absolute left-4 top-4 md:left-8 md:top-8">
                <ScreenCenter size={"xl"}>
                    <Logo />
                </ScreenCenter>
            </nav>
            <div className="text-primary text-4xl font-bold text-center mt-[2vh] mb-6;">Welcome</div>
            <div className="text-primary text-4xl font-bold text-center mt-[2vh] mb-6;">You need to ask to try the application !</div>
        </div>
    }
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