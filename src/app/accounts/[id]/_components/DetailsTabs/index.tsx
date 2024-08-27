import { Tab, Tabs } from "@nextui-org/react"
import React from "react"
import { FollowersTabContent } from "./FollowersTabContent"
import {  MessagesSquareIcon, RssIcon } from "lucide-react"
import { BriefcaseIcon } from "@heroicons/react/24/outline"
import { WorkExperienceTabContent } from "./WorkExperienceTabContent"

export const DetailsTabs = () => {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" variant="underlined" color="primary" classNames={{
                panel: "!px-0 !pt-6",
            }}>
                
                <Tab key="courses" title={
                    <div className="flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5" strokeWidth={3/2}/>
                        <div> Work Experience </div>
                    </div>
                }>
                    <WorkExperienceTabContent />
                    <div/>
                </Tab>
                <Tab key="followers"  title={
                    <div className="flex items-center gap-2">
                        <RssIcon size={20} strokeWidth={3/2}/>
                        <div> Followers </div>
                    </div>
                }>
                    <FollowersTabContent/>
                </Tab>
                <Tab key="feedback" title={
                    <div className="flex items-center gap-2">
                        <MessagesSquareIcon size={20} strokeWidth={3/2}/>
                        <div> Feedback </div>
                    </div>
                }>
                    <div/>
                </Tab>
            </Tabs>
        </div>)
}