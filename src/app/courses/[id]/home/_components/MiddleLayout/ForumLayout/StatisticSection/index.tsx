import { getCourseStatistic } from "@services"
import React, { useContext } from "react"
import useSWR from "swr"
import { HomeContext } from "../../../../_hooks"

export const StatisticSection = () => {
    const { swrs: { courseHomeSwr: { data: course }}} = useContext(HomeContext)!
    const { courseId } = { ...course }

    const { data, isValidating } = useSWR(["STATISTIC_SWR", courseId] , async () => {
        if (!courseId) return
        return getCourseStatistic({
            params: {
                courseId
            }
        },
        {
            commentPosts: {
                postId: true,
            },
            likePosts: {
                postId: true
            },
            markedPosts: {
                postId: true
            },
            totalEarning: true,
            numberOfRewardablePostsLeft: true
        })
    })

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}