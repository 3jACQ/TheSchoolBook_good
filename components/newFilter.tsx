import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { addFilter } from "@/lib/action/user.action"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

interface NewFilterProps extends React.HTMLAttributes<HTMLDivElement> {
   
}

export async function NewFilter({ children}: NewFilterProps) {


    const user = await getCurrentUser()
    if (!user) {
        return notFound()
    }

    const addFilterWithUserId = addFilter.bind(null, user.id)



    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New filter</DialogTitle>
                    <DialogDescription>
                        Add a new filter to your feed
                    </DialogDescription>
                </DialogHeader>
                <form action={addFilterWithUserId}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Name"
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Keyword
                            </Label>
                            <Input
                                id="filter"
                                name="filter"
                                placeholder="#math #science"
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Type
                            </Label>
                            <Select name="type">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a document type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="md">MarkDown</SelectItem>
                                        <SelectItem value="pdf">Pdf</SelectItem>
                                        <SelectItem value="notion">Notion</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Add</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}