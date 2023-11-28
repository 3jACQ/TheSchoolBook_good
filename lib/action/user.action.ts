"use server"
import { db } from "../db"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../session"





export async function getTopics() {

    const user = await getCurrentUser();
    if(!user) return []
    const filters = await db.userFilter.findMany({
        where: {
            userId: user.id
        },
        select: {
            id: true,
            name: true,
            type: true,
            filter: true
        }
    }
    )
    return filters
}



export async function Follow(userId: string, user: string, path: string | null) {

    const result = await db.follow.create({
        data: {
            followingId: userId,
            followerId: user
        }
    })

    if (!path) {
        path = "/feed"
    }

    revalidatePath(path)

}

export async function Unfollow(userId: string, user: string, path: string | null) {

    const result = await db.follow.deleteMany({
        where: {
            followingId: userId,
            followerId: user
        }
    })

    if (!path) {
        path = "/feed"
    }

    revalidatePath(path)

}

export async function addFilter(userId: string, formData: FormData) {
    const result = await db.userFilter.create({
        data: {
            userId: userId,
            filter: formData.get("filter") as string,
            type: formData.get("type") as string ,
            name: formData.get("name") as string,
        }
    })

    revalidatePath("/app/feed?success")
}