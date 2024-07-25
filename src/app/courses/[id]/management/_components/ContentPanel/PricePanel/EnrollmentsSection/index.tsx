"use client"
import React, { useContext } from "react"
import { LineChart } from "../../../../../../../_shared"
import { Spacer, Tab, Tabs } from "@nextui-org/react"
import { EnrollmentsSectionContext, EnrollmentsSectionProvider } from "./EnrollmentsSectionProvider"
import { IntervalSelected } from "./useEnrollmentsSectionReducer"
import { Key } from "@common"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import { ManagementContext } from "../../../../_hooks"

const WrappedEnrollmentsSection = () => {
    const { reducer } = useContext(EnrollmentsSectionContext)!
    const [ state, dispatch ] = reducer
    const { intervalSelected } = state

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement } = courseManagementSwr
    const { numberOfEnrollments } = { ...courseManagement }

    const onSelectionChange = (intervalSelected: Key) =>  dispatch({
        type: "SET_INTERVAL_SELECTED",
        payload: intervalSelected as IntervalSelected
    })

    return (
        <div className="h-[35rem] flex flex-col">
            <div className="text-2xl"> Enrollments </div>
            <Spacer y={4}/>
            <div className="flex justify-between items-center">
                <Tabs variant="underlined" color="secondary" selectedKey={intervalSelected} onSelectionChange={onSelectionChange}>
                    <Tab key="oneDay" title="1 Day"/>
                    <Tab key="oneWeek" title="1 Week"/>
                    <Tab key="oneMonth" title="1 Month"/>
                    <Tab key="oneYear" title="1 Year"/>
                </Tabs>
                <div className="flex items-center gap-1">
                    <div className="text-2xl font-semibold"> {numberOfEnrollments} </div>
                    <div className="flex items-center text-primary ">
                        <ArrowUpRightIcon height={12} width={12}/>
                        <div className="font-semibold text-xs"> 123 </div> 
                    </div>
                </div>
            </div>
            <Spacer y={4}/>
            <div className="flex-1">
                <LineChart />
            </div>
        </div>
    )
}

export const EnrollmentsSection = () => {
    return (
        <EnrollmentsSectionProvider>
            <WrappedEnrollmentsSection/>
        </EnrollmentsSectionProvider>
    )
}