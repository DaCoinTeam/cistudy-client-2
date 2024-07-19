
import { Spacer } from "@nextui-org/react"
import {  Courses, Main, ScrollToTopButton } from "./_components"
const Page = () => {
    return (
        <div className="relative">
            <Main/>
            <Spacer y={12}/>
            <Courses/>
            <ScrollToTopButton/>
        </div>
    )
}
export default Page
