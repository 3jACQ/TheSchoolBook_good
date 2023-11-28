import React from "react"
import { ScreenCenter } from "@/components/ui/display"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { PostItem } from "@/components/post"
import { Button } from "@/components/ui/button"
import { Post } from "@prisma/client"
import { UserCard } from "@/components/userCard"

import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { revalidatePath } from "next/cache"

async function getUsersFollowedByUser(userId: string) {
    const followingUsers = await db.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: true,
      },
    });
  
    return followingUsers.map((follow) => follow.following);
  }


export default async function PostDashBoard() {

    
    const user = await getCurrentUser()
    if (!user) return null
   
    const users = await getUsersFollowedByUser(user.id)
    console.log(users)

    return (
        <>
            <ScreenCenter size={"xl"} className="flex gap-4">
                <div className="w-full">
                    <h1 className="  mb-16 text-xl sm:text-3xl font-bold text-wnoir">Vos Relations</h1>
                    <div className="flex flex-col gap-8">
                        {users.map((us, index) => (
                            <div key={index}>
                                <UserCard user={us} follow={true}/>
                            </div>
                        ))}
                    </div>
                </div>

            </ScreenCenter>
        </>
    )
}