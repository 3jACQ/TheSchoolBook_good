import { NavBar } from "@/components/navbar-landing"
export default async function Layout(props: { children: React.ReactNode}) {
    
    
    return (
        <>
            <NavBar />
            <div className="mb-16 mt-16">

            </div>
            {props.children}
        </>
    )
}