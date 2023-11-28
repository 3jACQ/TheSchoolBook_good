
"use client"
import React from 'react'
import Dropzone from 'react-dropzone'
import { FileUploadForm } from '@/components/file-upload-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { NotionUploadForm } from '@/components/notion-form'

export default function AddMd() {
    return (
        <div className=' flex w-full mt-[15vw] justify-center items-center'>
           <NotionUploadForm></NotionUploadForm>
        </div>

    )
}