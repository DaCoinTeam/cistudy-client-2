"use client"
import React, { useContext } from "react"

import { Accordion, AccordionItem } from "@nextui-org/react"


import { CourseDetailsContext } from "../../../../_hooks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay} from "@fortawesome/free-solid-svg-icons"


const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
const itemClasses = {
    title: "font-normal text-medium",
    indicator: "text-medium",
    content: "text-small px-2",
    trigger: "!py-3",
    base: "!shadow-none border border-divider gap-4",
}
const CourseContent = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const  sections  = course?.sections
    return (
        <>
            <h2 className='text-2xl font-extrabold dark:text-white py-2'>
        Course Content
            </h2>

            <Accordion
                showDivider={false}
                className='p-2 flex flex-col gap-1 w-full '
                itemClasses={itemClasses}
                selectionMode="multiple"
                variant="splitted"
            >
                { sections ? sections?.map((section, index) => (
                    <AccordionItem
                        key={section.sectionId}
                        aria-label='Connected devices'
                        subtitle={<p className='flex'>{section.lectures.length} videos</p>}
                        title={
                            <div className='flex gap-1 items-center font-medium	'>
                             Lesson {index + 1}:
                                <p>{section.title}</p>
                            </div>
                        }
                    >
                        {section.lectures.map((lecture) => (
                            <div key={lecture.lectureId} className='flex gap-1 items-center font-medium	my-1'>
                                <FontAwesomeIcon icon={faCirclePlay} color="secondary"  className=" text-default w-4 h-4  p-1  " />
                                <p>{lecture.title}</p>
                            </div>
                        ))}
                    </AccordionItem>
                )) : <AccordionItem
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
                </AccordionItem>}
            </Accordion>
        </>
    )
}

export default CourseContent
