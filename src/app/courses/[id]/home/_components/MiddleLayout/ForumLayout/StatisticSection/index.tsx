import { getCourseStatistic } from "@services"
import React, { useContext } from "react"
import useSWR from "swr"
import { HomeContext } from "../../../../_hooks"
import { Card, CardBody, CardHeader, Spacer } from "@nextui-org/react"
import { CheckCheck, HandCoins, MessageCircleMore, Newspaper, ThumbsUp } from "lucide-react"

export const StatisticSection = () => {
    const { swrs: { courseHomeSwr: { data: course }}} = useContext(HomeContext)!
    const { courseId } = { ...course }

    const { data } = useSWR(["STATISTIC_SWR", courseId] , async () => {
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
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <Card shadow="none" className="border border-divider">
                        <CardHeader className="text-2xl text-primary">
                            Total Earning 
                        </CardHeader>
                        <CardBody className="text-xl text-primary flex flex-col items-center gap-2">
                            <HandCoins size={40} className="text-primary" />
                            {data?.totalEarning?.toFixed(2)} STARCI
                        </CardBody>
                    </Card>

                    <Card shadow="none" className="border border-divider">
                        <CardHeader className="text-2xl text-primary">
                            Rewardable Posts Left
                        </CardHeader>
                        <CardBody className="text-xl text-primary flex flex-col items-center gap-2">
                            <Newspaper size={40} className="text-primary" />
                            {data?.numberOfRewardablePostsLeft}
                        </CardBody>
                    </Card>
                </div>

                <Spacer y={6} />
                
                <div className="flex flex-row gap-4">
                    <Card shadow="none" className="border border-divider">
                        <CardHeader className="text-2xl text-primary">
                            Total Rewardable Comments
                        </CardHeader>
                        <CardBody className="text-xl text-primary flex flex-col items-center gap-2">
                            <MessageCircleMore size={40} className="text-primary" />
                            {data?.commentPosts?.length}
                        </CardBody>
                    </Card>

                    <Card shadow="none" className="border border-divider">
                        <CardHeader className="text-2xl text-primary">
                            Total Rewardable Likes
                        </CardHeader>
                        <CardBody className="text-xl text-primary flex flex-col items-center gap-2">
                            <ThumbsUp size={40} className="text-primary" />
                            {data?.likePosts?.length}
                        </CardBody>
                    </Card>

                    <Card shadow="none" className="border border-divider">
                        <CardHeader className="text-2xl text-primary">
                            Total Rewardable Solutions
                        </CardHeader>
                        <CardBody className="text-xl text-primary flex flex-col items-center gap-2">
                            <CheckCheck size={40} className="text-primary" />
                            {data?.markedPosts?.length}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}