"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { HFlex } from "./ui/display"
import { Logo } from "./logo"
import { ScreenCenter } from "./ui/display"
import { Button } from "./ui/button"
import { SearchBar } from "./searchbar"
import Link from "next/link"
import { BrainCircuit, Plus, Search } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { UserAccountNav } from "./user-account-nav"
import { User } from "next-auth"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import { ChevronLeft } from "lucide-react";

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User
}

export function NavBar({ user }: NavBarProps) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <nav className="w-full bg-background z-[100]">
            <ScreenCenter size={"default"}>
                <div className="items-center p-4 grid grid-cols-3	">
                    {pathname?.includes("/app/feed") ? <Logo /> :<div className="flex items-center gap-4"> <div onClick={() => router.back()} className="flex items-center cursor-pointer"> <ChevronLeft size={36} className="" /> <span className="font-bold hidden sm:block">Back</span> </div> |  <div onClick={() => router.push("/app/feed")} className="flex items-center cursor-pointer"> <span className="font-bold">Feed</span></div></div>}

                    <div className="invisible md:visible">
                        <SearchBar />
                    </div>

                    <div className="flex justify-end text-secondaryText">
                        <div className="flex items-center gap-8">

                            <Dialog >
                                <DialogTrigger asChild>
                                    <div className="hover:text-primary cursor-pointer visible md:invisible">
                                        <Button variant={"link"} className="p-0 hover:text-primary text-secondaryText" asChild>
                                            <Search />
                                        </Button>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="">
                                    <div className="mt-5 mb-5">
                                        <form action="/app/search/post" method="get">
                                            <Input name="query" className="rounded-full" type="text" placeholder="Search..." />
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>


                            <div className="hover:text-primary cursor-pointer">
                                <Button variant={"link"} className="p-0" asChild>
                                    <Link href={"/app/add"} className="hover:text-primary text-secondaryText">
                                        <Plus />
                                    </Link>
                                </Button>
                            </div>




                            {/* <div className="hover:text-primary cursor-pointer">
                                <Button variant={"link"} className="p-0" asChild>
                                    <Link href={"/keeper"} className="hover:text-primary text-secondaryText">
                                        <BrainCircuit />
                                    </Link>
                                </Button>
    </div>*/}
                            <UserAccountNav user={{
                                name: user.name,
                                image: user.image,
                                email: user.email,
                            }} />
                        </div>

                    </div>
                </div>
            </ScreenCenter>
        </nav>
    )

}