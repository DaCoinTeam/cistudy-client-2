"use client"
import { CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react"
import React from "react"
import { Title } from "./Title"
import { Description } from "./Description"
import { PreviewVideo } from "./PreviewVideo"
import { Targets } from "./Targets"

export const InformationPanel = () => {
    return (
        <>
            <CardHeader className="text-xl p-6 pb-4 font-semibold">
                Information
            </CardHeader>
            <Divider/>
            <CardBody className="p-6">
                <div>
                    <Title/>
                    <Spacer y={6}/>
                    <Description />
                    <Spacer y={6}/>
                    <PreviewVideo />
                    <Spacer y={6}/>
                    <Targets />
                </div>   
            </CardBody>
        </>
    )
} 