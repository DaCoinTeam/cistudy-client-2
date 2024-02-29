"use client"
import React, { useContext } from "react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react"
import { ManageCoursesPanelContext } from "../ManageCoursesPanelProviders"
import { isErrorResponse } from "@common"

export const CoursesTable = () => {

    const { state, swr, dispatch } = useContext(ManageCoursesPanelContext)!
    const { page } = state
    const { data, isLoading } = swr

    console.log(data)

    if (!data || isErrorResponse(data)) return null 

    const loadingState = 
    () => {
        if (isLoading) return "loading"
        if (isErrorResponse(data)) return "loading"
        return "idle"
    }
    
    const pages = 5

    const onPageChange = (page: number) => dispatch({
        type: "SET_PAGE",
        payload: page
    })

    return (
        <Table
            aria-label="Example table with client async pagination"
            removeWrapper
            bottomContent={
                pages > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={onPageChange}
                        />
                    </div>
                ) : null
            }
        >
            <TableHeader>
                <TableColumn key="title">Name</TableColumn>
                <TableColumn key="height">Height</TableColumn>
                <TableColumn key="mass">Mass</TableColumn>
                <TableColumn key="birth_year">Birth year</TableColumn>
            </TableHeader>
            <TableBody
                items={data}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {(item) => (
                    <TableRow key={item.courseId}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}