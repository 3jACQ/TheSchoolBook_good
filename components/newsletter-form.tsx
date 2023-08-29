"use client"
import * as React from "react"
import { useForm, useFormState } from "react-hook-form"
import { userAuthSchema } from "@/lib/validations/auth"
import { useRouter } from "next/navigation"
import { TypeOf } from "zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { db } from "@/lib/db";
type FormData = z.infer<typeof userAuthSchema>

export function NewsLetterForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        reset,
        formState,
        formState: { errors , isSubmitSuccessful},
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
        defaultValues:{
            email:""
        }
    })

    const [isSaving, setIsSaving] = React.useState<boolean>(false)

    async function onSubmit(data: FormData) {
        setIsSaving(true)
        const response = await fetch(`/api/newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email
            })
        })


        setIsSaving(false)

        if (!response?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Your email was not saved. Please try again.",
                variant: "destructive",
            })
        }

        toast({
            description: "Thank you for your registration !",
        })


    }


    React.useEffect(() =>{
        if(formState.isSubmitSuccessful){
            reset({email:""})
        }
    },[formState,reset])
    return (
        <form
            className={cn(className)}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" {...register("email",{required:"Email is required"})} />
                <Button type="submit">
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Subscribe
                    
                </Button>

            </div>
            {errors?.email && (
                <p className="px-1 text-xs text-red-600 mt-4">{errors.email.message}</p>
            )}

        </form>
    )
}

