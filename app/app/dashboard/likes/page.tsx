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

async function getLikedPublication(userId: string) {
    const posts = await db.post.findMany({
        where: {
            likes:{
                some:{
                    userId: userId
                }
            }
        },
        include: {
            author: true,
        },
    });
    return posts
}


export default async function PostDashBoard() {

    
    const user = await getCurrentUser()
    if (!user) return null

   
    const publications = await getLikedPublication(user.id)

    return (
        <>
            <ScreenCenter size={"xl"} className="flex gap-4">
                <div className="w-full">
                    <h1 className=" mb-16 sm:text-3xl text-xl font-bold ">Publications aimées</h1>
                    <div className="flex flex-col gap-8">
                        {publications.map((post, index) => (
                            <div key={index}>
                                <PostItem isAuthor={false} post={post} />

                            </div>
                        ))}
                    </div>
                </div>

            </ScreenCenter>
        </>
    )
}