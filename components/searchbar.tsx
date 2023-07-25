import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className=" text-wblanc flex items-center p-2 gap-2 rounded-full bg-wnoir px-4 w-[100%] m-auto">
                <Search strokeWidth={1}/>
                <input
                    type="text"
                    className={cn(
                        "text-wblanc font-light bg-wnoir w-full ",
                        "text-input",
                        className
                    )}
                    placeholder="Search..."
                    ref={ref}
                    {...props}

                />
            </div>
        )
    }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }