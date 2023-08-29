import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const txt = searchParams.get('txt') as string
    const posts = await db.post.findMany({
        where:{
            title:txt
        }
    })

    return NextResponse.json(posts)

}