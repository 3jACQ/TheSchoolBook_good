import { db } from "@/lib/db"
import { Post } from "@prisma/client"
import { PostItem } from "@/components/post"

async function getPost() {
    const posts = await db.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            hash: true,
            type: true,
            keywords: true,
            author: {
                select: {
                    id:true,
                    name: true,
                    image: true,
                    email: true,
                }
            }
        },
        orderBy: [
            {
                id: 'desc'
            }
        ],
    })
    return posts
}



export default async function Page() {
    const posts = await getPost()
    console.log(posts)
    return posts.length ? (
        <div className="flex flex-col gap-8">
            {posts.map((post, index) => (
                <PostItem post={post} key={index} />
            ))}
        </div>

    ) : <div className="font-light">Aucune publication</div>
}
