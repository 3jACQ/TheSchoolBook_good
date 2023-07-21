import { NavBar } from "@/components/navbar-main"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function Layout({ children, }: { children: React.ReactNode }) {
    const user = await getCurrentUser()
    if (!user) {
        return notFound()
    }
    return (
        <>
            <NavBar user={user} />
            {children}
        </>
    )
}