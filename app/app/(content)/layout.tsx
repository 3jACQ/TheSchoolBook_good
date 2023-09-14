import TopicsNav from "@/components/topics-nav"
import { ScreenCenter } from "@/components/ui/display"
import { topicsMainPage } from "@/config/main"
export default async function Layout(props: { children: React.ReactNode }) {


    return (
        <ScreenCenter size={"xl"} className="mt-[2vw] p-8">
            <TopicsNav items={topicsMainPage.items}/>
            <div className="mt-8"></div>
            {props.children}
        </ScreenCenter>
    )
}