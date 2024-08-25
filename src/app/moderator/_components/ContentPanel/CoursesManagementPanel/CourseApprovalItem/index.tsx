import { CourseEntity, VerifyStatus } from "@common"
import { Chip, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { useCallback, useContext } from "react"
import { CourseApprovalItemContext, CourseApprovalItemProvider, ROWS_PER_PAGE } from "./CourseApprovalitemProvider"
import { EyeIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"

const WrappedCourseApprovalItem = () => {
    const { reducer, swrs } = useContext(CourseApprovalItemContext)!
    const [state, dispatch] = reducer
    const { publishCoursesSwr } = swrs
    const { data: pendingCourseData, isLoading } = publishCoursesSwr
    // const sortByNewestCreatedDate = () => {
    //     return pendingCourseData?.results.sort((a, b) => {
    //         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    //     })
    // }

    const renderStatus = (verifyStatus: VerifyStatus) => {
        const map: Record<VerifyStatus, JSX.Element> = {
            [VerifyStatus.Draft]: <Chip color="default" variant="flat"> Draft </Chip>,
            [VerifyStatus.Pending]: <Chip color="warning" variant="flat"> Pending </Chip>,
            [VerifyStatus.Approved]: <Chip color="success" variant="flat"> Approved </Chip>,
            [VerifyStatus.Rejected]: <Chip color="danger" variant="flat"> Rejected </Chip>,
        }
        return map[verifyStatus ?? VerifyStatus.Draft]
    }

    const columns = [
        { key: "no", label: "No" },
        { key: "title", label: "Title" },
        { key: "author", label: "Author" },
        { key: "createdAt", label: "Created At" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" }
    ]
    // const indexOfItem = (item: CourseEntity) => pendingCourseData?.results.indexOf(item) || 0

    const renderCell = useCallback((course: CourseEntity, columnKey: React.Key, page: number, index: number) => {
      
        switch (columnKey) {
        case "no":
            return (
                <div>
                    {(page - 1) * ROWS_PER_PAGE + index  + 1}
                </div>
            )
        case "title":
            return (
                <div className="w-60">
                    {course.title}
                </div>
            )
        case "author":
            return (
                <div className="w-20">
                    <div>{course.creator.username}</div>
                </div>
            )
        case "createdAt":
            return (
                <div className="w-24">
                    {dayjs(course.createdAt).format("YYYY, MMM D HH:mm:ss")}
                </div>
            )
        case "status":
            return (
                renderStatus(course.verifyStatus)
            )
        case "actions":
            return (
                <div className="flex justify-center">
                    {
                        course.verifyStatus === "pending" ?  (
                            <div className="flex flex-row gap-2">
                                <Tooltip content="Preview" color="primary">
                                    <EyeIcon
                                        className="cursor-pointer text-primary w-6 h-6"
                                        onClick={() => window.open(`/moderator/course-preview/${course.courseId}`)}
                                    />
                                </Tooltip>
                            </div>
                        ) : (
                            course.verifyStatus === VerifyStatus.Approved ? (
                                <div className="flex flex-row gap-2">
                                    <Tooltip content="View Detail" color="primary">
                                        <EyeIcon
                                            className="cursor-pointer text-primary w-6 h-6"
                                            onClick={() => window.open(`/courses/${course.courseId}`)}
                                        />
                                    </Tooltip>
                                </div>
                            ): (
                                <div className="text-foreground-400 text-sm">
                                        No action
                                </div>
                            )
                        )
                    }
                </div>
            )
        }
    }, [])

    const loadingState = () => {
        if (isLoading) return "loading"
        return "idle"
    }

    const onPageChange = (page: number) => dispatch({ type: "SET_PAGE", payload: page })

    if (!pendingCourseData) {
        return null
    }

    const count = pendingCourseData.metadata.count

    const pages = Math.ceil(count / ROWS_PER_PAGE)

    return (
        <div>
            <Table
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
                                    page={state.page}
                                    total={pages}
                                    onChange={onPageChange}
                                />
                            </div>
                        </div>
                    ) : null
                }
            >
                <TableHeader columns={columns}>
                    {(columns) => <TableColumn key={columns.key} align={columns.key === "actions" ? "center" : "start"}>{columns.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    loadingState={loadingState()}
                    loadingContent={<Spinner />}
                    emptyContent="No course publish request yet"
                >
                    {pendingCourseData?.results.length > 0 ? (
                        pendingCourseData?.results?.map((item, index) => (
                            <TableRow key={item.courseId}>
                                {
                                    (columnKey) => <TableCell>{renderCell(item, columnKey, state.page, index)}</TableCell>
                                }
                            </TableRow>
                        ))
                    ): <TableRow>
                        <TableCell colSpan={6} className="text-center">
                        No data available
                        </TableCell>
                    </TableRow>}
                    {/* items={sortByNewestCreatedDate()}
                    loadingContent={<Spinner />}
                    loadingState={loadingState()}
                    emptyContent="No pending courses yet"
                >
                    {(item) => (
                        <TableRow key={item.courseId}>
                            {
                                (columnKey) => <TableCell>{renderCell(item, columnKey, state.page)}</TableCell>
                            }
                        </TableRow>
                    )} */}
                </TableBody>
            </Table>
        </div>
    )
}


export const CourseApprovalItem = () => {
    return (
        <CourseApprovalItemProvider>
            <WrappedCourseApprovalItem />
        </CourseApprovalItemProvider>
    )
}