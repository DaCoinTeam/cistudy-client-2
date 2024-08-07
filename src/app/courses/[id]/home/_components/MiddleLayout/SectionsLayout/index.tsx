import React, { useContext } from "react"
import { SectionsSection } from "./SectionsSection"
import { Tabs, Tab, Spacer } from "@nextui-org/react"
import { CompleteState } from "./CompleteState"
import { HomeContext } from "../../../_hooks"

interface SectionsLayoutProps {
    className?: string
}
export const SectionsLayout = (props: SectionsLayoutProps) => {
    const { className } = props
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data } = courseHomeSwr

    return (
        <div className="w-full col-span-3">
            <div className="text-xl font-semibold">{data?.title}</div>
            <Spacer y={6}/>
            <Tabs variant="underlined" classNames={{
                cursor: "w-full",
                tabList: "p-0",
                panel: "p-0 pt-6"
            }} className={className} aria-label="Options" color="primary">
                <Tab key="sections" title="Sections">
                    <SectionsSection/>
                </Tab>
                <Tab key="progress" title="Progress">
                    <CompleteState/>
                </Tab>
            </Tabs>
        </div>
    )
}