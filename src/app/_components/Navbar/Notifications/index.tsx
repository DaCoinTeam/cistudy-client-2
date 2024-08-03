import { NotificationEntity, parseTimeAgo } from "@common"
import { CISTUDY_LOGO, STARCI_LOGO } from "@config"
import { BellAlertIcon } from "@heroicons/react/24/outline"
import {
    Avatar,
    Badge,
    Button,
    CircularProgress,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollShadow,
    Skeleton,
    Spacer
} from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl, markNotificationAsRead } from "@services"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroller"
import {
    COLUMNS_PER_PAGE,
    RootContext,
    SocketIOContext,
} from "../../../_hooks"

const NOTIFICATION_TYPES = {
    SYSTEM: "system",
    TRANSACTION: "transaction",
    INTERACT: "interact",
    COURSE: "course",
    CERTIFICATE: "certificate"
}

export const Notifications = () => {
    const socket = useContext(SocketIOContext)!

    useEffect(() => {
        if (!socket) return
        socket.on("notifications", (id: string) => {
            console.log(id)
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
    const getNotViewed = useMemo(() => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return last?.metadata?.notViewedCount
    }, [data])
    const getPages = useMemo(() => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return Math.ceil(last?.metadata?.count / COLUMNS_PER_PAGE)
    }, [data])
    const router = useRouter()

    const onPressNotification = async (notification: NotificationEntity) => {
        if (notification.referenceLink) {
            router.push(notification.referenceLink)
        }
        if (!notification.viewed) {
            await markNotificationAsRead({
                data: {
                    notificationIds: [notification.notificationId]
                }
            })
            await mutate()
        }
       
    }

    const renderNotification = (notification: NotificationEntity) => {
        switch (notification.type) {
        case NOTIFICATION_TYPES.SYSTEM:
            return (
               
                <Avatar
                    alt="logo imgage"
                    size="md"
                    src={CISTUDY_LOGO}
                />
                 
            )
        case NOTIFICATION_TYPES.TRANSACTION:
            return (
                <Avatar
                    alt="logo imgage"
                    size="md"
                    src={STARCI_LOGO}
                />
                
            )
        case NOTIFICATION_TYPES.INTERACT:
            return (
                <Avatar
                    name="avatar"
                    size="md"
                    src={getAvatarUrl({
                        avatarId: notification?.sender?.avatarId,
                        avatarUrl: notification?.sender?.avatarUrl,
                        kind: notification?.sender?.kind,
                    })}
                />
                   
            )
        case NOTIFICATION_TYPES.COURSE:
            return (
               
                <Avatar
                    alt="logo imgage"
                    size="md"
                    src={getAssetUrl(notification?.course?.thumbnailId)}
                />
                  
            )
        case NOTIFICATION_TYPES.CERTIFICATE:
            return (
                <Avatar
                    alt="logo imgage"
                    size="md"
                    src={getAssetUrl(notification?.course?.thumbnailId)}
                />
            )
        default:
            return (
                <Avatar
                    alt="logo imgage"
                    size="md"
                    src={CISTUDY_LOGO}
                />
                    
            )
        }
    }
   
    


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
                            content={getNotViewed}
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
                        <ScrollShadow className="h-[400px] w-[360px]">
                            <InfiniteScroll 
                                className="flex flex-col"
                                pageStart={0}
                                initialLoad={false}
                                loadMore={onLoadMore}
                                hasMore={size < getPages && !isValidating}
                                useWindow={false}
                                loader={<div className="w-full flex items-center justify-center pt-2"><CircularProgress key={0} aria-label="Loading..." /></div>}
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
                                        (notification) => (
                                            <div key={notification.notificationId} className="border-b-1">
                                                <Link
                                                    color="foreground"
                                                    className={"cursor-pointer flex p-4 pr-1"}
                                                    onPress={() => onPressNotification(notification)}
                                                >
                                                    <div className="grid grid-cols-6  gap-2">
                                                        {renderNotification(notification)}
                                                        <div className={`col-span-5 flex ${!notification.viewed ? "" : "opacity-65"}`}>
                                                            <div>
                                                                <div className="font-medium text-sm">{notification.title}</div>
                                                                <div className="text-sm">{notification.description}</div>
                                                                <div className="text-xs text-primary mt-1">{parseTimeAgo(notification?.updatedAt)}</div>
                                                            </div>
                                                            <Spacer x={4}/>
                                                            <div className="w-6 text-end">
                                                                {!notification.viewed ? <div className="text-primary tex-end text-4xl">&#x2022;</div> : (<></>)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </Link>
                                            </div>
                                        )
                                    )
                                )}
                            </InfiniteScroll>
                        </ScrollShadow>
                        {/* <Spacer y={6}/> */}
                        {/* <Button color="primary" fullWidth> Mark all viewed </Button> */}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
