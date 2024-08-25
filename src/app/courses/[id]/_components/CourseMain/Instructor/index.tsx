import { Avatar, Spacer } from "@nextui-org/react"
import { useContext } from "react"
import { getAvatarUrl } from "../../../../../../services/server"
import { Stars, UserTooltip } from "../../../../../_shared"
import { CourseDetailsContext } from "../../../_hooks"
import { formatNouns } from "@common"

interface InstructorProps {
  className?: string;
}

export const Instructor = (props: InstructorProps) => {
    const { className } = props
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { creator } = { ...course }
    const {
        avatarId,
        avatarUrl,
        kind,
        username,
        numberOfFollowers,
        accountRatings,
        bio,
        accountId
    } = {
        ...creator,
    }
    const { overallAccountRating, totalNumberOfRatings } = { ...accountRatings }
    return (
        <div className={`${className}`}>
            <div className='text-2xl font-bold'>Instructor</div>
            <Spacer y={4} />
            <UserTooltip accountId={accountId ?? ""}>
                <div className='flex items-center gap-3'>
                    <Avatar
                        name='avatar'
                        className='w-24 h-24'
                        src={getAvatarUrl({
                            avatarId,
                            avatarUrl,
                            kind,
                        })}
                    />
                    <div>
                        <div className='ml-1'>
                            <div className='text-lg font-semibold'>{username}</div>
                            <div className='text-sm text-foreground-400'>
                                {formatNouns(numberOfFollowers, "follower")}
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className="pb-1">                        
                                <Stars initialValue={overallAccountRating} readonly />
                            </div>
                            <div className="ms-1 pt-1 text-sm text-slate-700 dark:text-slate-300">{overallAccountRating || 0}</div>
                            <div className='ms-1  pt-1 text-sm text-slate-700 dark:text-slate-300'>
                                {" "}
              ({formatNouns(totalNumberOfRatings, "rating")})
                            </div>
                        </div>
                    </div>
                </div>
            </UserTooltip>
           
            <div className='my-2'>
                <p className='mb-3 text-sm lg:text-base font-medium text-slate-800 dark:text-gray-400'>
                    {bio}
                </p>
            </div>
        </div>
    )
}
