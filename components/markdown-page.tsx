
import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from "react-markdown"
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from "remark-gfm"
import 'katex/dist/katex.min.css'
interface MarkdownPageProps {
    hash: string,
}

export async function fetchContent(url: string) {
    const res = await fetch(url)
    const data = await res.text()

    const d = matter(data)
    return d.content
}

export default async function MarkdownPage({ hash }: MarkdownPageProps) {


    const data = await fetchContent(`https://cloudflare-ipfs.com/ipfs/${hash}`)

    return (<div className='mt-8 prose prose-black prose-md sm:prose-lg dark:prose-dark mb-8'>
        <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
        >
            {data}
        </ReactMarkdown>
    </div>
    )
}