
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
            <div className=" z-[50]  w-full  flex items-center justify-center ">
                <div className="w-full flex items-center justify-center flex-col">
                    <h1 className="text-3xl sm:mt-0 mt-10">What you want to add ?</h1>
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

                        <Link href={"/app/add/notion"}>
                            <div className="bg-wnoir/5 p-[32px] rounded-sm min-h-0 sm:min-h-[400px] hover:bg-wnoir/10 transition-colors">
                                <div className="flex items-center justify-between">
                                    <h1 className="font-bold text-wnoir">Notion</h1>
                                    <ArrowRight />
                                </div>

                                <p className="text-secondaryText mt-6">Add your document from your notion account. You can edit it on notion after</p>
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


                    </div>
                </div>
            </div>
        </main>
    )
}