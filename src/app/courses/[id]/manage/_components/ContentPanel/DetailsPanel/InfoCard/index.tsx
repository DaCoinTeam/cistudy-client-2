import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React from "react"
import { Title } from "./Title"
import { Description } from "./Description"

interface InfoCardProps {
  className?: string;
}

export const InfoCard = (props: InfoCardProps) => {
    const { className } = props
    return (
        <Card className={`${className}`}>
            <CardHeader className="p-4 text-xl font-semibold pb-0"> Info </CardHeader>
            <CardBody className="p-4 gap-4">
                <Title />
                <Description />
            </CardBody>
        </Card>
    )
}
