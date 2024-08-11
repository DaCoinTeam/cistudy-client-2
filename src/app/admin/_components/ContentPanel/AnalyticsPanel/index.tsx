import React, { useContext } from "react"
import {
    AnalyticsPanelProvider,
    AnalyticsPanelContext,
} from "./AnalyticsPanelProvider"
import { Card, CardBody, Divider, Link, Spacer } from "@nextui-org/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

interface AnalyticsManagementPanelProps {
  className?: string;
}

const WrappedAnalyticsPanel = (props: AnalyticsManagementPanelProps) => {
    const { className } = props
    const { swrs } = useContext(AnalyticsPanelContext)!
    const { analyticsSwr } = swrs
    const { data } = analyticsSwr
    const {
        numberOfAccounts,
        numberOfCourses,
        numberOfOrders,
        numberOfTransactions,
    } = { ...data }

    const router = useRouter()

    return (
        <div className={`${className}`}>
            <div className="text-2xl">Analytics</div>
            <Spacer y={6} />
            <div className="grid grid-cols-4 gap-4">
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4">
                            Accounts
                        </div>
                        <Divider />
                        <div className="text-4xl p-4">{numberOfAccounts}</div>
                        <Divider />
                        <Link onPress={() => router.push("/admin?tab=accounts")} as="button">
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5"/>
                            </div>
                        </Link>  
                    </CardBody>
                </Card>
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4">
                            Courses
                        </div>
                        <Divider />
                        <div className="text-4xl p-4">{numberOfCourses}</div>
                        <Divider />
                        <Link as="button" onPress={() => router.push("/admin?tab=courses")}>
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5"/>
                            </div>
                        </Link>  
                    </CardBody>
                </Card>
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4">
                            Orders
                        </div>
                        <Divider />
                        <div className="text-4xl p-4">{numberOfOrders}</div>
                        <Divider />
                        <Link as="button" onPress={() => router.push("/admin?tab=orders")}>
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5"/>
                            </div>
                        </Link>  
                    </CardBody>
                </Card>
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4">
                            Transactions
                        </div>
                        <Divider />
                        <div className="text-4xl p-4">{numberOfTransactions}</div>
                        <Divider />
                        <Link as="button" onPress={() => router.push("/admin?tab=transactions")}>
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5"/>
                            </div>
                        </Link>  
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export const AnalyticsPanel = (props: AnalyticsManagementPanelProps) => {
    return (
        <AnalyticsPanelProvider>
            <WrappedAnalyticsPanel {...props} />
        </AnalyticsPanelProvider>
    )
}
