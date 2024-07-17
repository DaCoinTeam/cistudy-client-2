
import { Spacer } from "@nextui-org/react"
import {  Courses, Heading } from "./_components"
const Page = () => {
    return (
        <div>
            <Heading/>
            <Spacer y={12}/>
            {/* <Ecosystem className="max-w-[960px] mx-auto"/> */}
            <Spacer y={12}/>
            <Courses/>
        </div>
    )
}
export default Page
