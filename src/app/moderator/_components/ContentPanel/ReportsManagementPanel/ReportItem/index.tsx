import React from "react"
import {Tabs, Tab} from "@nextui-org/tabs"
import { AccountReportItem } from "./AccountReportItem"
import { CourseReportItem } from "./CourseReportItem"
import { PostReportItem } from "./PostReportItem"
import { PostCommentReportItem } from "./PostCommentReportItem"

export const ReportItem = () => {

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
                {/* <Tab key="account" title="Account">
                    <AccountReportItem />
                </Tab>
                <Tab key="course" title="Course">
                    <CourseReportItem />
                </Tab> */}
                <Tab key="post" title="Post">
                    <PostReportItem />
                </Tab>
                <Tab key="comment" title="Post Comment">
                    <PostCommentReportItem />
                </Tab>
            </Tabs>
        </div>
    )
}