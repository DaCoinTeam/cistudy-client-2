import { NotificationEntity } from "@common"
import { BellAlertIcon } from "@heroicons/react/24/outline"
import {
    Avatar,
    Badge,
    Button,
    CircularProgress,
    Image,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollShadow,
    Skeleton,
    Spacer,
} from "@nextui-org/react"
import { useContext, useEffect, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroller"
import {
    COLUMNS_PER_PAGE,
    RootContext,
    SocketIOContext,
} from "../../../_hooks"
import { getAvatarUrl } from "@services"
import { STARCI_COIN } from "@config"
import { useRouter } from "next/navigation"

export const Notifications = () => {
    const socket = useContext(SocketIOContext)!

    useEffect(() => {
        if (!socket) return
        socket.on("notifications", () => {
            mutate()
        })
        return () => {
            socket.removeListener("notifications")
        }
    }, [socket])

    const { swrs } = useContext(RootContext)!
    const { notifySwr } = { ...swrs }
    const { data, size, setSize, isLoading, isValidating, mutate } = {
        ...notifySwr,
    }
    const onLoadMore = () => {
        setSize(size + 1)
    }
    const getNotification = useMemo(() => {
        if (!data) return []
        const notification: Array<NotificationEntity> = []
        data.forEach((element) => {
            if (element) {
                const { results } = element
                if (results) {
                    notification.push(...results)
                }
            }
        })
        return notification
    }, [data])
    const getPages = useMemo(() => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return Math.ceil(last?.metadata?.count / COLUMNS_PER_PAGE)
    }, [data])
    const router = useRouter()
    return (
        <Popover showArrow offset={10} placement="bottom" backdrop="opaque" classNames={{
            content: "p-0"
        }}>
            <PopoverTrigger>
                <Button isIconOnly variant="light" className="p-6">
                    {getNotification.length === 0 ? (
                        <div>
                            <BellAlertIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                        </div>
                    ) : (
                        <Badge
                            color="danger"
                            content={getNotification.length}
                            shape="circle"
                        >
                            <BellAlertIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {getNotification.length === 0 ? (
                    <div className="p-4">No notification</div>
                ) : (
                    <div className="p-4">
                        <ScrollShadow className="h-[400px] w-[420px]">
                            <InfiniteScroll 
                                className="flex flex-col"
                                pageStart={0}
                                initialLoad={false}
                                loadMore={onLoadMore}
                                hasMore={size < getPages && !isValidating}
                                useWindow={false}
                                loader={<CircularProgress key={0} aria-label="Loading..." />}
                            >
                                {isLoading ? (
                                    <div>
                                        <Skeleton className="h-7 w-20">
                                            <div className="h-7 w-20"></div>
                                        </Skeleton>
                                        <Skeleton className="h-7 w-20">
                                            <div className="h-7 w-20"></div>
                                        </Skeleton>
                                        <Skeleton className="h-7 w-20">
                                            <div className="h-7 w-20"></div>
                                        </Skeleton>
                                    </div>
                                ) : (
                                    getNotification.map(
                                        ({
                                            title,
                                            description,
                                            notificationId,
                                            sender,
                                            referenceLink,
                                            viewed,
                                            createdAt
                                        }) => (
                                            <div key={notificationId} className="border-b-1">
                                                <Link
                                                    color="foreground"
                                                    className={`cursor-pointer flex p-4 ${!viewed ? "bg-content2" : ""}`}
                                                    onPress={() => router.push(referenceLink)}
                                                >
                                                    <div>
                                                        {sender ? (
                                                            <Avatar
                                                                name="avatar"
                                                                className="w-10 h-10"
                                                                src={getAvatarUrl({
                                                                    avatarId: sender.avatarId,
                                                                    avatarUrl: sender.avatarUrl,
                                                                    kind: sender.kind,
                                                                })}
                                                            />
                                                        ) : (
                                                            <Image
                                                                alt="reward"
                                                                className="rounded-none w-10 h-10"
                                                                src={STARCI_COIN}
                                                            />
                                                        )}
                                                    </div>
                                                    <Spacer x={2} />
                                                    <div>
                                                        <div className="font-semibold text-sm">{title}</div>
                                                        <div className="text-sm">{description}</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    )
                                )}
                            </InfiniteScroll>
                        </ScrollShadow>
                        <Spacer y={6}/>
                        <Button color="primary" fullWidth> Mark all viewed </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
