"use client"
import { Button } from "./ui/button";
import { comments } from "@/lib/validations/post";
import { AddComment } from "@/lib/action/post.action";
import { useTransition, useState } from "react";


interface CommentFormProps {
    authorName: any;
    authorImg: any;
    postId: string;
    postType: string;
    authorId: any;
}


export const CommentForm: React.FC<CommentFormProps> = ({ authorName, authorImg, postId, postType, authorId }) => {
    let [isPending, startTransition] = useTransition()
    let [comment, setComment] = useState<string>("")
    const postComment = async (e: any) => {
        e.preventDefault()
        if (comment.length > 0) {
            startTransition(() => {
                AddComment(postId, postType, comment, authorId)
                setComment("")
            })
        }
    }

    return (
        <div className="shadow-md p-4 rounded sm:w-[400px] mt-4 w-full">
            <div className="flex items-center gap-2">
                <img className="w-[32px] h-[32px] rounded-full" src={authorImg} alt="" />
                <p className="font-light text-sm">{authorName.split(' ')[0]}</p>
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="font-light text-sm mt-4 t w-full" name="" id="" style={{ resize: 'none' }} rows={3} placeholder="Write your comment..."></textarea>
            <div className=" mt-2 flex justify-end">
                <Button disabled={comment.length < 3} size={"sm"} onClick={postComment} className="rounded-full h-7 px-4">Post</Button>
            </div>
        </div>
    )
}