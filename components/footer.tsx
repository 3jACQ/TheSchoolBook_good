import { LinkedinIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="flex justify-between px-4 items-center py-16 bg-slate-100 text-secondaryText">
          <span>
            © 2023 theSchoolBook Startup. All rights reserved.
          </span>

          <div>
            <Link href="https://www.linkedin.com/in/jacques-dumora-91221a245/" className="hover:text-primary">
              <LinkedinIcon size={28} />
            </Link>
          </div>
        </footer>
    )
}