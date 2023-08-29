"use client"
import { useSearchParams } from 'next/navigation'

export default function SearchText(){
    const searchParams = useSearchParams()
    const search = searchParams?.get('query')

    return (
        <h1 className="mb-10 sm:text-4xl text-xl text-secondaryText font-semibold">Result for <span className="text-wnoir">{search}</span></h1>
    )

}