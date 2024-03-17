import React from "react"
import { Image, Spacer } from "@nextui-org/react"
import { DeployedChains } from "./DeployedChains"
import { STARCI_TEACH } from "@config"

export const Heading = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="h-[800px] -rotate-6 w-[200%] bg-primary/10 absolute -top-[50%] -left-[50%]"> </div>
            <div className="mt-12 max-w-[960px] px-6 mx-auto">
                <div className="grid grid-cols-2 gap-6 items-center">
                    <div className="col-span-1">
                        <div className="text-[5rem] font-bold text-primary"> 
                            <span className="text-primary">
                        Ci
                            </span>
                            <span className="text-success">
                        Study
                            </span>
                        </div>
                        <div className="text-xl">
            Share-to-Earn: Where Sharing Sparks Earnings!
                        </div>
                    </div>
                    <Image
                        className="col-span-1"
                        alt="starciTeach"
                        src={STARCI_TEACH}
                    />
                </div>
                <Spacer y={12} />
                <div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">
          Shaping the Future of Decentralized Sharing
                        </div>
                        <div className="text-2xl font-bold">CiStudy Unstoppable Expansion</div>
                    </div>
                    <Spacer y={6}/>
                    <div className="grid grid-cols-3">
                        <div className="grid place-items-center">
                            <div className="text-xl">
                            Total Users
                            </div>
                            <div className="text-4xl font-bold">
                            123
                            </div>
                            <div className="text-foreground-500">
                             in the last 30 days
                            </div>
                        </div>
                        <div className="grid place-items-center">
                            <div className="text-xl">
                            Total Courses
                            </div>
                            <div className="text-4xl font-bold">
                            123
                            </div>
                            <div className="text-foreground-500">
                             in the last 30 days
                            </div>
                        </div>
                        <div className="grid place-items-center">
                            <div className="text-xl">
                            Total Posts
                            </div>
                            <div className="text-4xl font-bold">
                            123
                            </div>
                            <div className="text-foreground-500">
                             in the last 30 days
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={6}/>
                <DeployedChains/> 
            </div>
        </div>
    )
}