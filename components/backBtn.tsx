"use client"
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BackBtn() {
    const router = useRouter()

    return (
        <div>
            
            <ChevronRight size={36} className="hidden sm:block cursor-pointer absolute left-0 top-8 translate-x-[-15px]" onClick={() => router.back()} />
            
        </div>
    )

}