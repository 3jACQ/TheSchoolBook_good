import { ScreenCenter } from "@/components/ui/display"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { PostItem } from "@/components/post"


export default async function PostDashBoard() {

    const user = await getCurrentUser()
    if (!user) return null

    if(!user.image){
        user.image = ""
    }
  

    return (
        <ScreenCenter size={"xl"} className="flex gap-4">
            <div className="flex gap-4 flex-col">
                <img className="w-[60px] h-[60px] rounded-full" src={user.image} alt="" />
                <h1 className="font-bold text-3xl">{user.name}</h1>
                <h2 className="font-light">{user.email}</h2>
            </div>
        </ScreenCenter>
    )
}