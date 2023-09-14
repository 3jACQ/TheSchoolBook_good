import Link from "next/link"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { MoreHorizontal } from "lucide-react"
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

export function PostItem({ post ,isAuthor}: PostItemProps) {
    const keywords = post.keywords.split('|')
    keywords.shift()
    return (
        <div className="flex flex-col gap-4 max-w-[750px] border-b">
           {!isAuthor && <AuthorItem author={post.author} />} 
            <Link href={`/app/view/${post.type}/${post.id}`}>
                <div className="text-xl font-bold" >{post.title}</div>
                <p className="font-light postText text-secondaryText">{post.description}</p>
            </Link>

            <div className="flex justify-between items-center mt-4 mb-8 max-w-[650px]">
                <div className="flex gap-2 flex-wrap">
                    {keywords.map((keyword: string,index:number) => (<Badge key={index}>{keyword}</Badge>))}
            </div>


            <div className="flex items-center-justify-center ">
                <MoreHorizontal size={24} />
            </div>

        </div>
        </div >
    )
}
