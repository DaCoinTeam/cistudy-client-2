import React from "react"
import {Tabs, Tab} from "@nextui-org/tabs"
import { PostReportItem } from "./PostReportItem"
import { PostCommentReportItem } from "./PostCommentReportItem"

export const ReportItem = () => {

    return (
        <div className="flex w-full flex-col">
            <Tabs variant="underlined" classNames={{
                cursor: "w-full"
            }} aria-label="Options" color="primary">
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