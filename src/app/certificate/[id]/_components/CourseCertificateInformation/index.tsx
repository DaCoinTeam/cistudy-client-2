import { formatNouns } from "@common"
import { Spacer, User } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { Stars } from "../../../../_shared"
import { useContext } from "react"
import { CertificateContext } from "../../_hooks"
import dayjs from "dayjs"
import { CheckIcon } from "lucide-react"

export interface CourseCertificateInformationProps {
    className?: string
}

export const CourseCertificateInformation = (props: CourseCertificateInformationProps) => {
    const { swrs } = useContext(CertificateContext)!
    const { certificateSwr } = swrs
    const { data } = certificateSwr
    const { course } = { ...data }
    const { className } = props

    return (
        <div className={`${className}`}>
            <div className="flex flex-row gap-2 bg-primary-100 p-4 rounded-medium">
                <div>
                    <User
                        avatarProps={{
                            src: getAvatarUrl({
                                avatarId: data?.account.avatarId,
                                avatarUrl: data?.account.avatarUrl,
                                kind: data?.account.kind,
                            }),
                        }}
                        name=""
                    />
                </div>
                <div className="grid gap-4">
                    <div>Completed by <span className="uppercase font-semibold">{data?.account.username ? data?.account.username : "Username"}</span></div>
                    <div className="text-sm">
                        <div>{dayjs(data?.createdAt).format("YYYY, MMMM DD")}</div>
                        <div>6 hours (approximately)</div>
                        <div>Grade Achieved: 100%</div>
                    </div>
                    <div>
                        <span className="uppercase font-semibold">{data?.account.username}</span> account is verified. CiStudy certifies their successful completion of {data?.course.title}
                    </div>
                </div>
            </div>
            <Spacer y={12}/>
            <div>
                <div className='text-3xl font-semibold'>
                    {data?.course.title}
                </div>
                <Spacer y={4} />        
                <div className='text-foreground-400 line-clamp-3'>
                    {data?.course.description}
                </div>
                <Spacer y={4} />
                <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between mb-4 lg:mb-6">
                    <User
                        avatarProps={{
                            src: getAvatarUrl({
                                avatarId: course?.creator.avatarId,
                                avatarUrl: course?.creator.avatarUrl,
                                kind: course?.creator.kind,
                            }),
                        }}
                        classNames={{
                            name: "font-semibold",
                        }}
                        name={course?.creator.username}
                        description={formatNouns(course?.creator.numberOfFollowers, "follower")}
                    />
                    <Spacer y={12}/>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            <div className="pb-1">
                                <Stars readonly size={20} initialValue={course?.courseRatings.overallCourseRating} />
                            </div>
                            <div className="text-sm">{course?.courseRatings.overallCourseRating?.toFixed(1)}</div>
                            
                        </div>
                        <div className="text-sm hidden lg:inline-block">{course?.courseRatings.totalNumberOfRatings && course?.courseRatings.totalNumberOfRatings > 1 ? `(${course?.courseRatings.totalNumberOfRatings} ratings)` : `(${course?.courseRatings.totalNumberOfRatings || 0} rating)`}</div>
                        <div className="text-sm">{course?.numberOfEnrollments && course?.numberOfEnrollments > 1 ? `${course?.numberOfEnrollments} students` : `${course?.numberOfEnrollments || 0} student`}</div>
                    </div>
                </div>
                <div className="font-semibold text-2xl">What you will learn</div>
                <Spacer y={4} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start p-4 border border-divider rounded-medium">
                    {data?.course.courseTargets?.map(({ courseTargetId, content }) => (
                        <div key={courseTargetId} className="flex flex-row items-start text-pretty">
                            <div className="mr-3">
                                <CheckIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-sm lg:text-base font-medium ">{content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}