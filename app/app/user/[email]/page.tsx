import { db } from "@/lib/db";
import { ScreenCenter } from "@/components/ui/display";
import { getCurrentUser } from "@/lib/session";
import { FollowBtn } from "@/components/FollowBtn";
import { Unfollowbtn } from "@/components/unfollow-btn";
import { PostItem } from "@/components/post";
import { Separator } from "@radix-ui/react-separator";
async function getUserData(email: string) {

    const user = await db.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            description: true,
        },
    })
    return user
}

async function countFollowersByUser(userId: string) {
    const followerCount = await db.follow.count({
        where: {
            followingId: userId,
        },
    });
    return followerCount;
}
async function countFollowingByUser(userId: string) {
    const followingCount = await db.follow.count({
        where: {
            followerId: userId,
        },
    });

    return followingCount;
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

async function getPublications(userId: string) {
    const publications = await db.post.findMany({
        where: {
            authorId: userId
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
                    id: true,
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
    return publications
}



export default async function Page({ params }: { params: { email: string } }) {


    const e = params.email.replace("%40", "@")
    const user = await getUserData(e)


    if (!user) return null
    if (user.image === null) user.image = ""
    const followercount = await countFollowersByUser(user.id)
    const followingCount = await countFollowingByUser(user.id)
    const publications = await getPublications(user.id)
    const currentUser = await getCurrentUser()
    if (!currentUser) return null
    const follow = await checkFollow(user.id, currentUser.id)
    return (
        <ScreenCenter size={"xl"} className="p-4 flex gap-4 sm:mt-16 mt-8 flex-col">
            <div className="flex gap-4">
                <img className="w-[60px] h-[60px] rounded-full" src={user.image} alt="" />
                <div className="flex flex-col">
                    <h1 className="font-bold sm:text-3xl text-xl">{user?.name}</h1>
                    <h2 className="font-light">{user?.email}</h2>
                </div>

            </div>
            <div className="flex gap-4">

                <p className="font-light text-secondaryText">Abonnée <span>{followercount}</span></p>
                <p className="font-light text-secondaryText">Abonnement <span>{followingCount}</span></p>

            </div>
            {follow ? <Unfollowbtn currentUser={currentUser.id} id={user.id} className="inline-block w-24   rounded-full  bg-wblanc text-green-800 border border-color-green-800  hover:bg-green-800 hover:text-white" /> : <FollowBtn className="inline-block w-20 text-white hover:text-white rounded-full  bg-green-800 hover:bg-green-800/80" currentUser={currentUser.id} id={user.id} />}

            <p className="mt-8 mb-8">Publications</p>
            
            <div className="flex flex-col gap-8">
                {publications.map((post, index) => (
                    <div key={index}>
                        <PostItem isAuthor={true} post={post} />

                    </div>
                ))}
            </div>
        </ScreenCenter>)
}