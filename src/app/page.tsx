"use client"
import { Spacer } from "@nextui-org/react"
import { Ecosystem, Heading, Courses } from "./_components"
import { useEffect } from "react"
const Page = () => {
    useEffect(() => {console.log("123")}, [])
    return (
        <div>
            <Heading/>
            <Spacer y={12}/>
            <Ecosystem className="max-w-[960px] mx-auto"/>
            <Spacer y={12}/>
            <Courses/>
        </div>
    )
}
export default Page
