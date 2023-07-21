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

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User
}

export function NavBar({ user }: NavBarProps) {

    return (
        <nav className="w-full fixed bg-primary-foreground bg-wblanc">
            <ScreenCenter size={"default"}>
                <div className="items-center p-4 grid grid-cols-3	">
                    <Logo />
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
                                        <Input className="rounded-full" type="text" placeholder="Search..."/>
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




                            <div className="hover:text-primary cursor-pointer">
                                <Button variant={"link"} className="p-0" asChild>
                                    <Link href={"/keeper"} className="hover:text-primary text-secondaryText">
                                        <BrainCircuit />
                                    </Link>
                                </Button>
                            </div>
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