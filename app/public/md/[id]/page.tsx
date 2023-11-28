import { db } from "@/lib/db"
import MarkdownPage from "@/components/markdown-page"
import { ScreenCenter } from "@/components/ui/display"
import ContentPageHeader from "@/components/content-page-header"
import { Suspense } from 'react'
import Link from "next/link"
import { notFound } from "next/navigation"

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

    if(!post) return notFound()
    if(!post.author.image){
        post.author.image = "https://www.gravatar.com"
    }

    return post ? (
        <>
            <div className="mt-[5vw]">
                <ScreenCenter size={"md"} className="px-4">
                    <h1 className="text-xl sm:text-5xl font-bold">{post.title}</h1>
                    <div className="flex items-center gap-2 mt-10">
                        <img className="w-[44px] h-[44px] rounded-full" src={post.author.image} alt="" />
                        <div className="flex flex-col">
                            <Link href={`/app/user/${post.author.email}`}> <div className="flex items-center gap-2"><p >{post.author.name}</p> </div></Link>
                            <p className="text-secondaryText text-sm"> {post.createdAt.toDateString().split(" ")[1]} {post.createdAt.toDateString().split(" ")[2]} </p>
                        </div>
                    </div>

                    <div className="border-b mt-4 mb-8">

                    </div>

                    <Suspense fallback={<p>Loading content from ipfs...</p>}>
                        <MarkdownPage hash={post.hash} />
                    </Suspense>
                </ScreenCenter>
            </div>
        </>) : <ScreenCenter size={"md"} className="px-4"><div className="font-light">Le Post n'existe pas</div></ScreenCenter>
}