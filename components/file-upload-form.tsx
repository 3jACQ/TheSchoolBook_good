"use client"
import * as React from "react"
import { useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "@/lib/validations/post"
import { motion } from "framer-motion"
import { Rocket } from "lucide-react"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import * as z from "zod"
import { title } from "process"

type FormData = z.infer<typeof postSchema>

interface FileUploadFormProps extends React.HTMLAttributes<HTMLFormElement> {
    fileType: string
}

export function FileUploadForm({ className, fileType, ...props }: FileUploadFormProps) {
    const {
        handleSubmit,
        register,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
        watch,
        getValues,
        trigger,
    } = useForm<FormData>({
        resolver: zodResolver(postSchema),
    })


    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [step, setStep] = React.useState<number>(1)
    const [fileOk, setFileOk] = React.useState<boolean>(false)
    const [fileName, setfileName] = React.useState<string>()
    async function onSubmit(data: FormData) {
        console.log("okay")
        console.log(data)
    }

    async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files?.item(0)
        console.log(file)
        setfileName(file?.name)
        setFileOk(true)

    }

    function deleteFile() {
        setFileOk(false)
        setfileName("");
        reset({
            file: ""
        })

    }

    function finalStep(){
        trigger(["title","description"])
        console.log(errors)
    }

    function testStep(){
        trigger("file")
        setStep(2)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            {...props}
            className=" w-[75%]"
        >
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='w-full flex items-center justify-center flex-col'

                >


                    <input type="file"
                        {...register('file')}
                        id="file"
                        accept={fileType}
                        onChange={(e) => onFileChange(e)}
                        style={{ display: 'none' }}
                    />
                    {!fileOk ? <label htmlFor="file">
                        <div className="px-8 text-secondaryText flex items-center gap-4  p-4 rounded cursor-pointer hover:border-wnoir hover:text-wnoir">
                            <Rocket size={32} />
                            <h1 className="text-3xl ">Select your file</h1>
                        </div>
                    </label> :
                        <div className="">
                            <div className="flex items-center justify-between min-w-[400px] w-[50%]">
                                <h1>{fileName}</h1>
                                <Button variant="destructive" size="icon" onClick={(e) => deleteFile()}>
                                    <Trash size={20} />
                                </Button>
                            </div>
                            <div className="flex justify-end w-full mt-14 min-w-[400px]">
                                <Button onClick={() => testStep()}>Next</Button>
                            </div>

                        </div>
                    }



                </motion.div>
            )}

            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='w-full flex items-center justify-center flex-col min-w-[300px]'
                >
                    <input type="text" placeholder="Titre" className="t text-4xl w-[50%] min-w-[350px] mb-8" {...register("title")}></input>
                    <textarea placeholder="Description" id="" className="t text-2xl w-[50%] min-w-[350px] "  cols={30} rows={5} {...register('description')}/>
                    <div className="flex justify-between  w-[50%] min-w-[350px] mt-14 min-w-[400px]">
                        <Button variant={"secondary"} onClick={() => setStep(1)}>Prev</Button>
                        {watch("title") && watch("description") &&
                            <Button onClick={() => finalStep()}>Next</Button>
                        }
                    </div>

                            <Button type="submit">Okayyyyyy</Button>
                </motion.div>

            )}
        </form>
    )
}