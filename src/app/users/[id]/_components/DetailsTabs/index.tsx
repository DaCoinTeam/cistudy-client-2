import { Tab, Tabs } from "@nextui-org/react"
import React from "react"
import { FollowersTabContent } from "./FollowersTabContent"
import { CoursesTabContent } from "./CoursesTabContent"
import { BookOpenIcon, MessagesSquareIcon, RssIcon } from "lucide-react"

export const DetailsTabs = () => {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" classNames={{
                panel: "!px-0 !pt-6",
                tabContent: "group-data-[selected=true]:text-secondary-foreground"
            }}>
                <Tab key="followers"  title={
                    <div className="flex items-center gap-2">
                        <RssIcon size={20} strokeWidth={3/2}/>
                        <div> Followers </div>
                    </div>
                }>
                    <FollowersTabContent/>
                </Tab>
                <Tab key="courses" title={
                    <div className="flex items-center gap-2">
                        <BookOpenIcon size={20} strokeWidth={3/2}/>
                        <div> Courses </div>
                    </div>
                }>
                    <CoursesTabContent/>
                    <div/>
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