"use client"

import Link from "next/link";
import React from "react";
import { UrlObject } from "url";

interface LinkCardProps extends React.HtmlHTMLAttributes<HTMLDivElement>{
    url:UrlObject,
    children:React.ReactNode

}

export function LinkCard({url,children}: LinkCardProps){
    return(
        <Link href={url} className="bg-red-500">
            {children}
        </Link>
    )
}