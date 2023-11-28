import { NotionPostSchema } from "@/lib/validations/post"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from "react"
import { motion } from "framer-motion"
import { Input } from "./ui/input"
import { Button, buttonVariants } from "./ui/button"
import { ChevronLeft, ChevronRight, Loader2, Plus, Rocket } from "lucide-react"
import HashtagList from "./HashTagList"
import { cn } from "@/lib/utils"
import { toast } from "./ui/use-toast"


type FormData = z.infer<typeof NotionPostSchema>

interface FileUploadFormProps extends React.HTMLAttributes<HTMLFormElement> {
}

export function NotionUploadForm({ className, ...props }: FileUploadFormProps) {
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
        resolver: zodResolver(NotionPostSchema),
        mode: "onChange",
    })

    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [step, setStep] = React.useState<number>(1)
    const [showInput, setShowInput] = React.useState<boolean>(false)
    const [filtre, setFiltres] = React.useState<string>("")


    const onSubmit = async (data: FormData) => {
        setIsSaving(true)
        const dt = new FormData()

        dt.append("title", data.title)
        dt.append("description", data.description)
        dt.append("file", data.notionUrl)
        dt.append("keywords",filtre)

        const response = await fetch(`/api/post/notion`, {
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

        router.push(`/app/view/${rep.type}/${rep.id}`)

        console.log(data)
        
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
        <form action=""
            onSubmit={handleSubmit(onSubmit)}
            {...props}
            className=" sm:w-[35%] w-full px-4 sm:px-0 mt-24 sm:mt-0"
        >

            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='w-full flex items-center justify-center flex-col'
                >

                    <div className='w-full'>
                        <Input placeholder='Paste your Notion Page URL' {...register("notionUrl")} />
                        <div className="flex justify-start w-[50%] mt-4">
                            {errors?.notionUrl && (
                                <p className="px-1 text-xs text-secondaryText">{errors.notionUrl.message}</p>
                            )}
                        </div>
                    </div>

                    {watch("notionUrl") && !errors.notionUrl &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-end w-full mt-14 min-w-[400px]">
                            <Button onClick={() => setStep(2)}>Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    }



                </motion.div>
            )
            }


            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='w-full flex items-center justify-center flex-col -translate-y-12'
                >
                    <input type="text" placeholder="Titre" className="t text-4xl w-full" {...register("title")}></input>
                    <div className="flex justify-start w-[50%] mt-4">
                        <p className="px-1 text-xs text-secondaryText opacity-0">a</p>
                        {errors?.title && (
                            <p className="px-1 text-xs text-secondaryText">{errors.title.message}</p>

                        )}
                    </div>

                    <textarea placeholder="Description" id="" className="t text-2xl w-full mt-8 " cols={30} rows={5} {...register('description')} />
                    <div className="flex justify-start w-[50%] mt-4">
                        <p className="px-1 text-xs text-secondaryText opacity-0">a</p>
                        {errors?.description && (
                            <p className="px-1 text-xs text-secondaryText">{errors.description.message}</p>

                        )}
                    </div>
                    <div className="flex justify-between  w-full mt-14">
                        <Button variant={"secondary"} onClick={() => setStep(1)}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Prev
                        </Button>
                        {watch("title") && watch("description") && !errors.description && !errors.title &&
                            <Button onClick={() => setStep(3)}>Next
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
                    className='w-full flex items-center justify-center flex-col -translate-y-1/4'
                >

                    <div className="w-full min-w-[300px]">
                        <div className="text-2xl font-bold mb-2 text-secondaryText">Titre</div>
                        <div className="text-xl mb-10">{getValues("title")}</div>
                        <div className="text-2xl font-bold mb-2 text-secondaryText">Description</div>
                        <div className="wrap">{getValues("description")}</div>

                        <div className="text-2xl font-bold mt-10 mb-2 text-secondaryText">Notion page</div>
                        <div className="flex gap-4">

                            <div className="flex items-center gap-4">
                                <div>{getValues("notionUrl")}</div>
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

        </form >
    )
}