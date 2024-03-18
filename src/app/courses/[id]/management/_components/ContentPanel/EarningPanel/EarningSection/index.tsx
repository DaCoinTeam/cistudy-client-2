"use client"
import React, { useContext } from "react"
import { LineChart } from "../../../../../../../_shared"
import { Spacer, Tab, Tabs } from "@nextui-org/react"
import { EarningSectionProvider, EarningSectionContext } from "./EarningSectionProvider"
import { IntervalSelected } from "./useEarningSectionReducer"
import { Key } from "@common"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import { ManagementContext } from "../../../../_hooks"
import { ManagePriceModal } from "./ManagePriceModal"

const WrappedEarningSection = () => {
    const { reducer } = useContext(EarningSectionContext)!
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
        <div className="h-[30rem] flex flex-col">
            <div className="text-2xl"> Earning </div>
            <Spacer y={4}/>
            <div className="flex justify-between items-center">
                <Tabs variant="underlined" color="primary" selectedKey={intervalSelected} onSelectionChange={onSelectionChange}>
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
            <Spacer y={4}/>
            <div className="flex items-center gap-2">
                <ManagePriceModal/>
            </div>
           
        </div>
    )
}

export const EarningSection = () => {
    return (
        <EarningSectionProvider>
            <WrappedEarningSection/>
        </EarningSectionProvider>
    )
}