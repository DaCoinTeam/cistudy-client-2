import { Avatar, Spacer } from "@nextui-org/react"
import { useContext } from "react"
import { getAvatarUrl } from "../../../../../../services/server"
import { Stars } from "../../../../../_shared"
import { CourseDetailsContext } from "../../../_hooks"

interface InstructorProps {
  className?: string;
}

export const Instructor = (props: InstructorProps) => {
    const { className } = props
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { creator } = { ...course }
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = {
        ...creator,
    }
    return (
        <div className={`${className}`}>
            <div className="text-2xl font-bold">Instructor</div>
            <Spacer y={4} />
            <div className="flex items-center gap-3">
                <Avatar
                    name="avatar"
                    className="w-24 h-24"
                    src={getAvatarUrl({
                        avatarId, avatarUrl, kind
                    })}
                />
                <div>
                    <div className="ml-1">
                        <div className="text-lg font-semibold">{username}</div>
                        <div className="text-sm text-foreground-400">
                            {numberOfFollowers} follower
                        </div>
                    </div>
                    
                    <Stars initialValue={5} readonly />
                </div>
            </div>
            <div className="my-2">
                <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-400">
          Track work across the enterprise through an open, collaborative
          platform. Link issues across Jira and ingest data from other software
          development tools, so your IT support and operations teams have richer
          contextual information to rapidly respond to requests, incidents, and
          changes.
                </p>
            </div>
        </div>
    )
}
