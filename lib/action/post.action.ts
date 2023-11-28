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


export async function bookMark (postId: string, postType: string, userId: string) {
    //CHECK IF ALREADY BOOKMARKED
    const isBookMarked = await db.bookMark.findFirst({
        where:{
            postId: postId,
            userId: userId
        }
    })

    if(isBookMarked){
        await db.bookMark.delete({
            where:{
                id: isBookMarked.id
            }
        })
        revalidatePath(`/view/${postType}/${postId}`)
        return
    }
    const result = await db.bookMark.create({
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