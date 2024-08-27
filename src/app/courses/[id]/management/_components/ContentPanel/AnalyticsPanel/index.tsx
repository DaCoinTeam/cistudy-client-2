"use client"
import { Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../_hooks"
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    LineChart,
    Legend,
    Tooltip as ChartTooltip,
} from "recharts"
import dayjs from "dayjs"
import { EnrollmentsModal } from "./EnrollmentsModal"

interface GeneralPanelProps {
  className?: string;
}

export const AnalyticsPanel = (props: GeneralPanelProps) => {
    const { className } = props
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data } = courseManagementSwr

    const sevenDaysEnrollmentsChartData: Array<{ name: string; value: number, starci: number }> =
    []
    const pass = new Date()
    pass.setDate(new Date().getDate() - 7)
    const nextPass = new Date()

    for (let index = 0; index < 7; index++) {
        nextPass.setDate(pass.getDate() + 1)
        const enrollments = (data?.enrolledInfos ?? []).filter(
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

    return (
        <div className={`${className}`}>
            <div className="text-2xl font-semibold"> Statistics </div>
            <Spacer y={6} />
            <div>
                <div className=" flex gap-4">
                    <div className="border border-divider rounded-medium p-4 flex-1">
                        <div className="font-semibold">Enrollments</div>
                        <Spacer y={2} />
                        <div className="flex gap-1 items-end">
                            <span className="text-4xl">{data?.numberOfEnrollments}</span>
                        </div>
                        <Spacer y={4}/>
                        <div className="h-[300px]">
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

                    <div className="border border-divider rounded-medium p-4 flex-1">
                        <div className="font-semibold">Earned</div>
                        <Spacer y={2} />
                        <div className="flex gap-1 items-end">
                            <span className="text-4xl">{data?.enrolledInfos.reduce((sum, enrollment) => sum + enrollment.priceAtEnrolled, 0)}</span> STARCI
                        </div>
                        <Spacer y={4}/>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={sevenDaysEnrollmentsChartData}
                                    margin={{ top: 10, right: 0, left: -40, bottom: 0 }}
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
                <Spacer y={4} />
                <EnrollmentsModal enrollments={data?.enrolledInfos ?? []} />
            </div>
        </div>
    )
}
