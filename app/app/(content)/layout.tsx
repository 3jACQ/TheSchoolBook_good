

import TopicsNav from "@/components/topics-nav"
import { ScreenCenter } from "@/components/ui/display"
import { topicsMainPage } from "@/config/main"
import { NewFilter } from "@/components/newFilter"
import { Plus } from "lucide-react"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import { TopicsNavItemsTest } from "@/components/topics-nav"
import { Separator } from "@/components/ui/separator"
import { headers } from 'next/headers';

async function getTopics(userId: string) {
    const filters = await db.userFilter.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            type: true,
            filter: true
        }
    }
    )
    return filters
}



export default async function Layout(props: { children: React.ReactNode }) {

    const user = await getCurrentUser()


    if (!user) return notFound()

    const filters = await getTopics(user.id)




    return (
        <ScreenCenter size={"xl"} className="px-8">
            <div className="flex items-center gap-8 sticky top-0 bg-wblanc pb-6 pt-6">
                <NewFilter>
                    <svg className="min-w-[32px] font-light text-secondaryText  hover:text-wnoir cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6H5Z" /></svg>
                </NewFilter>
                <TopicsNav items={topicsMainPage.items}>


                    {filters.length > 0 && filters.map((filter, index) => (
                        <div key={index}>
                            <TopicsNavItemsTest title={filter.name} href={`/app/feed/topics/${filter.id}`} pathname="" />
                        </div>
                    ))}
                </TopicsNav>
            </div>
            
               <Separator className="sm:hidden mt-6 mb-8" />
                

            <div className="sm:mt-16 mt-8"></div>
            {props.children}
        </ScreenCenter>
    )
}