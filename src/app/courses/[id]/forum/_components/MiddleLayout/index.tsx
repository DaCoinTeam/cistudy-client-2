import { InfinitePostsScroller } from "./InfinitePostsScroller"

interface MiddleLayoutProps {
    className?: string
}

export const MiddleLayout = (props: MiddleLayoutProps) => {
    return (
        <div className={`${props.className}`}>
            <InfinitePostsScroller/>
        </div>
    )
}
