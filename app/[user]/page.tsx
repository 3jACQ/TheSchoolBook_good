import { getCurrentUser } from "@/lib/session"
import { redirect } from 'next/navigation'
import { db } from "@/lib/db";

async function getUserData(email: string) {

    const user = await db.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            description: true,
        },
    })
    return user
}

async function getPublications(userId: string) {
    const publications = await db.post.findMany({
        where: {
            authorId: userId
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
        orderBy: [
            {
                id: 'desc'
            }
        ],
    })
    return publications
}

async function countFollowersByUser(userId: string) {
    const followerCount = await db.follow.count({
        where: {
            followingId: userId,
        },
    });
    return followerCount;
}


export default async function SiteHomePage({
    params,
}: {
    params: { user: string };
}) {

    const u = await getCurrentUser()

    if(u){
        return redirect(`/app/user/${params.user}`)
    }

    const e = params.user.replace("%40", "@")
    const user = await getUserData(e)
    if (!user) return null
    const publications = await getPublications(user.id)
    const followercount = await countFollowersByUser(user.id)

    return (
        <div>
            <p>User: {params.user}</p>
        </div>
    );
}