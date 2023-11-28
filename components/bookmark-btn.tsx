"use client"
import { bookMark } from "@/lib/action/post.action"
import { useTransition } from "react"



export  function BookMarkBtn({ id, userId, postType  ,isBookM}: { id: string, userId: string, postType: string , isBookM:boolean}) {
    
    const [isPending, startTransition] = useTransition()

    const bookmarkPost = (UserId: string, PostId: string, type: string) => {
        startTransition(() => {
            bookMark(PostId, type, UserId)
        })
    }

    return (
        <div className="cursor-pointer" onClick={() => bookmarkPost(userId,id,postType)}>

            {!isBookM ? <svg className=" fill-[#A8A8A8] hover:fill-black duration-300 dark:hover:fill-white" width="24" height="24" viewBox="0 0 24 24"  ><path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" ></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="currentColor" d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22V5Z" /></g></svg>}
        </div>)
}