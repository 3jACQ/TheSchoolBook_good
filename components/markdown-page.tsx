
import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from "react-markdown"
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from "remark-gfm"
import 'katex/dist/katex.min.css'

import { fetchIPFS } from '@/lib/ipfs'
interface MarkdownPageProps {
    hash: string,
}

export async function fetchContent(url: string) {

    const resp = await fetchIPFS(url)

    if(!resp) throw new Error("No response")
    const data = await resp.text()

    if(!data) throw new Error("No data")
    const d = matter(data)
    return d.content
}

export default async function MarkdownPage({ hash }: MarkdownPageProps) {


    const data = await fetchContent(hash)

    return (<div className='mt-8 prose prose-black prose-md sm:prose-lg dark:prose-dark mb-8 dark:prose-invert'>
        <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
        >
            {data}
        </ReactMarkdown>
    </div>
    )
}