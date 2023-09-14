
import { Metadata } from "next"
import Link from "next/link"
import { LinkCard } from "@/components/linkcard"
import { ArrowRight } from "lucide-react"
export const metadata: Metadata = {
    title: "TheSchoolBook - Choose",
    description: "Choose what you want to upload",
}

export default function AddPage() {
    return (
        <main className="">

            <div className="absolute top-0 w-full h-screen flex items-center justify-center ">
                <div className="w-full flex items-center justify-center flex-col">
                    <h1 className="text-3xl">What you want to add ?</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-[280px_280px_280px] gap-[24px] sm:gap-[48px] mt-[60px] px-4 sm:px-0">
                        <Link href={"/app/add/md"}>
                            <div className="bg-wnoir/5 p-[32px] rounded-sm min-h-0 sm:min-h-[400px] hover:bg-wnoir/10 transition-colors">
                                <div className="flex items-center justify-between">
                                    <h1 className="font-bold text-wnoir">Markdown</h1>
                                    <ArrowRight />
                                </div>

                                <p className="text-secondaryText mt-6">You can directly import markdown files from your computer </p>
                            </div>
                        </Link>

                        <Link href={"/app/add/pdf"}>
                            <div className="bg-wnoir/5 p-[32px] rounded-sm min-h-0 sm:min-h-[400px] hover:bg-wnoir/10 transition-colors">
                                <div className="flex items-center justify-between">
                                    <h1 className="font-bold text-wnoir">PDF</h1>
                                    <ArrowRight />
                                </div>

                                <p className="text-secondaryText mt-6">You can upload unlimited pdf to theSchoolBook network</p>
                            </div>
                        </Link>

                        <Link href={"/prout"}>
                            <div className="bg-wnoir/5 p-[32px] rounded-sm min-h-0 sm:min-h-[400px] hover:bg-wnoir/10 transition-colors">
                                <div className="flex items-center justify-between">
                                    <h1 className="font-bold text-wnoir">Write</h1>
                                    <ArrowRight />
                                </div>

                                <p className="text-secondaryText mt-6">write and create your content online and upload it to theSchoolBook network</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}