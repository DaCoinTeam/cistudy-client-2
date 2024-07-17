import { CategoryEntity } from "@common"
import {
    BreadcrumbItem,
    Breadcrumbs,
    Chip,
    Image,
    Spacer,
    User,
} from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
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
    const { title, creator, description, courseCategories, courseRatings } = { ...course }
    const {overallCourseRating} = { ...courseRatings }
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
            className={`${className} h-auto object-cover bg-primary justify-start`}
        >
            <div className='p-12 w-full max-w-[1920px] m-auto'>
                <div className='w-2/3'>
                    <Breadcrumbs>
                        <BreadcrumbItem>
                            {categories.categoryLevel0?.map(({ name }) => name).join(", ")}
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {categories.categoryLevel1?.map(({ name }) => name).join(", ")}
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {categories.categoryLevel2?.map(({ name }) => name).join(", ")}
                        </BreadcrumbItem>
                    </Breadcrumbs>
                    <Spacer y={4} />
                    <div className='text-2xl font-bold text-transparent bg-clip-text text-white md:text-4xl py-1'>
                        {title}
                    </div>
                    <div className='text-slate-300 font-semibold text-lg'>
                        {description}
                    </div>
                    <Spacer y={4} />
                    <User
                        avatarProps={{
                            src: getAvatarUrl({
                                avatarId,
                                avatarUrl,
                                kind,
                            }),
                        }}
                        classNames={{
                            name: "font-semibold",
                            description: "font-semibold"
                        }}
                        name={username}
                        className="text-white"
                        description={`${numberOfFollowers} followers`}
                    />
                    <Spacer y={3} />
                    <Stars readonly initialValue={overallCourseRating} />
                    <Spacer y={4} />
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
                </div>
            </div>
        </div>
    )
}
