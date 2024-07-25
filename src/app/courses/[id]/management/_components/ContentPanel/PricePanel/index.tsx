"use client"
import { PriceSection } from "./PriceSection"

interface PricePanelProps {
    className?: string
}
export const PricePanel = (props: PricePanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <PriceSection/>
            {/* <Spacer y={6}/>
            <EnrollmentsSection/>
            <Spacer y={6}/>
            <ReceivedWalletSection/> */}
        </div>
    )
}
