import { ScreenCenter } from "@/components/ui/display"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { PostItem } from "@/components/post"
import { UserAchivement } from "@/components/userAchievements"

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


export default async function PostDashBoard() {

    const user = await getCurrentUser()
    if (!user) return null
    const badges = await getBadges(user.id)
    console.log(badges)
    if (!user.image) {
        user.image = ""
    }


    return (
        <ScreenCenter size={"xl"} className="flex gap-4">
            <div className="flex gap-4 flex-col">
                <img className="w-[60px] h-[60px] rounded-full" src={user.image} alt="" />
                <h1 className="font-bold text-3xl">{user.name}</h1>
                <h2 className="font-light">{user.email}</h2>
                <UserAchivement badges={badges} />
            </div>



        </ScreenCenter>
    )
}