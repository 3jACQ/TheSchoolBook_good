"use client"
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
export default function DownloadBtn({ hash, type }: { hash: string, type: string }) {
    const [loading , isLoading] = useState(false)
    function downloadFile() {
        isLoading(true)
        console.log("download")
        const url = `https://cloudflare-ipfs.com/ipfs/${hash}`
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = hash.split("/")[1] 
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => console.error('Error downloading file:', error));

        isLoading(false)
    }

    return !loading ? (
        <Download onClick={(e) => downloadFile()} size="24" className="cursor-pointer text-[#A8A8A8] hover:text-black duration-300 dark:hover:text-white" strokeWidth={1} />
    ) : <Loader2 className="mr-2 h-4 w-4 animate-spin" />


}