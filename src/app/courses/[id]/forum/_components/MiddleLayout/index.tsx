import { Spacer } from "@nextui-org/react"
import { CreatePostCard } from "./CreatePostCard"
import { InfinitePostsScroller } from "./InfinitePostsScroller"

interface MiddleLayoutProps {
    className?: string
}

export const MiddleLayout = (props: MiddleLayoutProps) => {
    return (
        <div className={`${props.className}`}>
            <CreatePostCard/>
            <Spacer y={6}/>
            <InfinitePostsScroller/>
        </div>
    )
}
