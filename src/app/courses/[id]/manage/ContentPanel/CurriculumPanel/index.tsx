"use client"
import { CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { Sections } from "./Sections"
import { CourseDetailsContext } from "../../../_hooks"
import { SectionEntity } from "@common"

export const CurriculumPanel = () => {
    return (
        <>
            <CardHeader className="text-xl p-6 pb-4 font-semibold">
        Curriculum
            </CardHeader>
            <Divider />
            <CardBody className="p-6">
                <div>
                    <Sections />
                </div>
            </CardBody>
        </>
    )
}
