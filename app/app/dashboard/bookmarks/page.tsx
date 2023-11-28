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
    const bookmarks = await db.bookMark.findMany({
        where: {
            userId: userId,
        },
        include: {
            post: true,
        },
    });

    // Extract and return the posts from the bookmarks
    const posts = bookmarks.map((bookmark: any) => bookmark.post);

    return posts
}


export default async function BookMarkDashBoard() {


    const user = await getCurrentUser()
    if (!user) return null


    const publications = await getPublications(user.id)

    return (
        <>
            <ScreenCenter size={"xl"} className="flex gap-4">
                <div className="w-full">
                    <h1 className=" mb-16 text-xl  sm:text-3xl font-bold ">Publications enregistrées</h1>
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