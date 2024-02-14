import { PlusIcon } from "@heroicons/react/16/solid"
import { Card, CardBody } from "@nextui-org/react"
import React, { useContext } from "react"
import { TargetsContext } from "../TargetsProviders"
export const AddTargetCard = () => {
    const { functions } = useContext(TargetsContext)!
    const { addTarget } = functions

    const onClick = async () => addTarget("Write something here")
    return (
        <Card
            onClick={onClick}
            shadow="none"
            className="bg-content2"
            isPressable
            fullWidth
        >
            <CardBody className="grid place-items-center py-2.5">
                <PlusIcon className="w-6 h-6" />
            </CardBody>
        </Card>
    )
}
