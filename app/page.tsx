"use client"
import Link from "next/link"

import { ScreenCenter } from "@/components/ui/display"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Globe, Flame, BrainCircuit, Linkedin, LinkedinIcon } from "lucide-react"
import { NavBar } from "@/components/navbar-landing"
import { NewsLetterForm } from "@/components/newsletter-form"

export default function Home() {
  return (
    <main>
      <NavBar />
      <ScreenCenter size={"xl"} className="px-4 flex  justify-start  pt-36 pb-36">
        <div className="w-full w-11/12 xl:w-9/12  inline-block">
          <h1
            className="mb-6 text-6xl font-extrabold leading-none tracking-normal text-primary md:text-6xl md:tracking-tight">
            The <span
              className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 lg:inline">Library</span> for students, by students
          </h1>
          <p className="px-0 mb-6 text-secondary-foreground/16 sm:font-normal font-bold w-11/12 xl:w-9/12" >
            The SchoolBook is a collaborative library designed to facilitate the sharing of knowledge among students."
          </p>

          <Button asChild>
            <Link href="#cta">Learn More</Link>
          </Button>
        </div>

      </ScreenCenter>



      <ScreenCenter size={"xl"}>
        <Separator />
        <section className="grid grid-cols-1 gap-20 px-16 pt-36  md:grid-cols-2 lg:grid-cols-3 lg:px-4 xl:px-4 pb-36">

          <div>
            <Flame size={48} className="mb-4" />
            <h3 className="mb-3 text-lg font-medium leading-tight">Easy to use</h3>
            <p className="text-base leading-relaxed text-secondaryText">
              The SchoolBook was designed to be as simple as possible, allowing you to quickly find what you are really interested in. We have incorporated a powerful search engine with filters and other features to assist you in locating what you need.
            </p>
          </div>
          <div>
            <Globe size={48} className="mb-4" />
            <h3 className="mb-3 text-lg font-medium leading-tight">Powered by IPFS</h3>
            <p className="text-base leading-relaxed text-secondaryText">
              Our application is based on the IPFS protocol for storing all kinds of documents. This protocol enables you to store your documents in a decentralized manner, allowing you to share and access an unlimited number of documents.
            </p>
          </div>

          <div>
            <BrainCircuit size={48} className="mb-4" />
            <h3 className="mb-3 text-lg font-medium leading-tight">Your next brain</h3>
            <p className="text-base leading-relaxed text-secondaryText">
              Powered by AI, our platform offers features such as document summarization, translation, mind mapping, content-based question-answering, and more, all conveniently available in one place.
            </p>
          </div>
        </section>


        <section id="cta" className="py-16 pb-0 px-4">

          <div className="items-center gap-x-12 lg:flex">
            <div className="flex-1 sm:hidden lg:block">
              {/*https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80 */}
              <img alt="Create Successful Business Models with Our IT Solutions" src="https://illustrations.popsy.co/sky/student-with-diploma.svg" width="3600" height="2400" decoding="async" data-nimg="1" className="rounded-lg md:max-w-lg" loading="lazy" />
            </div>
            <div className="max-w-xl mt-6 md:mt-0 lg:max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">Succeed in your studies and help others do so</h2>
              <p className="mt-3 text-secondaryText">With TheSchoolBook we want to develop and encourage knowledge sharing all over the world. The values behind thid project is to prone the freedom of sharing, and the freedom of expression in order to facilate the access to education for everyone.</p>
            </div>
          </div>

        </section>

        <section className="py-16 pb-36 px-4">


          <div className="items-center gap-x-12 lg:flex">
            <div className="max-w-xl mt-6 md:mt-0 lg:max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">Protect your work</h2>
              <p className="mt-3 text-secondaryText">We want to encourage knowledge sharing but for doing thats we need to purpose an efficient way to guarantee the protection of the work made by users. To achieve this goal we are going to use IPFS and a blockchain system to identify the creator of a documents. </p>
            </div>
            <div className="flex-1 sm:hidden lg:block mt-6">
              <img alt="Create Successful Business Models with Our IT Solutions" src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80" width="3600" height="2400" decoding="async" data-nimg="1" className="rounded-lg md:max-w-lg" loading="lazy" />
            </div>
          </div>

        </section>



        <div className="mt-4 flex w-full justify-center sm:items-center flex-col gap-8 mb-24 px-4">

          <h2 className="text-3xl font-semibold sm:text-4xl">Sign up for our newsletter</h2>
          <p className="text-secondaryText px-2">Stay up to date with the developpement progress, announcements and exclusive feature</p>
          <NewsLetterForm />
        </div>

        <Separator />

        <footer className="flex justify-between px-4 items-center py-12 text-secondaryText">
          <span>
            © 2023 theSchoolBook Startup. All rights reserved.
          </span>

          <div>
            <Link href="https://www.linkedin.com/in/jacques-dumora-91221a245/" className="hover:text-primary">
              <LinkedinIcon size={28} />
            </Link>

          </div>

        </footer>

      </ScreenCenter>



    </main>
  )
}
