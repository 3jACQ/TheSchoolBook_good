import * as React from "react"
import { cn } from "@/lib/utils"
import { HFlex } from "./ui/display"
import { Logo } from "./logo"
import { ScreenCenter } from "./ui/display"
import { Button } from "./ui/button"
import Link from "next/link"
export function NavBar() {

    return (
        <nav className="w-full bg-background">
            <ScreenCenter size={"default"}>
                <HFlex className="items-center p-4 justify-between">
                    <Logo />
                    <Button variant={"default"} asChild>
                        <Link href={"/feed"}>
                            Go to App
                        </Link>
                    </Button>
                </HFlex>
            </ScreenCenter>
        </nav>
    )

}