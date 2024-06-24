import { Button, Image, Link, Spacer } from "@nextui-org/react"
import React from "react"
import { STARCI_COIN } from "@config"
// import { Courses } from "../Courses"

interface EcosystemProps {
  className?: string;
}

export const Ecosystem = (props: EcosystemProps) => {
    const { className } = props
    return (
        <div className={`${className ?? ""} grid place-items-center`}>
            <div className="text-2xl font-bold text-center">
        Discover the Ecosystem
            </div>
            <Spacer y={6} />
            <div className="text-xl text-center">
        STARCI token empowers accounts with a versatile digital asset designed to
        facilitate seamless transactions and interactions within the STARCI
        ecosystem.
            </div>
            <Spacer y={6} />
            <Image src={STARCI_COIN} alt="starciCoin" height={300} width={300} />  
            <Spacer y={6} />
            <div className="grid grid-cols-2 gap-2">
                <Button color="primary" size="lg"> Buy STARCI </Button>
                <Link as="button" size="lg" color="primary" className="flex justify-center" showAnchorIcon> Learn </Link>
            </div>   
        </div>    
    )
}
