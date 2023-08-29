"use server"
import { db } from "../db"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../session"

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