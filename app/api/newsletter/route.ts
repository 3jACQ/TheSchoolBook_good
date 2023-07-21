import { NextResponse } from "next/server";
import { userAuthSchema } from "@/lib/validations/auth";
import { db } from "@/lib/db";
export async function POST(req: Request){
    const json = await req.json()
    const body = userAuthSchema.parse(json)
    const email = await db.authorizedUser.create({
        data:{
            email:body.email,
        },
        select:{
            id: true,
        }
    })
    //return new Response(JSON.stringify(body))
    return NextResponse.json({email})
}