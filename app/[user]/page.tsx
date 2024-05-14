import { getCurrentUser } from "@/lib/session"
import { redirect } from 'next/navigation'
import { db } from "@/lib/db";
import { ScreenCenter } from "@/components/ui/display";
import { UserAchivement } from "@/components/userAchievements";
import { PostItem } from "@/components/post";
import { NavBar } from "@/components/navbar-landing"

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

async function countFollowersByUser(userId: string) {
    const followerCount = await db.follow.count({
        where: {
            followingId: userId,
        },
    });
    return followerCount;
}

async function getBadges(userId: string) {
    const badges = await db.userBadge.findMany({
        where: {
            userId: userId
        },
        select: {
            badge: {
                select: {
                    color: true,
                    name: true,
                    description: true,
                }
            }
        }
    })
    return badges
}


export default async function SiteHomePage({
    params,
}: {
    params: { user: string };
}) {

    const u = await getCurrentUser()

    if (u) {
        return redirect(`/app/user/${params.user}`)
    }

    const e = params.user.replace("%40", "@")
    const user = await getUserData(e)
    if (!user) return null
    const publications = await getPublications(user.id)
    const followercount = await countFollowersByUser(user.id)
    const badges = await getBadges(user.id)
    if (user.image === null) user.image = ""

    return (
        <div>
            <NavBar />

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


                </div>


                <UserAchivement badges={badges} />

                {publications.length ? <p className="mt-16 mb-16 text-xl text-wnoir  sm:text-3xl font-bold" >Publications</p> : null}
                <div className="flex flex-col gap-8">
                    {publications.map((post, index) => (
                        <div key={index}>
                            <PostItem  notLoggedIn={true} isAuthor={false} post={post} />
                        </div>
                    ))}
                </div>
            </ScreenCenter>
        </div>
    );
}