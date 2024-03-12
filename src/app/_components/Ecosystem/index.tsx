import { Spacer } from "@nextui-org/react"
import React from "react"

interface EcosystemProps {
  className?: string;
}

export const Ecosystem = (props: EcosystemProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="text-2xl font-bold text-center">
        Discover the Ecosystem
            </div>
            <Spacer y={6} />
            <div className="text-xl text-center">
        STARCI token empowers users with a versatile digital asset designed to
        facilitate seamless transactions and interactions within the STARCI
        ecosystem.
            </div>
            <Spacer y={6} />
            {/* <div className="grid place-items-center">
                <Button color="primary" className="text-secondary-foreground" size="lg"> Buy STARCI </Button>
            </div>      */}
        </div>
    )
}
