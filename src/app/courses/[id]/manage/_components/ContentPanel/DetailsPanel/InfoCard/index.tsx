import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React from "react"
import { Title } from "./Title"
import { Description } from "./Description"
import { Actions } from "./Actions"

interface InfoCardProps {
  className?: string;
}

export const InfoCard = (props: InfoCardProps) => {
    const { className } = props
    return (
        <Card shadow="none" className={`${className} border border-divider`}>
            <CardHeader className="p-6 pb-0 justify-between items-center"> 
                <div className="text-xl font-semibold leading-none">Info</div>
                <Actions/>
            </CardHeader>
            <CardBody className="p-6 gap-4">
                <Title />
                <Description />
            </CardBody>
        </Card>
    )
}
