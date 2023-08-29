import { User } from "@prisma/client"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Follow } from "@/lib/action/user.action"
import { FollowBtn } from "./FollowBtn"
import { getCurrentUser } from "@/lib/session"
import { Unfollowbtn } from "./unfollow-btn"
interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, "id" | "name" | "image" | "email" | "description">,
    follow: boolean
}

export async function UserCard({ user, follow }: UserCardProps) {

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return null
    }
    if (!user.image) {
        user.image = ""
    }
    return (
        <div className="max-w-[770px]">
            <div className="relative max-w-[750px] ">
                {follow ? <Unfollowbtn className="rounded-full absolute right-0 top-[50%] bg-wblanc text-green-800 border border-color-green-800 translate-y-[-50%] hover:bg-green-800 hover:text-white" currentUser={currentUser.id} id={user.id} /> : <FollowBtn className="text-white hover:text-white rounded-full absolute right-0 top-[50%] translate-y-[-50%] bg-green-800 hover:bg-green-800/80" currentUser={currentUser.id} id={user.id} />}

                <Link href={`/user/${user.email}`} className="flex items-center gap-4 flex-wrap ">
                    <div>
                        <img className="w-[48px] h-[48px] rounded-full" src={user.image} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-sm">{user.name}</p>
                        {user.description !== "" ? <p className="text-sm text-secondaryText">{user.description}</p> : null}
                    </div>
                </Link>

            </div>
            <Separator className="mb-8 mt-8" />
        </div>
    )
}