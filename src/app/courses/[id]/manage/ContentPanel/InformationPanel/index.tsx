"use client"
import { CardBody, CardHeader, Divider } from "@nextui-org/react"
import React from "react"
import { TitleInput } from "./TitleInput"
import { FormikProviders } from "./FormikProviders"

const WrappedInformationPanel = () => {
    return (
        <>
            <CardHeader className="text-xl p-6 pb-4 font-semibold">
                Information
            </CardHeader>
            <Divider/>
            <CardBody className="p-6">
                <TitleInput/>
            </CardBody>
        </>
    )
}

export const InformationPanel = () => {
    return (
        <FormikProviders>
            <WrappedInformationPanel/>
        </FormikProviders>
    )
}