import { ScreenCenter } from "@/components/ui/display"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { PostItem } from "@/components/post"
import { UserAchivement } from "@/components/userAchievements"
import { UserDescription } from "@/components/userDescription"
async function getBadges(userId: string) {
    const badges = await db.userBadge.findMany({
        where: {
            userId: userId
        },
        select:{
            badge:{
                select:{
                    color:true,
                    name:true,
                    description:true,
                }
            }
        }
    })
    return badges
}


async function getDescriptions(userId: string) {
    const user = await db.user.findFirst({
        where: {
            id: userId
        },
        select:{
            description:true
        }
    })
    return user?.description || '';
}

export default async function PostDashBoard() {

    const user = await getCurrentUser()
    if (!user) return null
    console.log(user)
    const badges = await getBadges(user.id)
    const description = await getDescriptions(user.id)
    console.log(badges)
    if (!user.image) {
        user.image = ""
    }


    return (
        <ScreenCenter size={"xl"} className="flex gap-4">
            <div className="flex gap-4 flex-col w-full">
                <img className="w-[60px] h-[60px] rounded-full" src={user.image} alt="" />
                <h1 className="font-bold text-3xl">{user.name}</h1>
                <h2 className="font-light">{user.email}</h2>
                <UserAchivement badges={badges} />
                <UserDescription text={description} userId={user.id} />
            </div>
        </ScreenCenter>
    )
}