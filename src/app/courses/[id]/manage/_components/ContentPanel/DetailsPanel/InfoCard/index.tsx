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
        <Card shadow="none" className={`${className} border border-divider`}>
            <CardHeader className="p-4 pb-2 text-xl font-semibold leading-none"> Info </CardHeader>
            <CardBody className="p-4 gap-3">
                <Title />
                <Description />
            </CardBody>
        </Card>
    )
}
