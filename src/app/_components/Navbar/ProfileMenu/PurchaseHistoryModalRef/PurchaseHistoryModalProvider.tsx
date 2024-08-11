
import { ReactNode, createContext, useCallback, useMemo } from "react"
import { ErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { findManyAccountOrders, FindManyAccountOrdersOutput } from "@services"
import { SWRConfig } from "swr"
export interface PurchaseHistoryModalContextValue {
    swrs: {
        accountOrdersSwr: SWRInfiniteResponse<FindManyAccountOrdersOutput, ErrorResponse >
    }
}

export const PurchaseHistoryModalContext = createContext<PurchaseHistoryModalContextValue | null>(null)
export const ROWS_PER_PAGE = 10
const WrappedPurchaseHistoryModalProvider = ({children}: {children: ReactNode}) => {

    const fetchAccountOrders = useCallback(
        async ([key]: [number, string]) => {
            return await findManyAccountOrders (
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
                         
                    },
                    metadata: {
                        count: true
                    }
                }
            )
    
        },
        []
    )
    const accountOrdersSwr = useSWRInfinite((key) => [
        key, "ACCOUNT_ORDERS"
    ], fetchAccountOrders, 
    {
        revalidateFirstPage: false,
    })

    const purchaseHistoryModalContextValue: PurchaseHistoryModalContextValue = useMemo(
        () => (
            {
                swrs: {
                    accountOrdersSwr,
                }
            }
        ),
        [accountOrdersSwr]
    )
    return (
        <PurchaseHistoryModalContext.Provider value={purchaseHistoryModalContextValue}>
            {children}
        </PurchaseHistoryModalContext.Provider>
    )
}
export const PurchaseHistoryModalProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedPurchaseHistoryModalProvider>{children}</WrappedPurchaseHistoryModalProvider>
    </SWRConfig>
)
