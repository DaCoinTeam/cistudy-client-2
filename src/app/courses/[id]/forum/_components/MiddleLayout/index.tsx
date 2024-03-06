import { Spacer } from "@nextui-org/react"
import { CreatePostCard } from "./CreatePostCard"
import { InfinitePostsScroller } from "./InfinitePostsScroller"
import { MiddleLayoutProviders } from "./MiddleLayoutProviders"

interface MiddleLayoutProps {
    className?: string
}

export const WrappedMiddleLayout = (props: MiddleLayoutProps) => {
    return (
        <div className={`${props.className}`}>
            <CreatePostCard/>
            <Spacer y={6}/>
            <InfinitePostsScroller/>
        </div>
    )
}


export const MiddleLayout = (props: MiddleLayoutProps) => {
    return (
        <MiddleLayoutProviders>
            <WrappedMiddleLayout {...props}/>
        </MiddleLayoutProviders>
    )
}
