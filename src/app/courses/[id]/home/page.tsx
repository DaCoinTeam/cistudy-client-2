import { MiddleLayout, Sidebar } from "./_components"

const Page = () => {
    return (
        <div className="my-6 max-w-[100rem] grid grid-cols-4 gap-6 m-auto w-full">
            <Sidebar className="col-span-1 h-fit" />
            <MiddleLayout className="col-span-2"/>
            <div />
        </div>
    )
}

export default Page
