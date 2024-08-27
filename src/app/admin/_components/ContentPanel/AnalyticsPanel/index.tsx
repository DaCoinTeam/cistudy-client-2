import React, { useContext } from "react"
import {
    AnalyticsPanelProvider,
    AnalyticsPanelContext,
} from "./AnalyticsPanelProvider"
import { Card, CardBody, Divider, Link, Spacer } from "@nextui-org/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip as ChartTooltip, LineChart } from "recharts"

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
        enrolledInfos
    } = { ...data }

    const sevenDaysEnrollmentsChartData: Array<{ name: string; value: number, starci: number }> =
    []
    const pass = new Date()
    pass.setDate(new Date().getDate() - 7)
    const nextPass = new Date()

    for (let index = 0; index < 7; index++) {
        nextPass.setDate(pass.getDate() + 1)
        const enrollments = (enrolledInfos ?? []).filter(
            ({ createdAt }) =>
                new Date(createdAt).getTime() > pass.getTime() &&
        new Date(createdAt).getTime() <= nextPass.getTime()
        )
        pass.setDate(pass.getDate() + 1)
        sevenDaysEnrollmentsChartData.push({
            name: dayjs(pass).format("YYYY MMM, DD"),
            value: enrollments.length,
            starci: enrollments.reduce((sum, enrollment) => sum + enrollment.priceAtEnrolled, 0)
        })
    }

    const router = useRouter()

    return (
        <div className={`${className}`}>
            <div className="text-2xl">Analytics</div>
            <Spacer y={6} />
            <div className="grid grid-cols-4 gap-4">
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4 pb-0">Accounts</div>
                        <div className="text-4xl p-4">{numberOfAccounts}</div>
                        <Divider />
                        <Link
                            onPress={() => router.push("/admin?tab=accounts")}
                            as="button"
                        >
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5" />
                            </div>
                        </Link>
                    </CardBody>
                </Card>
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4 pb-0">Courses</div>
                        <div className="text-4xl p-4">{numberOfCourses}</div>
                        <Divider />
                        <Link as="button" onPress={() => router.push("/admin?tab=courses")}>
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5" />
                            </div>
                        </Link>
                    </CardBody>
                </Card>
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4 pb-0">Orders</div>
                        <div className="text-4xl p-4">{numberOfOrders}</div>
                        <Divider />
                        <Link as="button" onPress={() => router.push("/admin?tab=orders")}>
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5" />
                            </div>
                        </Link>
                    </CardBody>
                </Card>
                <Card shadow="none" className="border border-divider">
                    <CardBody className="p-0">
                        <div className="text-primary font-semibold p-4 pb-0">Transactions</div>
                        <div className="text-4xl p-4">{numberOfTransactions}</div>
                        <Divider />
                        <Link
                            as="button"
                            onPress={() => router.push("/admin?tab=transactions")}
                        >
                            <div className="flex items-center gap-2 text-sm p-4">
                                <div>More info</div>
                                <ArrowRightIcon className="w-5 h-5" />
                            </div>
                        </Link>
                    </CardBody>
                </Card>
            </div>
            <Spacer y={6} />
            <div className=" flex gap-4">
                <div className="border border-divider rounded-medium flex-1">
                    <div className="font-semibold text-primary p-4 pb-0">Enrollments</div>
                    <div className="flex gap-1 items-end p-4">
                        <span className="text-4xl">{enrolledInfos?.length}</span>
                    </div>
                    <Divider/>
                    <div className="h-[300px] p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={sevenDaysEnrollmentsChartData}
                                margin={{ top: 10, right: 0, left: -40, bottom: 0 }}
                            >
                                <XAxis dataKey="name" name="Time" />
                                <YAxis dataKey="value" name="Enrollments" allowDecimals={false} />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    name="Enrollments"
                                    stroke="hsl(212.01999999999998 100% 46.67% / 1)"
                                />
                                <ChartTooltip formatter={(value) => [`${value} Enrollments`]} />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>     
                </div>

                <div className="border border-divider rounded-medium flex-1">
                    <div className="font-semibold text-primary p-4 pb-0">Revenue</div>
                    <div className="flex gap-1 items-end p-4">
                        <span className="text-4xl">{data?.enrolledInfos.reduce((sum, enrollment) => sum + enrollment.priceAtEnrolled, 0)}</span> STARCI
                    </div>
                    <Divider/>
                    <div className="h-[300px] p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={sevenDaysEnrollmentsChartData}
                                margin={{ top: 10, right: 20, left: -40, bottom: 0 }}
                            >
                                <XAxis dataKey="name" name="Time" />
                                <YAxis dataKey="starci" name="Earned" />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line
                                    type="monotone"
                                    dataKey="starci"
                                    name="Earned"
                                    stroke="#12A150"
                                />
                                <ChartTooltip formatter={(value) => [`${value} STARCI`]}/>
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
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