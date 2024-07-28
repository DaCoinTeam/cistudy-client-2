"use client"
import { Image, Spacer } from "@nextui-org/react"

import { BG_DECORATION, BG_DECORATION_DARK } from "@config"
import { BestInstrutors } from "./BestInstructors"
import { Heading } from "./Heading"
import { LearningSteps } from "./LearningSteps"
import { NumberShow } from "./NumberShow"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
export const Main = () => {
    const darkMode = useSelector((state: RootState) => state.configuration.darkMode)

    return (
        <div className='relative overflow-hidden '>
            <div className='w-[100%] absolute -z-10]'>
                <Image
                    alt='bg_decoration'
                    className='rounded-none h-[620px] mt-[-1rem]'
                    classNames={{
                        wrapper: "w-full !max-w-full absolute",
                    }}
                    src={darkMode ? BG_DECORATION_DARK : BG_DECORATION}
                />
            </div>
            <div className='px-2 '>
                <Heading/>
                <Spacer y={12} />
                <NumberShow />
                <Spacer y={12} />
                <LearningSteps />
                <Spacer y={12} />
                <BestInstrutors/>
                <Spacer y={12} />
            </div>
        </div>
    )
}
