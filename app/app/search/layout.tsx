import TopicsNav from "@/components/topics-nav"
import { ScreenCenter } from "@/components/ui/display"
import SearchText from "@/components/search-text"
import BackBtn from "@/components/backBtn";
import { topicsPage } from "@/types";

import { SlidersHorizontal } from "lucide-react";
import { Filter } from "@/components/filters";
import { Separator } from "@/components/ui/separator";


const topicsSearchPage: topicsPage = {
    items: [
        {
            title: "Post",
            href: "/app/search/post"
        },
        {
            title: "People",
            href: "/app/search/user"
        }
    ]
}
export default async function Layout(props: { children: React.ReactNode }) {


    return (
        <ScreenCenter size={"xl"} className="mt-[2vw] p-8 relative">
            <SearchText />
            <TopicsNav items={topicsSearchPage.items} persistQuery>
                <div className="translate-y-1 cursor-pointer text-secondaryText hover:text-wnoir">
                    <Filter>
                        <SlidersHorizontal size={16} />
                    </Filter>



                </div>

            </TopicsNav>
            <div className="mt-8"></div>
            <Separator className="mt-6 mb-8" />
            {props.children}
        </ScreenCenter>
    )
}