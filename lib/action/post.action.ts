"use server"
import { db } from "../db"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../session"
export async function AddComment(postId: string , postType: string, comment: string,userId: string) {
    const result = await db.comment.create({
        data: {
            text: comment,
            userId: userId,
            postId: postId
        }
    })

    revalidatePath(`/view/${postType}/${postId}`)

}

export async function Like (postId: string, postType: string, userId: string) {
    const result = await db.like.create({
        data: {
            userId: userId,
            postId: postId
        }
    })

    revalidatePath(`/view/${postType}/${postId}`)
}

export async function SearchPost(query:string){
    const posts = await db.post.findMany({
        where:{
            title:query
        }
    })

    return posts

}