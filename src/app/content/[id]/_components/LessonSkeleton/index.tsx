import React from "react"
import { Skeleton, Spacer } from "@nextui-org/react"

export const LessonSkeleton = () => {
    return (
        <div>
            <div className='grid grid-cols-7 max-w-[1920px] gap-12 p-12 mx-auto'>
                {/* <div className='col-span-5 space-y-6'>
                    <Skeleton className='rounded-lg mr-2'>
                        <div className='h-72  rounded-lg bg-default-300'></div>
                    </Skeleton>
                    <Skeleton className='rounded-lg mb-2'>
                        <div className='h-6  w-2/3 rounded-lg bg-default-300'></div>
                    </Skeleton>
                    <div className='w-2/5 grid grid-cols-2 gap-4'>
                        <Skeleton className='rounded-lg mb-2'>
                            <div className='h-8 rounded-lg bg-default-300'></div>
                        </Skeleton>
                        <Skeleton className='rounded-lg mb-2'>
                            <div className='h-8 rounded-lg bg-default-300'></div>
                        </Skeleton>
                    </div>

                    <Skeleton className='rounded-lg mb-2'>
                        <div className='h-14 rounded-lg bg-default-300'></div>
                    </Skeleton>
                </div>
                <div className='col-span-2'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className='rounded-lg mb-2'>
                            <div className='h-40 rounded-lg bg-default-300'></div>
                        </Skeleton>
                    ))}
                </div>
            </div> */}

                <div role="status" className="col-span-2 border border-gray-200 divide-y divide-gray-200 rounded-xl shadow animate-pulse dark:divide-gray-700  dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4 px-4 pt-6 ">
                        <div className="flex items-center">
                            <Skeleton className="w-32 h-7 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div className="w-32 h-7 "></div>
                            </Skeleton>
                        </div>            
                    </div>
                    <div className="mb-4 px-4 pt-6 pb-10">
                        <div className="flex items-center justify-between  mb-6">
                            <div className="flex items-center">
                                <Skeleton className="w-7 h-7 mr-4 bg-gray-300 rounded-full dark:bg-gray-600">
                                    <div className="h-7 w-7 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                                </Skeleton>
                                <div>
                                    <Skeleton className="w-36 h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                                        <div className="w-36 h-4 "/>
                                    </Skeleton>
                                    <Spacer y={2}/>
                                    <Skeleton className="w-40 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                                        <div className="w-40 h-3 "/>
                                    </Skeleton>
                                </div>
                              
                            </div>
                            <div className="h-5 w-6 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="flex items-center">
                            <Skeleton className="w-7 h-7 mr-4 bg-gray-300 rounded-full dark:bg-gray-600">
                                <div className="h-7 w-7 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                            </Skeleton>
                            <div>
                                <Skeleton className="w-36 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="w-36 h-3 "/>
                                </Skeleton>
                                <Spacer y={2}/>
                                <Skeleton className="w-40 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="w-40 h-2 "/>
                                </Skeleton>
                            </div>
                              
                        </div>
                        <div className="flex items-center">
                            <Skeleton className="w-7 h-7 mr-4 bg-gray-300 rounded-full dark:bg-gray-600">
                                <div className="h-7 w-7 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                            </Skeleton>
                            <div>
                                <Skeleton className="w-36 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="w-36 h-3 "/>
                                </Skeleton>
                                <Spacer y={2}/>
                                <Skeleton className="w-40 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="w-40 h-2 "/>
                                </Skeleton>
                            </div>
                              
                        </div>
                    </div>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between mb-6 pt-6 px-4">
                            <div className="flex items-center">
                                <Skeleton className="w-7 h-7 mr-4 bg-gray-300 rounded-full dark:bg-gray-600">
                                    <div className="h-7 w-7 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                                </Skeleton>
                                <Skeleton className="w-28 h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="w-28 h-4 "/>
                                </Skeleton>
                            </div>
                            <div className="h-5 w-6 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
