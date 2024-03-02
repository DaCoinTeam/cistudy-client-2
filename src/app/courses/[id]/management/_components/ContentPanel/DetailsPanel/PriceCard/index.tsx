import { Card, CardBody, Divider, Image, Tooltip } from "@nextui-org/react"
import { HelpCircleIcon } from "lucide-react"
import React from "react"

interface PriceCardProps {
  className?: string;
}

export const PriceCard = (props: PriceCardProps) => {
    const { className } = props
    return (
        <Card className={`${className}`}>
            <CardBody className="p-4 gap-4 pt-3 pb-0">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-foreground-500">
                        <div className="text-lg font-semibold">
                        Net Price
                        </div>    
                        <Tooltip content={"Cuong dep trai"}>
                            <HelpCircleIcon size={18} />
                        </Tooltip>
                    </div>
                    <div className="flex items-center gap-1">
                        <Image
                            alt="starciLogo"
                            src="/starci-logo.svg"
                            className="w-[18px] h-[18px]"
                        />
                        <div className="text-lg font-semibold"> 123123 </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-foreground-500">
                        <div className="font-semibold">
                        Fee
                        </div>    
                        <Tooltip content={"Cuong dep trai"}>
                            <HelpCircleIcon size={20} strokeWidth={4/3} />
                        </Tooltip>
                    </div>
                    <div className="flex items-center gap-1">
                        <Image
                            alt="starciLogo"
                            src="/starci-logo.svg"
                            className="w-4 h-4"
                        />
                        <div> 123123 <span className="text-primary">(40%)</span> </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-foreground-500">
                        <div className="font-semibold">
                        Actual
                        </div>    
                        <Tooltip content={"Cuong dep trai"}>
                            <HelpCircleIcon size={20} strokeWidth={4/3} />
                        </Tooltip>
                    </div>
                    <div className="flex items-center gap-1">
                        <Image
                            alt="starciLogo"
                            src="/starci-logo.svg"
                            className="w-4 h-4"
                        />
                        <div> 123123 </div>
                    </div>
                </div>
                <Divider/>
            </CardBody>
        </Card>
    )
}
