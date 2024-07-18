import React from "react"
import { Skeleton } from "@nextui-org/react"

export const CourseSkeleton = () => {
    return (
        <div className="w-full space-y-20 p-4 " >
            <Skeleton className="rounded-lg">
                <div className="h-80 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3 px-12 w-4/5 mb-10">
                <Skeleton className="w-2/5 rounded-lg mb-8">
                    <div className="h-6 w-1/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <div className="grid grid-cols-2 gap-4 gap-y-8">
                    <Skeleton className=" rounded-lg ">
                        <div className="h-3 rounded-lg bg-default-200"/>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <div className="h-3 rounded-lg bg-default-200"/>
                    </Skeleton>
                    <Skeleton className=" rounded-lg">
                        <div className="h-3rounded-lg bg-default-200"/>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <div className="h-3 rounded-lg bg-default-200"/>
                    </Skeleton>
                </div>
            </div>
            <div className="space-y-4 px-12 w-4/5">
                <Skeleton className="w-2/5 rounded-lg mb-8">
                    <div className="h-6 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="h-3 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="h-3 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="h-3 rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>
        </div>

    )
}


