import { Skeleton } from "@nextui-org/react"

export const CourseFilterSkeleton = () => {
    return (
        
        <div role="status" className="w-[280px] border border-gray-200 divide-y divide-gray-200 rounded-xl shadow animate-pulse dark:divide-gray-700  dark:border-gray-700">
            <div className="flex items-center justify-between mb-4 px-4 pt-6 ">
                <div className="flex items-center">
                    <Skeleton className="w-7 h-7 mr-4 bg-gray-300 rounded-full dark:bg-gray-600">
                        <div className="h-7 w-7 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                    </Skeleton>
                    <Skeleton className="w-28 h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="w-28 h-6 "></div>
                    </Skeleton>
                </div>            
            </div>
            <div className="mb-4 px-4 pt-6 pb-10">
                <div className="flex items-center justify-between  mb-6">
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
                <div className="mb-3 ms-1" >
                    <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-4 bg-gray-300 rounded dark:bg-gray-600">
                            <div className="w-4 h-37 bg-gray-300 rounded dark:bg-gray-600"></div>
                        </Skeleton>
                        <div className="h-2.5 w-44 bg-gray-300 rounded-full dark:bg-gray-600  "></div>
                    </div>
                </div>
                <div className="mb-3 ms-1" >
                    <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-4 bg-gray-300 rounded dark:bg-gray-600">
                            <div className="w-4 h-37 bg-gray-300 rounded dark:bg-gray-600"></div>
                        </Skeleton>
                        <div className="h-2.5 w-20 bg-gray-300 rounded-full dark:bg-gray-600  "></div>
                    </div>
                </div>
                <div className="mb-3 ms-1" >
                    <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-4 bg-gray-300 rounded dark:bg-gray-600">
                            <div className="w-4 h-37 bg-gray-300 rounded dark:bg-gray-600"></div>
                        </Skeleton>
                        <div className="h-2.5 w-36 bg-gray-300 rounded-full dark:bg-gray-600  "></div>
                    </div>
                </div>
                <div className="mb-3 ms-1" >
                    <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-4 bg-gray-300 rounded dark:bg-gray-600">
                            <div className="w-4 h-37 bg-gray-300 rounded dark:bg-gray-600"></div>
                        </Skeleton>
                        <div className="h-2.5 w-40 bg-gray-300 rounded-full dark:bg-gray-600  "></div>
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

    )
}