"use client"
import React from "react"

import { Accordion, AccordionItem } from "@nextui-org/react"

const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
    "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
}

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

const CourseContent = () => {
    return (
        <>
            <h2 className='text-2xl font-extrabold dark:text-white py-2'>
        Course Content
            </h2>

            <Accordion
                showDivider={false}
                className='p-2 flex flex-col gap-1 w-full '
                variant='shadow'
                itemClasses={itemClasses}
            >
                <AccordionItem
                    key='1'
                    aria-label='Connected devices'
                    subtitle={<p className='flex'>3 videos</p>}
                    title={
                        <div className='flex gap-1 items-center font-medium	'>
              Lesson 1:
                            <p>Foundation of JS</p>
                        </div>
                    }
                >
                    {defaultContent}
                </AccordionItem>
                <AccordionItem
                    key='2'
                    aria-label='Connected devices'
                    subtitle={<p className='flex'>4 videos</p>}
                    title={
                        <div className='flex gap-1 items-center font-medium	'>
              Lesson 2:
                            <p>Function</p>
                        </div>
                    }
                >
                    {defaultContent}
                </AccordionItem>
                <AccordionItem
                    key='3'
                    aria-label='Connected devices'
                    subtitle={<p className='flex'>5 videos</p>}
                    title={
                        <div className='flex gap-1 items-center font-medium	'>
              Lesson 3:
                            <p>Variables</p>
                        </div>
                    }
                >
                    {defaultContent}
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default CourseContent
