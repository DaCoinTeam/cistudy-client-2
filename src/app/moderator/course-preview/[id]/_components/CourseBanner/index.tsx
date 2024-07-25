import { Spacer, User } from "@nextui-org/react"
import { CoursePreviewContext } from "../../_hooks"
import { useContext } from "react"
import { getAvatarUrl } from "@services"

interface CourseBannerProps {
  className?: string;
}

export const CourseBanner = (props: CourseBannerProps) => {
    const { className } = props
    const { swrs } = useContext(CoursePreviewContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { title, creator, description } = { ...course }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }

    return (
        <div
            className={`${className} h-auto object-cover bg-content3 justify-start`}
        >
            <div className="p-12 w-full max-w-[1920px] m-auto">
                <div className="w-2/3">
                    {/* <Breadcrumbs>
                        <BreadcrumbItem>{name}</BreadcrumbItem>
                        <BreadcrumbItem>{subcategories?.map(({name}) => name).join(", ")}</BreadcrumbItem>
                    </Breadcrumbs> */}
                    <Spacer y={4} />
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 to-30% from-sky-400 md:text-4xl py-1">
                        {title}
                    </div>
                    <div className="text-foreground-400 text-lg line-clamp-2">{description}</div>
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
                    />
                    <Spacer y={3} />
                    <Spacer y={4} />
                    <div className="flex gap-2 items-center">
                        {/* {topics?.map(({ topicId, name, svgId }) => (
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
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
