import React, { useContext } from "react"
import Rating from "../Rating"
import { Avatar } from "@nextui-org/react"
import { CourseDetailsContext } from "../../_hooks"

export const CourseBanner = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state
    return (
        <div className='w-full h-72 object-cover bg-gray-200	px-[5em] py-[2em]'>
            <div className='w-2/3'>
                <h1 className='mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-4xl '>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
                        {course?.title}
                    </span>{" "}
         
                </h1>
                <p className='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
                    {course?.description}
                </p>
                <Rating />
                <div className='flex items-center my-2'>
                    <Avatar name="Junior" size='sm' />
                    <div>
                        <p className='ms-2 text-sm font-medium text-gray-900 dark:text-white'>
            Created by{" "}
                            <a href='#' className='text-grey-900 underline hover:underline'>
                               abc
                            </a>
                        </p>
                    </div>
          
                </div>

                <div className='py-2 flex'>
                    <p className='text-sm font-extrabold text-gray-900 dark:text-gray-400 '>
            423,554 
                    </p>
                    <p className='text-sm font-normal text-gray-500 dark:text-gray-400 ps-1'>
          already enroll
                    </p>
                </div>
            </div>
        </div>
    )
}

