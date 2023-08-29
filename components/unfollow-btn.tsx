"use client";
import { Button } from "./ui/button"
import { Unfollow } from "@/lib/action/user.action"
import { useTransition } from "react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
interface FollowBtnProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string,
    currentUser:string
}

export function Unfollowbtn({ id ,currentUser,className}: FollowBtnProps) {
    let [isPending, startTransition] = useTransition()
    let pathname = usePathname()
    return (
        <Button variant="ghost" className={cn(className)} onClick={() => startTransition(() => Unfollow(id,currentUser, pathname))} >Unfollow</Button> 
    )
}