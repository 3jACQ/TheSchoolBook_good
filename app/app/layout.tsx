import { NavBar } from "@/components/navbar-main"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
export default async function Layout(props: { children: React.ReactNode}) {
    const user = await getCurrentUser()
    if (!user) {
        return notFound()
    }
    
    return (
        <>
            <NavBar user={user}/>
            <div className="mb-0 mt-0 sm:mb-16 sm:mt-16">

            </div>
            {props.children}
        </>
    )
}