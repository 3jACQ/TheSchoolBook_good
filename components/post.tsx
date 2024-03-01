"use client"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Check, Copy, MoreHorizontal, Share2, Trash } from "lucide-react"
import { useTransition } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { DeletePost } from "@/lib/action/post.action"
import { DialogShareUrl } from "./DialogShareUrl"
import { useRef, useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { set } from "zod"

interface PostItemProps {
    post: any,
    isAuthor?: boolean
}

interface AuthorItemProps {
    author: any,

}

function AuthorItem({ author }: AuthorItemProps) {
    return (
        <Link href={`/app/user/${author.email}`} className="flex items-center gap-2">
            <img className="w-[24px] h-[24px] rounded-full" src={author.image} alt="" />
            <p className="font-light text-sm">{author.name}</p>
        </Link>
    )
}

export function PostItem({ post, isAuthor }: PostItemProps) {
    const keywords = post.keywords.split('|')
    const [isPending, startTransition] = useTransition()
    const [isCopied, setIsCopied] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null);

    const delPost = async () => {
        startTransition(()=>{
            DeletePost(post.id)
        })
    }
    const handleCopyClick = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand('copy');
        }
        setIsCopied(true);
    };

    const handleDelete = () => {
        if(confirm("Are you sure you want to delete this post?")){
            console.log("delete")
            delPost()
        }
        
    }

    keywords.shift()
    return (
        <div className="flex flex-col gap-4 max-w-[750px] border-b">
            {!isAuthor && <AuthorItem author={post.author} />}
            <Link href={`/app/view/${post.type}/${post.id}`}>
                <div className="text-lg sm:text-xl sm:font-bold" >{post.title}</div>
                <p className="font-light postText text-secondaryText">{post.description}</p>
            </Link>

            <div className="flex justify-between items-center mt-4 mb-8 max-w-[650px]">
                <div className="flex gap-2 flex-wrap">
                    {keywords.map((keyword: string, index: number) => (<Badge key={index}>{keyword}</Badge>))}
                </div>


                <div className="flex items-center-justify-center ">
                    <Dialog onOpenChange={() => setIsCopied(false)}>
                        <DropdownMenu>
                            <DropdownMenuTrigger><MoreHorizontal size={24} /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2">
                                            <Share2 size={16} strokeWidth={1} />
                                            <p className="font-light">Share</p>
                                        </div>
                                    </DialogTrigger>




                                </DropdownMenuItem>
                                {isAuthor && <DropdownMenuSeparator /> && <DropdownMenuItem>
                                    <div onClick={handleDelete} className="flex items-center gap-2">
                                        <Trash size={16} strokeWidth={1} color="#ff0000"/>
                                        <p className="font-light text-[#ff0000]">Delete</p>
                                    </div>
                                </DropdownMenuItem>
                                }

                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Share link</DialogTitle>
                                <DialogDescription>
                                    Anyone who has this link will be able to view this.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        id="link"
                                        ref={inputRef}
                                        defaultValue={"https://theschoolbook.app/" + post.author.email + "/view/" + post.id}
                                        readOnly
                                    />
                                </div>
                                <Button onClick={handleCopyClick} size="sm" className="px-3">
                                    <span className="sr-only">Copy</span>
                                    {!isCopied ? <Copy className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                                </Button>
                            </div>

                        </DialogContent>

                    </Dialog>

                </div>

            </div>


        </div >
    )
}
