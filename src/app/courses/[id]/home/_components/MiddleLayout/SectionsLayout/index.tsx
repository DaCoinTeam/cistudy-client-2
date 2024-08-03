import React from "react"
import { SectionsSection } from "./SectionsSection"
import { Tabs, Tab } from "@nextui-org/react"
import { CompleteState } from "./CompleteState"

interface SectionsLayoutProps {
    className?: string
}
export const SectionsLayout = (props: SectionsLayoutProps) => {
    const { className } = props
    return (
        <div className="w-full col-span-3">
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