import { Skeleton, Spacer } from "@nextui-org/react"
import { CourseFilterSkeleton } from "../CourseFilters/CourseFilterSkeleton"
import { CardListSkeleton } from "../../../_shared"

export const CoursesSkeleton = () => {
    return (
        <div>
            <div className="p-12 pt-6 max-w-[1920px] w-full mx-auto">
                <div className='flex'>
                    <Skeleton className="w-40 h-6 rounded-lg">
                        <div className="w-40 h-6 rounded-lg"/>
                    </Skeleton>
                </div>
                <Spacer y={10} />
                <div className=' grid grid-row md:grid-cols-5 lg:grid-cols-4 gap-4'>
                    <div className='md:col-span-2 lg:col-span-1' >
                        <CourseFilterSkeleton  />
                    </div>
                    <div className='col-span-3'>
                        <Spacer y={1} />
                        <div className="mb-6 flex">
                            <Skeleton className="w-20 h-8 rounded-lg mr-4 ">
                                <div className="w-20 h-8 rounded-lg "/>
                            </Skeleton>
                            <Skeleton className="w-20 h-8 rounded-lg mr-4">
                                <div className="w-20 h-8 rounded-lg "/>
                            </Skeleton>
                        </div>
                        <CardListSkeleton  />
                    </div>
                </div>
            </div>
        </div>

    )
}