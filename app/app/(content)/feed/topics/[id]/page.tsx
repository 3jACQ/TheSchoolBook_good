import { PostItem } from "@/components/post";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";



async function getPost(filters?: string, type?: string) {

    const whereClause: any = {

    };

    if (filters) {
        filters = filters.replace("#", "")
        filters = filters.replaceAll("#", "|")
        filters = filters.replaceAll(" ", "")

        console.log("filters :")
        console.log(filters)


        whereClause.OR = {
            OR: filters.split("|").map((substring) => ({
                keywords: {
                    contains: `|${substring}`,
                },
            })),
        }
    }

    if (type && type !== "all") {
        whereClause.type = type;
    }
    console.log("request :")
    console.log(whereClause)
    const posts = await db.post.findMany({
        where: whereClause,
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
    });

    return posts;
}




async function getTopics(topicId: string) {
    const topics = await db.userFilter.findFirst({
        where: {
            id: topicId
        },
        select: {
            id: true,
            name: true,
            type: true,
            filter: true
        }
    }
    )
    return topics
}




export default async function Page({ params }: { params: { id: string } }) {

    const topics = await getTopics(params.id)

    if (!topics) return notFound()

    const posts = await getPost(topics.filter, topics.type)


    return posts.length ? (
        <div className="flex flex-col gap-8">
            {posts.map((post, index) => (
                <PostItem post={post} key={index} />
            ))}
        </div>

    ) : <div className="font-light">Aucune publication</div>
}
