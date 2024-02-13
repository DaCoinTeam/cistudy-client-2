"use client"
import { CardBody, CardHeader, Divider, Spacer } from "@nextui-org/react"
import React from "react"
import { TitleInput } from "./TitleInput"
import { DescriptionInput } from "./DescriptionInput"
import { PreviewVideo } from "./PreviewVideo"

export const InformationPanel = () => {
    return (
        <>
            <CardHeader className="text-xl p-6 pb-4 font-semibold">
                Information
            </CardHeader>
            <Divider/>
            <CardBody className="p-6">
                <div>
                    <TitleInput/>
                    <Spacer y={4}/>
                    <DescriptionInput />
                    <Spacer y={4}/>
                    <PreviewVideo/>
                </div>   
            </CardBody>
        </>
    )
} 