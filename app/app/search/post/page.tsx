import { db } from "@/lib/db"
import { Post } from "@prisma/client"
import { PostItem } from "@/components/post"

async function getPost(query: string) {

    const posts = await db.post.findMany({
        where: {
            title: {
                search: query
            },
            description: {
                search: query
            }
        },
        select: {
            id: true,
            title: true,
            description: true,
            hash: true,
            type: true,
            keywords: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    email: true,
                }
            }
        },
    })

    return posts
}


type SearchParamsProps = {
    searchParams: {
        query: string
    }
}

export default async function Page({ searchParams }: SearchParamsProps) {

    console.log(searchParams)

    const posts = await getPost(searchParams.query)
    return posts.length ? (
        <div className="flex flex-col gap-8">
            {posts.map((post, index) => (
                <PostItem post={post} key={index} />
            ))}
        </div>

    ) : <div className="font-light">Aucune publication</div>
}
