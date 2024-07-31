"use client"
import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react"
import { MiddleLayout, Sidebar } from "./_components"
import { useContext } from "react"
import { HomeContext } from "./_hooks"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const { swrs, reducer } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr
    const [state] = reducer

    return (
        <div className="p-12 max-w-[1920px] mx-auto w-full">
            <Breadcrumbs size="lg">
                <BreadcrumbItem> Courses </BreadcrumbItem>
                <BreadcrumbItem
                    onPress={() =>
                        router.push(
                            `/courses/${courseHome?.courseId}`
                        )
                    }
                >
                    {courseHome?.title}
                </BreadcrumbItem>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem><div className="capitalize">{state.panelSelected}</div></BreadcrumbItem>
            </Breadcrumbs>
            <Spacer y={12}/>
            <div className="grid grid-cols-4 gap-12">
                <Sidebar className="col-span-1 h-fit" />
                <MiddleLayout className="col-span-3"/>
            </div>   
        </div>
    )
}

export default Page
