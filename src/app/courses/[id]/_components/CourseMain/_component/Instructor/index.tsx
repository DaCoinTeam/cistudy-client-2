import React from "react"
import { Avatar, Spacer } from "@nextui-org/react"
import { MdVideoLibrary } from "react-icons/md"
import { MdGroups } from "react-icons/md"

const Instructor = () => {
    return (
        <>
            <h2 className='text-2xl font-extrabold dark:text-white '>
        Instructor
            </h2>
            <Spacer y={2} />
            <div className='flex items-center'>
                <Avatar name='Junior'  className="w-24 h-24 text-large"
                    src='https://cdn.aglty.io/boys-town/quotes/ryan_20230915120925.jpg'

                />
                <div className='font-medium dark:text-white items-center ms-5'>
                    <p className='text-xl font-extrabold dark:text-white '>Jese Leos </p>
                    <p className=' text-md font-normal text-gray-500 dark:text-gray-400'>
            Software Engineer, Teacher
                    </p>
                    <div className='flex items-center'>
                        {" "}
                        <MdVideoLibrary className='text-gray-500 dark:text-gray-400' />
                        <p className='ms-2 text-sm font-normal text-gray-500 dark:text-gray-400'>
                            {" "}
              4 courses
                        </p>
                    </div>
                    <div className='flex items-center'>
                        {" "}
                        <MdGroups className='text-gray-500 dark:text-gray-400' />
                        <p className='ms-2 text-sm font-normal text-gray-500 dark:text-gray-400'>
                            {" "}
              425,000 students
                        </p>
                    </div>
                </div>
            </div>
            <div className='my-2'>
                <p className="mb-3 text-sm text-gray-900 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>

            </div>
        </>
    )
}
export default Instructor
