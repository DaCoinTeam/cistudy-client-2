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
import { CoursesManagementPanelContext, ROWS_PER_PAGE } from "../CoursesManagementPanelProviders"
import { getAssetUrl } from "@services"
import { useRouter } from "next/navigation"
import { InteractiveThumbnail } from "../../../../../_shared"

export const CoursesTable = () => {
    const router = useRouter()
    const { reducer, swrs } = useContext(CoursesManagementPanelContext)!
    const [state, dispatch] = reducer
    const { page } = state
    const { selfCreatedCoursesSwr } = swrs
    const { data: selfCreatedCourses, isLoading } = selfCreatedCoursesSwr

    if (!selfCreatedCourses) return null

    const loadingState = () => {
        if (isLoading) return "loading"
        return "idle"
    }

    const onPageChange = (page: number) =>
        dispatch({
            type: "SET_PAGE",
            payload: page,
        })

    const { results, metadata } = selfCreatedCourses
    const { count } = metadata

    const pages = Math.ceil(count / ROWS_PER_PAGE )
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
                    "py-4",
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
                <TableColumn width={"15%"} key="title">
          Enrollments
                </TableColumn>
                <TableColumn width={"15%"} key="mass">
          Mass
                </TableColumn>
                <TableColumn width={"15%"} key="birth_year">
          Birth year
                </TableColumn>
            </TableHeader>
            <TableBody
                items={results}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {({ courseId, thumbnailId, title, description }) => (
                    <TableRow key={courseId}>
                        <TableCell>
                            <div className="grid grid-cols-4 gap-3 py-2">
                                <InteractiveThumbnail
                                    className="col-span-1"
                                    src={getAssetUrl(thumbnailId)}
                                    onPress={() => router.push(`/courses/${courseId}/manage`)}
                                />
                                <div className="col-span-3 text-base grid content-center">
                                    <div className="font-semibold">{title}</div>
                                    <div className="text-xs text-foreground-500 line-clamp-3">
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