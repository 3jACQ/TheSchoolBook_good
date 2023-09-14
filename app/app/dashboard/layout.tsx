import TopicsNav from "@/components/topics-nav"
import { ScreenCenter } from "@/components/ui/display"
import { topicsPage } from "@/types";
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export const topicsSearchPage: topicsPage = {
    items: [
        {
            title: "Profile",
            href: "/app/dashboard/profile"
        },
        {
            title:"Vos Posts",
            href:"/app/dashboard/posts"
        },
        {
            title:"Relations",
            href:"/app/dashboard/relations"
        },{
            title:"Likes",
            href:"/app/dashboard/likes"
        }
    ]
}
export default async function Layout(props: { children: React.ReactNode }) {

    const user = await getCurrentUser()
    if (!user) {
        return notFound()
    }
    
    return (
        <ScreenCenter size={"xl"} className="mt-[2vw] p-8 relative">
            <TopicsNav items={topicsSearchPage.items}/>
            <div className="mt-8"></div>
            {props.children}
        </ScreenCenter>
    )
}
