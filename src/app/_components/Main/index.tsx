"use client"
import { Image, Spacer } from "@nextui-org/react"

import { BG_DECORATION } from "@config"
import { BestInstrutors } from "./BestInstructors"
import { Heading } from "./Heading"
import { LearningSteps } from "./LearningSteps"
import { NumberShow } from "./NumberShow"
export const Main = () => {
    return (
        <div className='relative overflow-hidden '>
            <div className='w-[80%] absolute -z-10]'>
                <Image
                    alt='bg_decoration'
                    className='rounded-none h-[580px] mt-[-1rem]'
                    src={BG_DECORATION}
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
                <Spacer y={6} />
            </div>
        </div>
    )
}
