import { NextResponse, NextRequest } from "next/server";
import { postSchema } from "@/lib/validations/post";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db"
import { env } from "@/env.mjs"
import { NFTStorage, File } from "nft.storage";


export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }


        const form = await req.formData()

        const post = await db.post.create({
            data: {
                title: form.get("title") as string,
                description: form.get("description") as string,
                hash:form.get("file") as string,
                authorId: session.user.id,
                type: "notion",
                keywords:form.get("keywords") as string,
            },
            select: {
                id: true,
                type:true
            }
        })
        return NextResponse.json(post, { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("err", { status: 500 })
    }

}