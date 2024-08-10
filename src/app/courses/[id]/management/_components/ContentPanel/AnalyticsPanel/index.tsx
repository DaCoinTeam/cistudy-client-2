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
    Tooltip as ChartTooltip
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

    const sevenDaysEnrollmentsChartData: Array<{name: string, value: number}> = []
    const pass = new Date()
    pass.setDate(new Date().getDate() - 7)
    const nextPass = new Date()

    for (let index = 0; index < 7; index++) {
        nextPass.setDate(pass.getDate() + 1)
        const enrollments = (data?.enrolledInfos ?? []).filter(({ createdAt }) => new Date(createdAt).getTime() > pass.getTime() && new Date(createdAt).getTime() <= nextPass.getTime())
        pass.setDate(pass.getDate() + 1)
        sevenDaysEnrollmentsChartData.push({
            name: dayjs(pass).format("YYYY MMM, DD"),
            value: enrollments.length
        })
    }


    return (
        <div className={`${className}`}>
            <div className="text-2xl font-semibold"> Analytics </div>
            <Spacer y={6} />
            <div>
                <div className="text-primary font-semibold">Enrollments</div>
                <Spacer y={2} />
                <div className="flex gap-1 items-end">
                    <span className="text-4xl">{data?.numberOfEnrollments}</span>
                </div>
                <Spacer y={4} />
                <div className="border border-divider rounded-medium p-4 h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sevenDaysEnrollmentsChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <XAxis dataKey="name" name="Time" />
                            <YAxis dataKey="value" name="Enrollments" />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Line
                                type="monotone"
                                dataKey="value"
                                name="Enrollments"
                                stroke="hsl(212.01999999999998 100% 46.67% / 1)"
                            />
                            <ChartTooltip />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <Spacer y={4} />
                <EnrollmentsModal enrollments={data?.enrolledInfos ?? []} />
            </div>
        </div>
    )
}
