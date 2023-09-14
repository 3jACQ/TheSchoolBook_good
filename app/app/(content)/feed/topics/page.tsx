import { db } from "@/lib/db"
import { Post } from "@prisma/client"
import { PostItem } from "@/components/post"
import { getCurrentUser } from "@/lib/session"
async function getPost(email: string) {


    const followedUsers = await db.follow.findMany({
        where: {
            follower: {
                email: email
            }
        },
        select: {
            followingId: true
        }
    })
    const followedUsersId = followedUsers.map((user) => user.followingId)
    const posts = await db.post.findMany({
        where: {
            authorId: {
              in: followedUsersId,
            },
          },
        select: {
            id: true,
            title: true,
            description: true,
            hash: true,
            type: true,
            keywords: true,
            author: {
                select: {
                    id:true,
                    name: true,
                    image: true,
                    email: true,
                }
            }
        },
        orderBy: [
            {
                id: 'desc'
            }
        ],
    })
    return posts
}



export default async function Page() {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return null
    }
    const posts = await getPost(currentUser.email as string)
    console.log(posts)
    return posts.length ? (
        <div className="flex flex-col gap-8">
            {posts.map((post, index) => (
                <PostItem post={post} key={index} />
            ))}
        </div>

    ) : <div className="font-light">Aucune publication</div>
}
