import { NextResponse, NextRequest } from "next/server";
import { postSchema } from "@/lib/validations/post";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db"

export const config = {
    api: {
        bodyParser: false, // Disable Next.js built-in bodyParser for custom parsing
    },
};

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

        if(f.type !== "text/markdown" && f.type !== "application/pdf"){
            return NextResponse.json({}, { status: 400 });
        }
        //return new Response(JSON.stringify(body))
        return NextResponse.json({ "prout": "prout" })
    } catch (err) {
        return new Response("err", { status: 500 })
    }

}