import TopicsNav from "@/components/topics-nav"
import { ScreenCenter } from "@/components/ui/display"
import SearchText from "@/components/search-text"
import BackBtn from "@/components/backBtn";
import { topicsPage } from "@/types";

export const topicsSearchPage: topicsPage = {
    items: [
        {
            title: "Post",
            href: "/search/post"
        },
        {
            title:"People",
            href:"/search/user"
        }
    ]
}
export default async function Layout(props: { children: React.ReactNode }) {


    return (
        <ScreenCenter size={"xl"} className="mt-[2vw] p-8 relative">
            <BackBtn/>
            <SearchText />
            <TopicsNav items={topicsSearchPage.items} persistQuery/>
            <div className="mt-8"></div>
            {props.children}
        </ScreenCenter>
    )
}