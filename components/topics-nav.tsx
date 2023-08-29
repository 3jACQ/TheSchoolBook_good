"use client"
import Link from "next/link"
import { NavItem } from "@/types"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSearchParams } from 'next/navigation'
import { Separator } from "./ui/separator"


export interface TopicsNavProps {
    items?: NavItem[],
    persistQuery?: boolean,
}
export default function TopicsNav({ items, persistQuery }: TopicsNavProps) {
    const pathname = usePathname()
    return items?.length ? (
        <div> <div className="flex gap-8 ">

            {items.map((item, index) => (
                <div key={index} className="font-light text-secondaryText">

                    {persistQuery ? (<TopicsNavItemsPersist title={item.title} href={item.href} pathname={pathname ? pathname : "/feed"} />) : <TopicsNavItems title={item.title} href={item.href} pathname={pathname ? pathname : "/feed"} />}

                </div>
            ))}

        </div>
            <Separator className="mt-6 mb-8"/>
        </div>) : null
}

interface TopicsNavItemProps {
    title: string,
    href: string,
    pathname: string,
}

export function TopicsNavItems({ title, href, pathname }: TopicsNavItemProps) {

    return (

        <Link href={href}
            className={cn(
                "font-light text-secondaryText",
                {
                    "text-wnoir": pathname === href,
                }
            )}

        >{title}</Link>)
}

export function TopicsNavItemsPersist({ title, href, pathname }: TopicsNavItemProps) {
    const searchParams = useSearchParams()
    const search = searchParams?.get('query')
    return (

        <Link href={{
            pathname: href,
            query: { query: search }
        }}
            className={cn(
                "font-light text-secondaryText",
                {
                    "text-wnoir": pathname === href,
                }
            )}

        >{title}</Link>)
}
