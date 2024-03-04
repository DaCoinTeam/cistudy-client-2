import { MiddleLayout } from "./_components"

const Page = () => {
    return (
        <div className="my-12">
            <div className="grid grid-cols-4">
                <div />
                <MiddleLayout className="col-span-2" />
            </div>
        </div>
    )
}

export default Page
