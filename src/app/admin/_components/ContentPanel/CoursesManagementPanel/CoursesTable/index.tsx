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
    Chip,
    Link,
} from "@nextui-org/react"
import {
    CoursesManagementPanelContext,
    ROWS_PER_PAGE,
} from "../CoursesManagementPanelProvider"
import { getAssetUrl } from "@services"
import { useRouter } from "next/navigation"
import { InteractiveThumbnail } from "../../../../../_shared"
import { VerifyStatus } from "@common"
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"
import { DeleteCourseSection } from "./DeleteCourseSection"

export const CoursesTable = () => {
    const router = useRouter()
    const { reducer, swrs } = useContext(CoursesManagementPanelContext)!
    const [state, dispatch] = reducer
    const { page } = state
    const { coursesSwr } = swrs
    const { data, isLoading } = coursesSwr
    const { metadata, results } = { ...data }
    const { count } = { ...metadata }

    const loadingState = () => {
        if (isLoading) return "loading"
        return "idle"
    }

    const onPageChange = (page: number) =>
        dispatch({
            type: "SET_PAGE",
            payload: page,
        })

    const pages = count ? Math.ceil(count / ROWS_PER_PAGE) : 0

    const renderStatus = (status: VerifyStatus) => {
        const statusToComponent: Record<VerifyStatus, JSX.Element> = {
            [VerifyStatus.Draft]: (
                <Chip color="default" variant="flat">
          Draft
                </Chip>
            ),
            [VerifyStatus.Pending]: (
                <Chip color="warning" variant="flat">
          Pending
                </Chip>
            ),
            [VerifyStatus.Approved]: (
                <Chip color="success" variant="flat">
          Approved
                </Chip>
            ),
            [VerifyStatus.Rejected]: (
                <Chip color="danger" variant="flat">
          Rejected
                </Chip>
            ),
        }
        return statusToComponent[status]
    }
    return (
        <div>
            <Table
                aria-label="Example table with client async pagination"
                selectionMode="single"
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
                    <TableColumn key="infomation" width={750}>
          Information
                    </TableColumn>
                    <TableColumn key="enrollments">Enrollments</TableColumn>
                    <TableColumn key="status">Price</TableColumn>
                    <TableColumn key="birth_year">Status</TableColumn>
                    <TableColumn key="createdDate">Last Updated</TableColumn>
                    <TableColumn key="actions">Actions</TableColumn>
                </TableHeader>
                <TableBody
                    items={results ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState()}
                >
                    {({ courseId, thumbnailId, title, description, verifyStatus, numberOfEnrollments, updatedAt, enableDiscount, discountPrice, price }) => (
                        <TableRow key={courseId}>
                            <TableCell>
                                <div className="flex gap-3 py-2">
                                    <InteractiveThumbnail
                                        className="w-40 min-w-40 h-fit"
                                        src={getAssetUrl(thumbnailId)}
                                        onPress={() => router.push(`/courses/${courseId}/management`)}
                                    />
                                    <div>
                                        <div className="text-base">{title}</div>
                                        <div className="text-xs text-foreground-400 line-clamp-3">
                                            {description}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{numberOfEnrollments}</TableCell>
                            <TableCell className="text-black dark:text-white">
                                {enableDiscount ? (
                                    <>
                                        <div>{discountPrice} STARCI</div>
                                        <div className="text-foreground-400 line-through">{price} STARCI</div>
                                    </>
                                ) : (
                                    <>{price} STARCI</>
                                )}</TableCell>
                            <TableCell>{renderStatus(verifyStatus)}</TableCell>
                            <TableCell>{dayjs(updatedAt).format("HH:mm:ss DD/MM/YYYY")}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Link onPress={() => router.push(`/courses/${courseId}`)} as="button" className="w-5 h-5">
                                        <EyeIcon/>
                                    </Link>
                                    <Link onPress={() => router.push(`/courses/${courseId}/management`)} as="button" className="w-5 h-5">
                                        <PencilIcon/>
                                    </Link>
                                    <DeleteCourseSection courseId={courseId}/>
                                </div>   
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
