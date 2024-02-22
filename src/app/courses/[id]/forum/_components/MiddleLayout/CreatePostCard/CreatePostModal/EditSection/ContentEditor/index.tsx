
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { WriteTextarea } from "./WriteTextarea"
import React from "react"
import { HelperBar } from "./HelperBar"

export const ContentEditor = () => {
    return (
        <Card shadow="none" className="bg-content2">
            <CardHeader>
                <HelperBar/>
            </CardHeader>
            <CardBody className="p-4">
                <WriteTextarea />
            </CardBody>   
        </Card>
    )
}