import { BreadcrumbItem, Breadcrumbs, Chip, Image, Spacer, User } from "@nextui-org/react"
import { CourseDetailsContext } from "../../_hooks"
import { useContext } from "react"
import { getAssetUrl, getAvatarUrl } from "@services"
import { Stars } from "../../../../_shared"

interface CourseBannerProps {
  className?: string;
}

export const CourseBanner = (props: CourseBannerProps) => {
    const { className } = props
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { title, creator, description, courseTopics, courseSubcategories, category } = { ...course }
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = {
        ...creator,
    }
    const { name } = { ...category }

    const subcategories = courseSubcategories?.map(({ subcategory }) => subcategory)
    const topics = courseTopics?.map(({ topic }) => topic)

    return (
        <div
            className={`${className} h-auto object-cover bg-content3 justify-start`}
        >
            <div className="p-12 w-full max-w-[1920px] m-auto">
                <div className="w-2/3">
                    <Breadcrumbs>
                        <BreadcrumbItem>{name}</BreadcrumbItem>
                        <BreadcrumbItem>{subcategories?.map(({name}) => name).join(", ")}</BreadcrumbItem>
                    </Breadcrumbs>
                    <Spacer y={4} />
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 to-30% from-sky-400 md:text-4xl py-1">
                        {title}
                    </div>
                    <div className="text-foreground-500 text-lg">{description}</div>
                    <Spacer y={4} />
                    <User
                        avatarProps={{
                            src: getAvatarUrl({
                                avatarId,
                                avatarUrl,
                                kind,
                            }),
                        }}
                        name={username}
                        description={`${numberOfFollowers} followers`}
                    />
                    <Spacer y={3} />
                    <Stars readonly />
                    <Spacer y={4} />
                    <div className="flex gap-2 items-center">
                        {topics?.map(({ topicId, name, svgId }) => (
                            <Chip
                                className="bg-content2"
                                key={topicId}
                                startContent={
                                    <Image
                                        alt="topicSvg"
                                        src={getAssetUrl(svgId)}
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
