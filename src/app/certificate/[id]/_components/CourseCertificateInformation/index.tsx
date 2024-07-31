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
            <div className="flex flex-row gap-2 bg-primary-100 p-8">
                <div>
                    <User
                        avatarProps={{
                            src: getAvatarUrl({
                                avatarId: data?.account.avatarId,
                                avatarUrl: data?.account.avatarUrl,
                                kind: data?.account.kind,
                            }),
                            className: "w-16 h-16"
                        }}
                        name=""
                    />
                </div>
                <div className="flex flex-col p-2">
                    <div className="text-xl font-bold mb-4">Completed by <span className="uppercase">{data?.account.username ? data?.account.username : "Username"}</span></div>
                    <div className="font-bold">{dayjs(data?.createdAt).format("MMMM DD, YYYY")}</div>
                    <div className="font-bold">6 hours (approximately)</div>
                    <div className="font-bold">Grade Achieved: 100%</div>
                    <div className="mt-4">
                        <span className="uppercase">{data?.account.username}</span> account is verified. CiStudy certifies their successful completion of {data?.course.title}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className='mb-4 text-2xl font-semibold text-black bg-clip-text py-1 capitalize'>
                    {data?.course.title}
                </div>

                <div className='text-slate-700 font-medium text-sm md:text-base lg:text-lg line-clamp-3 '>
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
                            name: "font-semibold text-slate-800",
                            description: "font-semibold text-slate-600"
                        }}
                        name={course?.creator.username}
                        className="text-white mb-2 lg:mb-0"
                        description={formatNouns(course?.creator.numberOfFollowers, "follower")}
                    />
                        
                    <div className="mr-52 flex items-center">
                        <div className="flex items-center">
                            <div className="pb-1">
                                <Stars  readonly size={20} initialValue={course?.courseRatings.overallCourseRating} />
                            </div>
                            <div className="text-black text-sm  ms-2 ">{course?.courseRatings.overallCourseRating?.toFixed(1)}</div>
                            
                        </div>
                        <div className="text-black text-sm ms-2 hidden lg:inline-block">{course?.courseRatings.totalNumberOfRatings && course?.courseRatings.totalNumberOfRatings > 1 ? `(${course?.courseRatings.totalNumberOfRatings} ratings)` : `(${course?.courseRatings.totalNumberOfRatings || 0} rating)`}</div>
                        <div className="text-black text-sm ms-2 ">{course?.numberOfEnrollments && course?.numberOfEnrollments > 1 ? `${course?.numberOfEnrollments} students` : `${course?.numberOfEnrollments || 0} student`}</div>
                    </div>
                </div>
                <div className="text-2xl font-semibold capitalize">What you will learn</div>
                <Spacer y={4} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start p-6 py-8 border border-divider rounded-medium">
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