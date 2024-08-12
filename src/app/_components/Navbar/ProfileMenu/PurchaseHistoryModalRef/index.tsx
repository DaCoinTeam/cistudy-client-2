"use client"
import { OrderCourseEntity, OrderEntity } from "@common"
import {
    Accordion,
    AccordionItem,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    ScrollShadow,
    Spacer,

    useDisclosure,
} from "@nextui-org/react"
import dayjs from "dayjs"
import { forwardRef, useContext, useImperativeHandle, useMemo } from "react"
import {
    PurchaseHistoryModalContext,
    PurchaseHistoryModalProvider,
    ROWS_PER_PAGE,
} from "./PurchaseHistoryModalProvider"
import { Dot } from "lucide-react"
export interface PurchaseHistoryModalRefSelectors {
  onOpen: () => void;
}
interface PurchaseHistoryModalRefProps {}

const WrappedPurchaseHistoryModalRef = () => {
    const { swrs } = useContext(PurchaseHistoryModalContext)!
    const { accountOrdersSwr } = swrs
    const { data,  setSize, size } = accountOrdersSwr
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
            return <Chip color="success" variant="flat" size="sm">
                Completed
            </Chip>
        case "pending": 
            return <Chip color="warning" variant="flat" size="sm">
                Pending
            </Chip>
        case "canceled":
            return <Chip color="danger" variant="flat" size="sm">
                Canceled
            </Chip>
        default: 
            return <Chip color="warning" variant="flat" size="sm">
                Pending
            </Chip>
        }
    }
    const totalPrice = (orderCourses : Array<OrderCourseEntity>) => {
        let price = 0
        if(orderCourses) {
            orderCourses.map((orderCourses) => price = price + orderCourses.discountedPrice)
        }
        return price
    }
    const pages = Math.ceil(getCount() / ROWS_PER_PAGE)

    return (
        <>
            <ModalHeader className='p-4 pb-0'>Orders</ModalHeader>
            <ModalBody className='p-4'>
                <div className="border rounded-xl p-4"
                    aria-label='Table with client async pagination'
                >
                    <div className="flex justify-between px-2 pb-2 border-b-1">
                        <div className="grid grid-cols-12 w-full">
                            <div key='no' className='text-sm '>
No
                            </div>

                            <div key='numberOfCourse' className='text-sm col-span-5 pr-4'>
                                Course
                            </div>
                            <div key='totalPrice' className='text-sm  col-span-2 '>
Price
                            </div>
                            <div key='status' className='text-sm  col-span-2 '>
Status
                            </div>
                            <div key='completeDate' className='text-sm col-span-2 '>
Date
                            </div>
                        </div>
                        <Spacer x={9}/>
                    </div>
 
                    <div>
                        {data && getOrdersByPage.length ? (
                            <Accordion showDivider={false}>
                                {getOrdersByPage.map(
                                    (
                                        { orderId, orderStatus, completeDate, orderCourses },
                                        index
                                    ) => (
                                        <AccordionItem
                                            textValue="Course Order Item"
                                            hideIndicator={orderCourses.length <= 1}
                                            key={orderId}
                                            aria-expanded={false}
                                            title={
                                                <div className="flex">
                                                    <div className="grid grid-cols-12 w-full">
                                                        <div className='text-sm '>
                                                            {(size - 1) * ROWS_PER_PAGE + index + 1}
                                                        </div>
                                                        <div className='text-sm col-span-5 pr-4'>
                                                            {orderCourses.length == 1 ? (
                                                                <div className="text-primary">{orderCourses[0].course.title}</div>
                                                            ): (<> {orderCourses.length} courses purchased </>)}
                                                        </div>
                                                        <div className='text-sm col-span-2 '>
                                                            {totalPrice(orderCourses)} STARCI
                                                        </div>
                                                        <div className='text-sm col-span-2 '>
                                                            {renderStatus(orderStatus)}
                                                        </div>
                                                        <div className='text-sm col-span-2 '>
                                                            {dayjs(completeDate).format("DD/MM/YYYY")}
                                                        </div>
                                                    </div>
                                                    {orderCourses.length == 1 ? <Spacer x={9}/> : <></>}
                             
                                                </div>

                                            }>
                                            <div >
                                                { orderCourses?.length > 1 ? orderCourses?.map((course) => (
                                                    <div key={course.orderCourseId} className="grid grid-cols-12 mr-[2.3rem] pb-2 mb-1">
                                                        <div  />
                                                        <div className="col-span-5 text-sm text-primary flex items-start pr-4"><Dot size={20} className="mr-1"/>{course?.course.title}</div>
                                                        <div className="col-span-2 text-sm ">{course?.discountedPrice} STARCI</div>
                                                    </div>
                                                )) : <></>}
                                            </div>
                    
                                        </AccordionItem>
                                    ))}
                    
                            </Accordion>
                        ): (<div className="flex items-center justify-center w-full py-6">You do not have any order</div>)}
                    </div>
                </div>
             
               
            </ModalBody>
            <ModalFooter>
                {
                    pages > 0 ? (
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
                    ) : null
                }
            </ModalFooter>
        </>
    )
}

export const PurchaseHistoryModalRef = forwardRef<
  PurchaseHistoryModalRefSelectors | null,
  PurchaseHistoryModalRefProps
>((props, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal
            isDismissable={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size='3xl'
            scrollBehavior="inside"
        >
            <ScrollShadow  className="h-[340px] w-[780px] py-0 my-0 "  >
                <ModalContent  style={{margin: 0}} >
                    <PurchaseHistoryModalProvider>
                        <WrappedPurchaseHistoryModalRef />
                    </PurchaseHistoryModalProvider>

                </ModalContent>
            </ScrollShadow>

        </Modal>
    )
})
