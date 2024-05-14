
import * as React from "react"

import { ScreenCenter } from "@/components/ui/display"
import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import { db } from "@/lib/db";
import ContentPageHeader from "@/components/content-page-header";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar-landing";
async function getPostData(id: string) {
    const post = await db.post.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            description: true,
            hash: true,
            createdAt: true,
            type: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    email: true,
                }
            }
        }
    })
    return post
}



export default async function Page({ params }: { params: { id: string } }) {

    const post = await getPostData(params.id)
    const data = await fetch(`https://notion-api.splitbee.io/v1/page/${post?.hash.split("-").at(-1)}`).then(res => res.json());

    return post ? (
        <>
        <NavBar/>
            <div className="mt-[5vw]">
                <ScreenCenter size={"md"} className="px-4">

                    <ContentPageHeader dontfollow={true} type={post.type} title={post.title} author={post.author} hash={post.hash} id={post.id} createdAt={post.createdAt} />
                    <React.Suspense fallback={<p>Loading content from notion...</p>}>
                        <div className="mt-8 mb-16 dark:prose-invert">
                            <NotionRenderer blockMap={data} />
                        </div>

                    </React.Suspense>
                </ScreenCenter>
                <Footer></Footer>
            </div>

        </>) : <ScreenCenter size={"md"} className="px-4"><div className="font-light">Le Post n'existe pas</div></ScreenCenter>

}