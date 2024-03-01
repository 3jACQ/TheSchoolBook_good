import { Copy } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
export function DialogShareUrl({open,url,onClose}: {open:boolean,url:string,onClose:()=>void}) {
  return (
    <Dialog open={open}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Share this link</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <DialogDescription>
          <p className="text-sm text-muted-foreground">
            Copy the link below and share it with your friends.
          </p>
        </DialogDescription>
        <div className="flex gap-2 mt-4">
          <Input value={url} readOnly />
          <Button asChild onClick={() => navigator.clipboard.writeText(url)}>
            <Copy size={16} strokeWidth={1} />
            <p className="font-light">Copy</p>
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}