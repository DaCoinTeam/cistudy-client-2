import { Spacer, Tab, Tabs } from "@nextui-org/react"
import { CreatePostCard } from "./CreatePostCard"
import { InfinitePostsScroller } from "./InfinitePostsScroller"
import { ForumLayoutProvider } from "./ForumLayoutProvider"
import { EnrolledUsers } from "./EnrolledUsers"
import { useContext } from "react"
import { HomeContext } from "../../../_hooks"
import { StatisticSection } from "./StatisticSection"

interface ForumLayoutProps {
  className?: string;
}

export const WrappedForumLayout = (props: ForumLayoutProps) => {
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data } = courseHomeSwr

    return (
        <div className="w-full col-span-3">
            <Tabs
                variant="underlined"
                classNames={{
                    cursor: "w-full",
                    tabList: "p-0",
                    panel: "p-0 pt-6",
                }}
                aria-label="Options"
                color="primary"
            >
                <Tab key="news" title="News">
                    <div className={`${props.className} w-full`}>
                        <CreatePostCard />
                        <Spacer y={6} />
                        <InfinitePostsScroller />
                    </div>
                </Tab>
                <Tab
                    key="participants"
                    title={
                        <div className="flex gap-2 items-center">
                            <div>Participants</div>
                            <div> {(data?.students?.length ?? 0) + 1} </div>
                        </div>
                    }
                >
                    <EnrolledUsers />
                </Tab>
                <Tab
                    key="statistic"
                    title={
                        <div className="flex gap-2 items-center">
                            <div>Statistics</div>
                        </div>
                    }
                >
                    <StatisticSection />
                </Tab>
            </Tabs>
        </div>
    )
}

export const ForumLayout = (props: ForumLayoutProps) => {
    return (
        <ForumLayoutProvider>
            <WrappedForumLayout {...props} />
        </ForumLayoutProvider>
    )
}
