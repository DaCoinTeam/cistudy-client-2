import React from "react"
import { Skeleton } from "@nextui-org/react"

export const LessonSkeleton = () => {
    return (
        <div>
            <div className='grid grid-cols-7 max-w-[1920px] gap-12 p-12 mx-auto'>
                <div className='col-span-5 space-y-6'>
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
            </div>
        </div>
    )
}
