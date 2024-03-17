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
    Spacer,
} from "@nextui-org/react"
import { CoursesManagementPanelContext, ROWS_PER_PAGE } from "../CoursesManagementPanelProviders"
import { getAssetUrl } from "@services"
import { useRouter } from "next/navigation"
import { InteractiveThumbnail } from "../../../../../_shared"
import { ClockIcon } from "@heroicons/react/24/outline"

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
            selectionMode="multiple"
            shadow="none"
            classNames={{
                wrapper: "border border-divider rounded-medium p-0",
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
                <TableColumn key="video" width={750}>
          Video
                </TableColumn>
                <TableColumn key="title">
          Enrollments
                </TableColumn>
                <TableColumn key="mass">
          Mass
                </TableColumn>
                <TableColumn key="birth_year">
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
                            <div className="flex gap-3 py-2">
                                <InteractiveThumbnail
                                    className="w-40 min-w-40 h-fit"
                                    src={getAssetUrl(thumbnailId)}
                                    onPress={() => router.push(`/courses/${courseId}/management`)}
                                />
                                <div>
                                    <div className="line-clamp-1 text-base">{title}</div>
                                    <div className="flex gap-1 items-center text-foreground-500">
                                        <ClockIcon height={12} width={12} />
                                        <div className="text-xs">15m</div>
                                    </div>
                                    <Spacer y={1}/>
                                    <div className="text-sm text-foreground-500 line-clamp-2">
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
