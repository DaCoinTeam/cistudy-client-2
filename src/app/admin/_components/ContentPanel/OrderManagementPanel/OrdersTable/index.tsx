"use client"
import { OrderCourseEntity, OrderEntity } from "@common"
import {
    Accordion,
    AccordionItem,
    Chip,
    Pagination,
    Spacer,
    User,
} from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import dayjs from "dayjs"
import { Dot } from "lucide-react"
import { useContext, useMemo } from "react"
import {
    OrdersTableContext,
    OrdersTableProvider,
    ROWS_PER_PAGE,
} from "./OrdersTableProvider"
import { OrderDetailsModal } from "../../../../../_shared"
export interface OrdersTableSelectors {
  onOpen: () => void;
}

const WrappedOrdersTable = () => {
    const { swrs } = useContext(OrdersTableContext)!
    const { ordersSwr } = swrs
    const { data, setSize, size } = ordersSwr
    const getCount = () => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return last.metadata.count
    }

    const onLoadPage = (page: number) => {
        setSize(page)
    }
    const getOrdersByPage = useMemo(() => {
        if (!data) return []
        const orderReturn: Array<OrderEntity> = []
        const results = data[size - 1]?.results
        if (results) orderReturn.push(...results)
        return orderReturn
    }, [data])

    const renderStatus = (status: string) => {
        switch (status) {
        case "completed":
            return (
                <Chip color='success' variant='flat'>
            Completed
                </Chip>
            )
        case "pending":
            return (
                <Chip color='warning' variant='flat'>
            Pending
                </Chip>
            )
        case "canceled":
            return (
                <Chip color='danger' variant='flat'>
            Canceled
                </Chip>
            )
        default:
            return (
                <Chip color='warning' variant='flat'>
            Pending
                </Chip>
            )
        }
    }
    const totalPrice = (orderCourses: Array<OrderCourseEntity>) => {
        let price = 0
        if (orderCourses) {
            orderCourses.map(
                (orderCourses) => (price = price + orderCourses.discountedPrice)
            )
        }
        return price
    }
    const pages = Math.ceil(getCount() / ROWS_PER_PAGE)
    
    return (
        <div className=''>
            <div
                className='border rounded-xl '
                aria-label='Table with client async pagination'
            >
                <div className='flex justify-between border-b-1 p-4  '>
                    <div
                        key='no'
                        className='col-auto text-tiny font-semibold text-default-500 mr-6 '
                    >
            No
                    </div>
                    <div className='grid grid-cols-12 gap-1 w-full font-semibold text-tiny text-default-500'>
                        <div key='numberOfCourse' className='col-span-4 pr-4 '>
              Course
                        </div>
                        <div key='totalPrice' className='col-span-1 mr-4'>
              Price
                        </div>
                        <div key='buyer' className='col-span-2 '>
              Buyer
                        </div>
                        <div key='status' className='col-span-2 text-center'>
              Status
                        </div>
                        <div key='completeDate' className='col-span-2 '>
              Complete Date
                        </div>
                        <div key='action' className='col-span-1 '>
              Action
                        </div>
                    </div>
                    <Spacer x={11} />
                </div>

                <div className='p-4 '>
                    {data && getOrdersByPage.length ? (
                        <Accordion disallowEmptySelection={false} showDivider={false}>
                            {getOrdersByPage.map(
                                (
                                    order,
                                    index
                                ) => (
                                    <AccordionItem
                                        textValue='Course Order Item'
                                        hideIndicator={order.orderCourses.length <= 1}
                                        key={order.orderId}
                                        title={
                                            <div className='flex'>
                                                <div className='text-sm mr-6'>
                                                    {(size - 1) * ROWS_PER_PAGE + index + 1}
                                                </div>
                                                <div className='grid grid-cols-12 gap-1 w-full'>
                                                    <div className='text-base col-span-4 pr-4 '>
                                                        {order.orderCourses.length == 1 ? (
                                                            <div className='text-primary'>
                                                                {order.orderCourses[0].course.title}
                                                            </div>
                                                        ) : (
                                                            <> {order.orderCourses.length} courses purchased </>
                                                        )}
                                                    </div>
                                                    <div className='text-sm col-span-1 mr-4'>
                                                        {totalPrice(order.orderCourses)} STARCI
                                                    </div>
                                                    <div className='text-sm col-span-2 '>
                                                        <User
                                                            avatarProps={{
                                                                src: getAvatarUrl({
                                                                    avatarId: order.account.avatarId,
                                                                    avatarUrl: order.account.avatarUrl,
                                                                    kind: order.account.kind,
                                                                }),
                                                            }}
                                                            classNames={{
                                                                name: "text-sm",
                                                            }}
                                                            name={order.account.username ?? "Unnamed"}
                                                            description={"0 followers"}
                                                        />
                                                    </div>
                                                    <div className='text-sm col-span-2 text-center'>
                                                        {renderStatus(order.orderStatus)}
                                                    </div>
                                                    <div className='text-sm col-span-2 '>
                                                        {dayjs(order.completeDate).format("DD/MM/YYYY")}
                                                    </div>
                                                    <div className='text-sm col-span-1 '>
                                                        <div className="flex items-center">
                                                            <OrderDetailsModal order={order}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                {order.orderCourses.length == 1 ? <Spacer x={9} /> : <></>}
                                            </div>
                                        }
                                    >
                                        <div>
                                            {order.orderCourses?.length > 1 ? (
                                                order.orderCourses?.map((course) => (
                                                    <div
                                                        className='flex w-full'
                                                        key={course.orderCourseId}
                                                    >
                                                        <Spacer x={8} />
                                                        <div
                                                            key={course.orderCourseId}
                                                            className='grid grid-cols-12 w-full gap-1 mr-[2.3rem]  pb-2 mb-1'
                                                        >
                                                            <div className='col-span-5 text-base text-primary flex items-start pr-4'>
                                                                <Dot size={20} className='mr-1' />
                                                                {course?.course.title}
                                                            </div>
                                                            <div className='col-span-2 text-sm '>
                                                                {course?.discountedPrice} STARCI
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </AccordionItem>
                                )
                            )}
                        </Accordion>
                    ) : (
                        <div className='flex items-center justify-center w-full py-6'>
                            {" "}
              There is no order{" "}
                        </div>
                    )}
                </div>
                <div className='mt-4'>
                    {pages > 0 ? (
                        <div className='flex w-full justify-center'>
                            <div className='pb-4'>
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color='primary'
                                    initialPage={1}
                                    total={pages}
                                    onChange={onLoadPage}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export const OrdersTable = () => {
    return (
        <OrdersTableProvider>
            <WrappedOrdersTable />
        </OrdersTableProvider>
    )
}