import { Spacer } from "@nextui-org/react"
import { CreatePostCard } from "./CreatePostCard"
import { InfinitePostsScroller } from "./InfinitePostsScroller"
import { ForumLayoutProvider } from "./ForumLayoutProvider"

interface ForumLayoutProps {
    className?: string
}

export const WrappedForumLayout = (props: ForumLayoutProps) => {
    return (
        <div className={`${props.className}`}>
            <CreatePostCard/>
            <Spacer y={6}/>
            <InfinitePostsScroller/>
        </div>
    )
}


export const ForumLayout = (props: ForumLayoutProps) => {
    return (
        <ForumLayoutProvider>
            <WrappedForumLayout {...props}/>
        </ForumLayoutProvider>
    )
}
