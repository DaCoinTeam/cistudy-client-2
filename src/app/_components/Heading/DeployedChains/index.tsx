import { Button, Image } from "@nextui-org/react"
import React from "react"

export const DeployedChains = () => {
    const chains = [
        {   
            key: "klaytn",
            title: "Klaytn",
            icon: <Image height={24} width={24} radius="full" alt="klaytn" src="/klaytn-logo.svg"/>
        },
        {
            key: "polygon",
            title: "Polygon",
            icon: <Image height={24} width={24} radius="full" alt="klaytn" src="/polygon-logo.svg"/>
        }
    ]
    return (
        <div className="w-fit mx-auto">
            <div className="flex gap-2">
                {
                    chains.map(
                        ({key, icon, title}) => (
                            <Button size="lg" className="flex-1" startContent={icon} key={key}>      
                                {title}
                            </Button>
                        )
                    )
                }
            </div>
        </div>
       
    )
}