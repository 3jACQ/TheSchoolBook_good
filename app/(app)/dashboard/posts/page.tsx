import React from "react"
import { ScreenCenter } from "@/components/ui/display"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { PostItem } from "@/components/post"
import { Button } from "@/components/ui/button"
import { Post } from "@prisma/client"


import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { revalidatePath } from "next/cache"

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


export default async function PostDashBoard() {

    
    const user = await getCurrentUser()
    if (!user) return null

    async function deletePost(postId: string) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        })

        if (!response?.ok) {
            toast({
                title: "Something went wrong.",
                description: "Your post was not deleted. Please try again.",
                variant: "destructive",
            })
        }

        return true
    }


   
    const publications = await getPublications(user.id)

    return (
        <>
            <ScreenCenter size={"xl"} className="flex gap-4">
                <div className="w-full">
                    <h1 className=" mb-8 text-xl font-bold text-green-800">Vos Publications</h1>
                    <div className="flex flex-col gap-8">
                        {publications.map((post, index) => (
                            <div key={index}>
                                <PostItem isAuthor={true} post={post} />

                            </div>
                        ))}
                    </div>
                </div>

            </ScreenCenter>
        </>
    )
}