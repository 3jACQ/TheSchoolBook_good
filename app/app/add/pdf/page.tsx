

import React from 'react'
import { FileUploadForm } from '@/components/file-upload-form'


export default function AddPdf() {
    return (
        <div className=' absolute top-0 flex w-full h-screen justify-center items-center'>
            <FileUploadForm fileType='.pdf'/>
        </div>

    )
}