import React from "react"
import {Card, Skeleton} from "@nextui-org/react"

export const CardSkeleton = () => {
    return (
        <Card className="w-full space-y-10 p-4" radius="sm">
            <Skeleton className="rounded-lg">
                <div className="h-32 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-4">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">  
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
        
    )
}
