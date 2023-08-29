"use client"
import * as React from "react"
import { set, useForm, useFieldArray } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "@/lib/validations/post"
import { motion } from "framer-motion"
import { Rocket } from "lucide-react"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "@/components/ui/use-toast"
import * as z from "zod"
import matter from "gray-matter"
import { HashtagList } from "./HashTagList"
import { Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
type FormData = z.infer<typeof postSchema>

interface FileUploadFormProps extends React.HTMLAttributes<HTMLFormElement> {
    fileType: string
}

export function FileUploadForm({ className, fileType, ...props }: FileUploadFormProps) {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
        watch,
        getValues,
        trigger,
        control,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(postSchema),
        mode: "onChange",

    })



    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [step, setStep] = React.useState<number>(1)
    const [fileOk, setFileOk] = React.useState<boolean>(false)
    const [fileName, setfileName] = React.useState<string>()
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [showInput, setShowInput] = React.useState<boolean>(false)


    const [filtre, setFiltres] = React.useState<string>("")
    async function onSubmit(data: FormData) {
        setIsSaving(true)
        const dt = new FormData()
        dt.append("title", data.title)
        dt.append("description", data.description)
        dt.append("file", data.file[0])
        dt.append("keywords",filtre)
        const response = await fetch(`/api/post`, {
            method: "POST",
            body: dt
        })


        setIsSaving(false)

        if (!response?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "We can't upload your file sorry",
                variant: "destructive",
            })
        }
        const rep = await response.json()
        
        toast({
            description: "Thank you for your participation!",
        })

        router.push(`/view/${rep.type}/${rep.id}`)


    }

    async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files?.item(0)
        if (!file) return
        const fileBlob = file?.slice(0, file.size, file.type);
        console.log(file)
        setfileName(file?.name)
        if (fileType === ".md") {
            const fileContent = await readFileAsText(fileBlob)
            const { data } = matter(fileContent as any)
            console.log(data)
            setValue("title", data.title)
            setValue("description", data.description)
        }
        if (fileType === ".pdf") {
            const fileName = file?.name.split(".")[0]
            setValue("title", fileName)
        }
        setFileOk(true)
    }

    const readFileAsText = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event?.target?.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }
    function deleteFile() {
        setFileOk(false)
        setfileName("");
        reset({
            file: ""
        })

    }

    function finalStep() {
        const erros_size = Object.keys(errors).length
        if (erros_size === 0) {
            setStep(3)
        }
    }

    const [hashtags, setHashtags] = React.useState<string[]>([]);
    const [currentHashtag, setCurrentHashtag] = React.useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCurrentHashtag(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentHashtag.trim() !== '') {
            e.preventDefault()
            setHashtags([...hashtags, currentHashtag.trim()]);
            setFiltres(filtre + "|" + currentHashtag.trim());
            setCurrentHashtag('');
            setShowInput(false)

        }

    };



    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            {...props}
            className=" w-[75%]"
        >
            <input type="file"
                {...register('file', { required: 'File is required' })}
                id="file"
                accept={fileType}
                onChange={(e) => onFileChange(e)}
                style={{ height: 0, width: 0, opacity: 0 }}

            />

            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='w-full flex items-center justify-center flex-col'

                >
                    {!fileOk ? <label htmlFor="file">
                        <div className="px-8 text-secondaryText flex items-center gap-4  p-4 rounded cursor-pointer hover:border-wnoir hover:text-wnoir">
                            <Rocket size={32} />
                            <h1 className="text-3xl ">Select your file</h1>
                        </div>
                    </label> :
                        <div className="">
                            <div className="flex items-center justify-between min-w-[400px] w-[50%]">
                                <h1>{fileName}</h1>
                                <Button variant="outline" className="rounded" size="icon" onClick={(e) => deleteFile()}>
                                    <Trash size={20} />
                                </Button>
                            </div>


                            <div className="flex justify-end w-full mt-14 min-w-[400px]">
                                <Button onClick={() => setStep(2)}>Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
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
                    <input type="text" placeholder="Titre" className="t text-4xl w-[50%] min-w-[350px]" {...register("title")}></input>
                    <div className="flex justify-start w-[50%] mt-4">
                        <p className="px-1 text-xs text-secondaryText opacity-0">a</p>
                        {errors?.title && (
                            <p className="px-1 text-xs text-secondaryText">{errors.title.message}</p>

                        )}
                    </div>

                    <textarea placeholder="Description" id="" className="t text-2xl w-[50%] min-w-[350px] mt-8 " cols={30} rows={5} {...register('description')} />
                    <div className="flex justify-start w-[50%] mt-4">
                        <p className="px-1 text-xs text-secondaryText opacity-0">a</p>
                        {errors?.description && (
                            <p className="px-1 text-xs text-secondaryText">{errors.description.message}</p>

                        )}
                    </div>
                    <div className="flex justify-between  w-[50%] min-w-[350px] mt-14 min-w-[400px]">
                        <Button variant={"secondary"} onClick={() => setStep(1)}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Prev
                        </Button>
                        {watch("title") && watch("description") &&
                            <Button onClick={() => finalStep()}>Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        }
                    </div>


                </motion.div>

            )}

            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='w-full flex justify-center min-w-[300px]'
                >
                    <div className="w-[30%] min-w-[300px]">
                        <div className="text-2xl font-bold mb-2 text-secondaryText">Titre</div>
                        <div className="text-xl mb-10">{getValues("title")}</div>
                        <div className="text-2xl font-bold mb-2 text-secondaryText">Description</div>
                        <div className="wrap">{getValues("description")}</div>

                        <div className="text-2xl font-bold mt-10 mb-2 text-secondaryText">Fichier</div>
                        <div className="flex gap-4">

                            <div className="flex items-center gap-4">
                                <div>{fileName}</div>
                            </div>
                        </div>

                        <div className="text-2xl font-bold mt-10 mb-4 text-secondaryText">Filtres</div>
                        
                        {hashtags.length > 0 ? <HashtagList hashtags={hashtags} /> : <p className="font-light text-secondaryText">Aucun filtres</p>}
                        <div className="mt-4 flex gap-2">
                            <Button disabled={isSaving} size={"icon"} variant={"outline"} type="button" onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                setShowInput(!showInput);
                            }}>
                                <Plus className="transition duration-150" style={{ transform: showInput ? "rotate(45deg)" : "" }} />
                            </Button>
                            {showInput && <Input
                                type="text"
                                value={currentHashtag}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="écrit un filtre et press entrer"
                                className=""
                            />}
                        </div>



                        <div className="mt-8 flex justify-between">
                            <button disabled={isSaving} className={cn(buttonVariants({ variant: "secondary" }))} onClick={(e) => setStep(2)}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Prev
                            </button>
                            <Button disabled={isSaving} variant={"validate"} type="submit">
                                Publier
                                {isSaving && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                {!isSaving && <Rocket className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>


                    </div>
                </motion.div>
            )}
        </form>
    )
}
