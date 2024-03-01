"use client"
import React, { useContext } from "react"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
} from "@nextui-org/react"
import { ManageCoursesPanelContext } from "../ManageCoursesPanelProviders"
import { isErrorResponse } from "@common"
import { VideoThumbnail } from "../../../../../../../_shared"
import { getAssetUrl } from "@services"
import { useRouter } from "next/navigation"

export const CoursesTable = () => {
    const router = useRouter()
    const { state, swr, dispatch } = useContext(ManageCoursesPanelContext)!
    const { page } = state
    const { courses } = swr
    const { data, isLoading } = courses

    console.log(data)

    if (!data || isErrorResponse(data)) return null

    const loadingState = () => {
        if (isLoading) return "loading"
        if (isErrorResponse(data)) return "loading"
        return "idle"
    }

    const pages = 5

    const onPageChange = (page: number) =>
        dispatch({
            type: "SET_PAGE",
            payload: page,
        })

    return (
        <Table
            aria-label="Example table with client async pagination"
            removeWrapper
            selectionMode="multiple"
            classNames={{
                td: [
                    "group-data-[first=true]:first:before:rounded-none",
                    "group-data-[first=true]:last:before:rounded-none",
                    "group-data-[middle=true]:before:rounded-none",
                    "group-data-[last=true]:first:before:rounded-none",
                    "group-data-[last=true]:last:before:rounded-none",
                ],
                th: [
                    "bg-transparent",
                    "text-default-500",
                    "border-b",
                    "border-divider",
                    "py-4"
                ],
            }}
            bottomContent={
                pages > 0 ? (
                    <div className="flex w-full justify-center">
                        <div className="pb-4">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                classNames={{
                                    cursor: "text-secondary-foreground",
                                }}
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={onPageChange}
                            />
                        </div>
                    </div>
                ) : null
            }
        >
            <TableHeader>
                <TableColumn key="video" width={"55%"}>
          Video
                </TableColumn>
                <TableColumn width={"15%"} key="title">Enrollments</TableColumn>
                <TableColumn width={"15%"} key="mass">Mass</TableColumn>
                <TableColumn width={"15%"} key="birth_year">Birth year</TableColumn>
            </TableHeader>
            <TableBody
                items={data}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {({ courseId, thumbnailId, title, description }) => (
                    <TableRow key={courseId}>
                        <TableCell>
                            <div className="grid grid-cols-4 gap-3 py-2">
                                <VideoThumbnail
                                    className="col-span-1"
                                    src={getAssetUrl(thumbnailId)}
                                    onPress={() => router.push(`/courses/${courseId}/manage`)}
                                />
                                <div className="col-span-3 text-base grid content-center">
                                    <div>{title}</div>
                                    <div className="text-sm text-foreground-500 line-clamp-3">
                                        {description}
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>123</TableCell>
                        <TableCell>12323</TableCell>
                        <TableCell>123</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
