import { db } from "@/lib/db";
import { Separator } from "./ui/separator";

async function getPostComment(id: string) {
    const comments = await db.comment.findMany({
        where: {
            postId: id
        },
        select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
                select: {
                    name: true,
                    image: true,
                    email: true
                }
            }
        }
    })
    return comments
}


export default async function CommentList({ params }: { params: { id: string } }) {
    const comments = await getPostComment(params.id)
    return comments.length ? (<div className="mt-4">
        {comments.map((comment: any) => (
            <div key={comment.id} className="flex gap-2 flex-col">
                <div className="flex items-center gap-2">
                    <img className="w-[32px] h-[32px] rounded-full" src={comment.user.image} alt="" />
                    <p className="font-light text-sm">{comment.user.name.split(' ')[0]}</p>
                </div>

                <p>{comment.text}</p>

                <Separator className="mt-4 mb-4" />
            </div>
        ))}
    </div>) : <div className="font-light">Aucun commentaire</div>



}