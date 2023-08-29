"use client"
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackBtn(){
    const router = useRouter()

    return(
        <ChevronLeft size={36} className="cursor-pointer absolute left-0 top-8 translate-x-[-15px]" onClick={() => router.back()}/>
    )

}