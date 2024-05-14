import { db } from "@/lib/db"
import MarkdownPage from "@/components/markdown-page"
import { ScreenCenter } from "@/components/ui/display"
import ContentPageHeader from "@/components/content-page-header"
import { Suspense } from 'react'
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/pdf-page"), {
    ssr: false
  });

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
                    id:true,
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
    
    return post ? (
        <>
            <div className="mt-[3vw]">
                <ScreenCenter size={"md"} className="px-4">
                    <ContentPageHeader dontfollow={true} type={post.type} title={post.title} author={post.author} hash={post.hash} id={post.id} createdAt={post.createdAt} />
                    <Suspense fallback={<p>Loading content from ipfs...</p>}>
                        <PDFViewer pdfUrl={`https://cloudflare-ipfs.com/ipfs/${post.hash}`} />
                    </Suspense>
                </ScreenCenter>
            </div>

        </>) : <div className="font-light">Le Post n'existe pas</div>

}