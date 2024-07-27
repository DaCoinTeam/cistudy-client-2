import React from "react"
import {Card, Skeleton} from "@nextui-org/react"

export const CardSkeleton = () => {
    return (
        <Card className="w-full pb-4" shadow="sm">
            <Skeleton className="rounded-t-lg">
                <div className="h-36 rounded-t-lg bg-default-300"></div>
            </Skeleton>
            <div className="px-4 mt-6 mb-4">
                <Skeleton className=" rounded-lg mb-4">
                    <div className="h-4 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className=" w-1/2 rounded-lg mb-4">
                    <div className="h-4 w-1/2 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg mb-3">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>
            <div className="flex justify-between px-4">
                <Skeleton className="w-28 h-10 rounded-lg mb-2">
                    <div className="h-10 w-24 rounded-lg bg-default-300"/>
                </Skeleton>
                <Skeleton className="w-24 h-10 rounded-xl mb-2">
                    <div className="h-10 w-20 rounded-xl bg-default-300"/>
                </Skeleton>
            </div>
        </Card>
        
    )
}
