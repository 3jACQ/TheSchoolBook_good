

import React from 'react'
import { FileUploadForm } from '@/components/file-upload-form'


export default function AddPdf() {
    return (
        <div className=' flex w-full mt-[15vw] justify-center items-center'>
            <FileUploadForm fileType='.pdf'/>
        </div>

    )
}