import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }





const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {

    
    return (
        <form action="/app/search/post" method="get">
            <div className=" text-wblanc shadow-lg flex items-center p-2 gap-2 rounded-full bg-wnoir px-4 w-[100%] m-auto">
                <Search strokeWidth={1} />
                <input
                    name="query"
                    type="text"
                    className={cn(
                        "text-wblanc font-light bg-wnoir w-full ",
                        "text-input",
                        className
                    )}
                    required
                    placeholder="Search..."
                    ref={ref}
                    {...props}
                />
            </div>
        </form>
    )
}
)
SearchBar.displayName = "SearchBar"

export { SearchBar }