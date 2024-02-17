"use client"
import { CardBody, CardHeader, Divider } from "@nextui-org/react"
import React from "react"
import { Sections } from "./Sections"

export const CurriculumPanel = () => {
    return (
        <>
            <CardHeader className="text-xl p-6 pb-4 font-semibold">
        Curriculum
            </CardHeader>
            <Divider />
            <CardBody className="p-6">
                <Sections />
            </CardBody>
        </>
    )
}
