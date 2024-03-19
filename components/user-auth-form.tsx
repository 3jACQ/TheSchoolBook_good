"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants, Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { Github, Loader2, Twitter } from "lucide-react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema)
    })

    const { toast } = useToast()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
    const [isTwitterLoading, setIsTwitterLoading] = React.useState<boolean>(false)
    const searchParams = useSearchParams()

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        const signInResult = await signIn("email", {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams?.get("callbackUrl") || "/app"
        })

        setIsLoading(false)

        if (!signInResult?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive",
            })
        }

        return toast({
            title: "Check your email",
            description: "We sent you a login link. Be sure to check your spam too.",
        })
    }

    return (


        <div className="flex flex-col gap-4 mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_wrap mb-4">
                    <input placeholder="Email address" className="clall input_float_placeholder " type="email" autoComplete="email" autoCorrect="off" disabled={isLoading || isTwitterLoading || isTwitterLoading} required {...register("email")} />
                </div>
                {errors?.email && (
                    <p className="px-1 text-xs text-red-600 pb-4">
                        {errors.email.message}
                    </p>
                )}
                <button disabled={isLoading} className="w-[320px] duration-300  hover:bg-emerald-600  cursor-pointer bg-[#10A37F] text-white  h-[54px] rounded-[3px] flex items-center justify-center mb-4">
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>


            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }), "h-[54px]")}
                onClick={() => {
                    setIsGoogleLoading(true)
                    signIn("google")
                }}
                disabled={isLoading || isGoogleLoading}
            >
                {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" width="20px" height="20px" >
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                        </g>
                    </svg>
                )}{" "}
                Google
            </button>

            
        </div>
    )

}