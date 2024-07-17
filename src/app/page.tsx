
import { Spacer } from "@nextui-org/react"
import {  Courses, Heading, ScrollToTopButton } from "./_components"
const Page = () => {
    return (
        <div className="relative">
            <Heading/>
            <Spacer y={12}/>
            <Courses/>
            <ScrollToTopButton/>
        </div>
    )
}
export default Page
