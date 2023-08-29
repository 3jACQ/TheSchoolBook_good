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
        console.log(form)

        const f = form.get("file") as File
        console.log(f)

        if (!f) {
            return NextResponse.json({}, { status: 400 });
        }

        if (f.type !== "text/markdown" && f.type !== "application/pdf") {
            return NextResponse.json({}, { status: 400 });
        }

        if(f.name.split(".")[1] !== "md" && f.name.split(".")[1] !== "pdf"){
            return NextResponse.json({}, { status: 400 });
        }

        const storage = new NFTStorage({ token: env.NFT_API })

        const bytes = await f.arrayBuffer()
        console.log("start upload...")


        const cid = await storage.store({
            name: f.name + " - " + session.user.name + " - " + session.user.email + " - TheSchoolBook",
            description: form.get("description") as string,
            image: new File(
                [bytes], f.name, { type: f.type }
            )
        })
        let metadata_hash = cid.url.replace("ipfs://","")
        let file_hash = cid.data.image.href.replace("ipfs://","")

        const post = await db.post.create({
            data: {
                title: form.get("title") as string,
                description: form.get("description") as string,
                hash:file_hash,
                authorId: session.user.id,
                type: f.name.split(".")[1],
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