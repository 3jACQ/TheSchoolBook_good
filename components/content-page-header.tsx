import { Download, MoreHorizontal } from "lucide-react"
import { CommentForm } from "./comment-form"
import { getCurrentUser } from "@/lib/session"
import DownloadBtn from "./download-btn"
import { FollowBtn } from "./FollowBtn"
import { Unfollowbtn } from "./unfollow-btn"
import { User } from "@prisma/client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CommentList from "./comment-list"
import { Suspense } from "react"
import { type } from "os"
import { Separator } from "./ui/separator"
import { db } from "@/lib/db"
import LikeBtn from "./like-btn"
import Link from "next/link"
import { BookMarkBtn } from "./bookmark-btn"


interface ContentPageHeaderProps {
    title: string,
    author: any,
    hash: string,
    id: string,
    createdAt: Date,
    type: string,
}

async function getCommentsCount(id: string) {

    const count = await db.comment.count({
        where: {
            postId: id
        }
    })

    return count;

}

async function getLikeTotal(id: string) {
    const count = await db.like.count({
        where: {
            postId: id
        }
    })
    return count
}

async function checkFollow(id: string, currentUser: string) {
    const follow = await db.follow.findFirst({
        where: {
            followingId: id,
            followerId: currentUser
        }
    })
    if (follow) {
        return true
    } else {
        return false
    }
}

async function isBookMarked(id: string, currentUser: string) {

    const bookmark = await db.bookMark.findFirst({
        where: {
            postId: id,
            userId: currentUser
        }
    })
    if (bookmark) {
        return true
    } else {
        return false
    }

}



async function test(){
    console.log("test")
}

export default async function ContentPageHeader({ title, author, hash, id, createdAt, type }: ContentPageHeaderProps) {
    const user = await getCurrentUser()
    if (!user) return null
    const follow = await checkFollow(author.id, user.id)



    const commentsCount = await getCommentsCount(id)
    const likeCount = await getLikeTotal(id)

    const isBk = await isBookMarked(id, user.id)
    return (
        <div>
            <h1 className="text-xl sm:text-5xl font-bold">{title}</h1>
            <div className="flex items-center gap-2 mt-8">
                <img className="w-[44px] h-[44px] rounded-full" src={author.image} alt="" />
                <div className="flex flex-col">
                    <Link href={`/app/user/${author.email}`}> <div className="flex items-center gap-2"><p >{author.name}</p> . {follow ? <Unfollowbtn currentUser={user.id} id={author.id} className="text-green-800 hover:text-green-800/80" /> : <FollowBtn className="text-green-800 hover:text-green-800/80" currentUser={user.id} id={author.id} />} </div></Link>
                    <p className="text-secondaryText text-sm"> {createdAt.toDateString().split(" ")[1]} {createdAt.toDateString().split(" ")[2]} </p>
                </div>
            </div>

            <div className="flex mt-8 border-t border-b py-2 justify-between">
                <div className="flex gap-8">
                    <LikeBtn id={id} likeCount={likeCount} type={type} user={user} />
                    <Sheet >
                        <SheetTrigger>
                            <div className="flex items-center gap-1">
                                <svg className="cursor-pointer fill-[#A8A8A8] hover:fill-black duration-300 dark:hover:fill-white" width="26" height="26" viewBox="0 0 24 24" aria-label="responses"><path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path></svg>
                                <p className="text-xs text-[#A8A8A8]  pointer-events-none hover:text-black duration-300 dark:hover:text-white ">{commentsCount}</p>
                            </div>
                        </SheetTrigger>
                        <SheetContent size={"content"} className="min-w-[370px]">
                            <SheetHeader>
                                <SheetTitle>Comments ({commentsCount})</SheetTitle>
                            </SheetHeader>
                            <CommentForm authorId={user?.id} authorName={user?.name} authorImg={user?.image} postId={id} postType={type} />
                            <Separator className="mt-8 mb-2" />
                            <Suspense fallback={<p>Loading comments...</p>}>
                                <CommentList params={{ id: id }} />
                            </Suspense>

                        </SheetContent>
                    </Sheet>


                </div>

                <div className="flex items-center gap-8">
                    <BookMarkBtn  id={id} userId={user.id} postType={type} isBookM={isBk}/>
                    <DownloadBtn hash={hash} type={type} />
                    <MoreHorizontal className="cursor-pointer text-[#A8A8A8] hover:text-black duration-300 dark:hover:text-white" size={24} strokeWidth={1} />
                </div>
            </div>
        </div>
    )
}