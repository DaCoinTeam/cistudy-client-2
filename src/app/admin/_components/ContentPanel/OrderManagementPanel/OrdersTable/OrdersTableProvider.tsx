
import { ReactNode, createContext, useCallback, useMemo } from "react"
import { ErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { findManyOrders, FindManyOrdersOutput } from "@services"
import { SWRConfig } from "swr"
export interface OrdersTableContextValue {
    swrs: {
        ordersSwr: SWRInfiniteResponse<FindManyOrdersOutput, ErrorResponse >
    }
}

export const OrdersTableContext = createContext<OrdersTableContextValue | null>(null)
export const ROWS_PER_PAGE = 10
const WrappedOrdersTableProvider = ({children}: {children: ReactNode}) => {

    const fetchOrders = useCallback(
        async ([key]: [number, string]) => {
            return await findManyOrders (
                {
                    options: {
                        skip: ROWS_PER_PAGE * key,
                        take: ROWS_PER_PAGE,
                    }
                },
                {
                    results: {
                        orderId: true,
                        orderCourses: {
                            courseId: true,
                            discountedPrice: true,
                            price: true,
                            createdAt: true,
                            updatedAt: true,
                            orderCourseId: true,
                            course: {
                                courseId: true,
                                title: true,
                                creator: {
                                    username: true
                                }
                            }
                        },
                        createdAt: true,
                        completeDate: true,
                        orderStatus: true,
                        account: {
                            accountId: true,
                            avatarId: true,
                            avatarUrl: true,
                            kind: true,
                            username: true,
                        }
                         
                    },
                    metadata: {
                        count: true
                    }
                }
            )
    
        },
        []
    )
    const ordersSwr = useSWRInfinite((key) => [
        key, "ORDERS"
    ], fetchOrders, 
    {
        revalidateFirstPage: false,
    })

    const ordersTableContextValue: OrdersTableContextValue = useMemo(
        () => (
            {
                swrs: {
                    ordersSwr,
                }
            }
        ),
        [ordersSwr]
    )
    return (
        <OrdersTableContext.Provider value={ordersTableContextValue}>
            {children}
        </OrdersTableContext.Provider>
    )
}
export const OrdersTableProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedOrdersTableProvider>{children}</WrappedOrdersTableProvider>
    </SWRConfig>
)
