import React from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"
import { Avatar } from "@nextui-org/react"

const Review = () => {
    return (
        <article>
            <div className='flex items-center mb-4 '>
                <Avatar
                    className='w-10 h-10 me-4 '
                    src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                />

                <div className='font-medium dark:text-white items-center'>
                    <p>Jese Leos </p>
                    <p className=' text-sm text-gray-500 dark:text-gray-400'>
                        <time dateTime='2017-03-03 19:00'>March 3, 2017</time>
                    </p>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center mb-1 space-x-1 rtl:space-x-reverse'>
                    <StarIcon className='text-yellow-400 w4- h-4 ' />
                    <StarIcon className='text-yellow-400 w4- h-4 ' />
                    <StarIcon className='text-yellow-400 w4- h-4 ' />
                    <StarIcon className='text-yellow-400 w4- h-4 ' />
                    <StarIconOutline className='text-yellow-400 w4- h-4 ' />
                </div>
                <h3 className='ms-3 text-sm font-semibold text-gray-900 dark:text-white'>
          Thinking to buy another one!
                </h3>
            </div>
            <p className='mb-2 text-sm  text-gray-900 dark:text-gray-400'>
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time, popped on an identical strap from another Invicta and went in the
        shower with it to test the waterproofing.... No problems.
            </p>
            <a
                href='#'
                className='block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
            >
        Read more
            </a>
            <aside>
                <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
          19 people found this helpful
                </p>
                <div className='flex items-center mt-3'>
                    <a
                        href='#'
                        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                    >
            Helpful
                    </a>
                    <a
                        href='#'
                        className='ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600'
                    >
            Report abuse
                    </a>
                </div>
            </aside>
        </article>
    )
}
export default Review
