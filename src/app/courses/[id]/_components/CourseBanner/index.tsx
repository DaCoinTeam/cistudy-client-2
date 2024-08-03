import { CategoryEntity, formatNouns, parseDateToString } from "@common"
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/outline"
import {
    BreadcrumbItem,
    Breadcrumbs,
    Chip,
    Image,
    Spacer,
    User,
} from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
import { CalendarDays, FileBadge, MonitorSmartphone } from "lucide-react"
import { useCallback, useContext, useMemo } from "react"
import { Stars } from "../../../../_shared"
import { CourseDetailsContext } from "../../_hooks"

interface CourseBannerProps {
  className?: string;
}

export const CourseBanner = (props: CourseBannerProps) => {
    const { className } = props
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { title, creator, description, courseCategories, courseRatings, numberOfEnrollments, updatedAt } = { ...course }
    const {overallCourseRating, totalNumberOfRatings} = { ...courseRatings }
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = {
        ...creator,
    }
    const getCategories = useCallback(() => {
        if (!courseCategories) return {}
        const categoryLevel0: Array<CategoryEntity> = []
        const categoryLevel1: Array<CategoryEntity> = []
        const categoryLevel2: Array<CategoryEntity> = []
        courseCategories.forEach((element) => {
            if (!element) return
            const { category } = element
            if (category.level == 0) categoryLevel0.push(category)
            else if (category.level == 1) categoryLevel1.push(category)
            else if (category.level == 2) categoryLevel2.push(category)
        })
        return { categoryLevel0, categoryLevel1, categoryLevel2 }
    }, [courseCategories])

    const categories = useMemo(getCategories, [courseCategories])

    return (
        <div
            className={`${className} object-cover mx-auto relative bg-[url(/bg-course-detail.jpg)] bg-cover bg-center h-[520px]`}
        >
            <div className='p-8 lg:p-16 pb-0  max-w-[1920px] flex mx-auto '>
                
                <div className='w-full lg:w-2/3 '>
                    <Breadcrumbs 
                        
                    >
                        <BreadcrumbItem classNames={{
                            item: "text-slate-700",
                            separator: "text-slate-700"
                        }}>
                            {categories.categoryLevel0?.map(({ name }) => name).join(", ")}
                        </BreadcrumbItem>
                        <BreadcrumbItem classNames={{
                            item: "text-slate-700",
                            separator: "text-slate-700"
                        }}>
                            {categories.categoryLevel1?.map(({ name }) => name).join(", ")}
                        </BreadcrumbItem>
                        <BreadcrumbItem classNames={{
                            item: "text-slate-900"
                        }}>
                            {categories.categoryLevel2?.map(({ name }) => name).join(", ")}
                        </BreadcrumbItem>
                    </Breadcrumbs>
                    <Spacer y={4} />
                    <div className='mb-4 text-2xl font-bold text-black bg-clip-text md:text-3xl  lg:text-4xl py-1'>
                        {title}
                    </div>

                    <div className='text-slate-700 font-medium text-sm md:text-base lg:text-lg line-clamp-3 '>
                        {description}
                    </div>
                    <Spacer y={4} />
                    <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between mb-4 lg:mb-6">
                        <User
                            avatarProps={{
                                src: getAvatarUrl({
                                    avatarId,
                                    avatarUrl,
                                    kind,
                                }),
                            }}
                            classNames={{
                                name: "font-semibold text-slate-800",
                                description: "font-semibold text-slate-600"
                            }}
                            name={username}
                            className="text-white mb-2 lg:mb-0"
                            description={formatNouns(numberOfFollowers, "follower")}
                        />
                        
                        <div className="mr-52 flex items-center">
                            <div className="flex items-center">
                                <div className="pb-1">
                                    <Stars  readonly size={20} initialValue={overallCourseRating} />
                                </div>
                                <div className="text-black text-sm  ms-2 ">{overallCourseRating?.toFixed(1)}</div>
                            
                            </div>
                            <div className="text-black text-sm ms-2 hidden lg:inline-block">{totalNumberOfRatings && totalNumberOfRatings > 1 ? `(${totalNumberOfRatings} ratings)` : `(${totalNumberOfRatings || 0} rating)`}</div>
                            <div className="text-black text-sm ms-2 ">{numberOfEnrollments && numberOfEnrollments > 1 ? `${numberOfEnrollments} students` : `${numberOfEnrollments || 0} student`}</div>
                        </div>
                    </div>
                                       
                    <div className='flex gap-2 items-center'>
                        {categories.categoryLevel2?.map(({ categoryId, name, imageId }) => (
                            <Chip
                                className='bg-content2'
                                key={categoryId}
                                startContent={
                                    <Image
                                        alt='topicSvg'
                                        src={getAssetUrl(imageId)}
                                        height={20}
                                        width={20}
                                    />
                                }
                            >
                                {name}
                            </Chip>
                        ))}
                    </div>
                    <Spacer y={6} />
                    <div className="flex flex-col 2xl:flex-row ">
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 gap-4">
                            <div className="flex items-center gap-2">
                                <GlobeAsiaAustraliaIcon className="w-6 h-6 text-content4-foreground"/>
                                <div className="text-content4-foreground text-sm">English</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays width={20} height={20} className="text-content4-foreground"/>
                                <div className="text-content4-foreground text-sm flex">Last updated: <p className="ms-1">{parseDateToString(updatedAt || new Date())}</p> </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileBadge width={20} height={20} className="text-content4-foreground"/>
                                <div className="text-content4-foreground text-sm">Certificate of completion</div>
                            </div>
                            <div className="flex items-center lg:ms-1 gap-2">
                                <MonitorSmartphone width={20} height={20} className="text-content4-foreground"/>
                                <div className="text-content4-foreground text-sm">Access on browser and mobile</div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
