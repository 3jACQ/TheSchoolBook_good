"use client"
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
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from "react"


interface NewFilterProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Filter({ children }: NewFilterProps) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [filters, setFilters] = React.useState<string>("");
    const [type, setType] = React.useState<string>("");
    const [open, setOpen] = React.useState(false);

    const router = useRouter();

    const search = () => {
        const params = new URLSearchParams(searchParams as any);

        const newParams = new URLSearchParams();

        if (filters) {
           


            newParams.set("filters", filters);
        }

        if (type) {
            newParams.set("type", type);
        }

        newParams.set("query", params.get("query") || "");

        const newurl = `${pathname}?${newParams.toString()}`;
        setOpen(false);
        router.push(newurl);


    }





    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter</DialogTitle>
                    <DialogDescription>
                        Filter your search
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">


                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Keyword
                        </Label>
                        <Input
                            id="filters"
                            name="filters"
                            placeholder="#math #science"
                            className="col-span-3"
                            value={filters}
                            onChange={(e) => setFilters(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Type
                        </Label>
                        <Select name="type"  
                        value={type}
                        onValueChange={(value) => setType(value)}
                        >
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
                    <Button onClick={search}>Search</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}