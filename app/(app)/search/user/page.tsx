import { db } from "@/lib/db"
import { Post } from "@prisma/client"
import { PostItem } from "@/components/post"
import { UserCard } from "@/components/userCard"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"


async function getUser(query: string) {
    const users = await db.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query
                    }
                },
                {
                    email: {
                        contains: query
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            description: true
        }
    })
    return users
}


async function followedUser(user: string) {
    const followed = await db.follow.findMany({
        where: {
            follower: {
                id: user
            }
        },
        select: {
            followingId: true
        }
    })
    return followed
}

type SearchParamsProps = {
    searchParams: {
        query: string
    }
}

export default async function Page({ searchParams }: SearchParamsProps) {


    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const userFollow = await followedUser(user.id)

    const users = await getUser(searchParams.query)

    return users.length ? (
        <div className="flex flex-col gap-8">
            {users.map((user, index) => (
                <UserCard user={user} follow={userFollow.some(obj => obj.followingId === user.id)} />

            ))}
        </div>

    ) : <div className="font-light">Aucun utilisateur</div>
}
