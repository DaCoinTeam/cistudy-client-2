import { Menu } from "./Menu"
import { Spacer } from "@nextui-org/react"
import { Actions } from "./Actions"

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    return (
        <div className={`${className} bg-content1 rounded-large p-4 sticky top-[5.5rem]`}>
            <div className="text-xl leading-none font-bold"> Course Management </div>
            <Spacer y={6}/>
            {/* <div className="gap-2 flex items-center text-foreground-500">
                <KeyRoundIcon size={16} strokeWidth={4/3}/>
                <div className="text-xs truncate">12323</div>
            </div> */}
            <Menu/>
            <Spacer y={12}/>
            <Actions />
        </div>
    )
}