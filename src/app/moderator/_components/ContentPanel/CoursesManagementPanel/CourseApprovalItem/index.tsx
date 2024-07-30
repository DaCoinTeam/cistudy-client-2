import { CourseEntity, VerifyStatus } from "@common"
import { Chip, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { useCallback, useContext } from "react"
import { CourseApprovalItemContext, CourseApprovalItemProvider, ROWS_PER_PAGE } from "./CourseApprovalitemProvider"
import { EyeIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"

const WrappedCourseApprovalItem = () => {
    const { reducer, swrs } = useContext(CourseApprovalItemContext)!
    const [state, dispatch] = reducer
    const { pendingCoursesSwr } = swrs
    const { data: pendingCourseData, isLoading } = pendingCoursesSwr

    const sortByNewestCreatedDate = () => {
        return pendingCourseData?.results.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
    }

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
        { key: "title", label: "Title" },
        { key: "description", label: "Description"},
        { key: "author", label: "Author" },
        { key: "createdAt", label: "Created At" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" }
    ]

    const renderCell = useCallback((course: CourseEntity, columnKey: React.Key) => {
        switch (columnKey) {
        case "title":
            return (
                <div className="w-60">
                    {course.title}
                </div>
            )
        case "description": 
            return (
                <div className="line-clamp-3">
                    {course.description}
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
                    {dayjs(course.createdAt).format("YYYY, MMM D hh:mm:ss")}
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
                        course.verifyStatus === "pending" && (
                            <div className="flex flex-row gap-2">
                                <Tooltip content="Preview" color="primary">
                                    <EyeIcon
                                        className="cursor-pointer text-primary w-6 h-6"
                                        onClick={() => window.open(`/moderator/course-preview/${course.courseId}`)}
                                    />
                                </Tooltip>
                            </div>
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
                    items={sortByNewestCreatedDate()}
                    loadingContent={<Spinner />}
                    loadingState={loadingState()}
                    emptyContent="No pending courses yet"
                >
                    {(item) => (
                        <TableRow key={item.courseId}>
                            {
                                (columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>
                            }
                        </TableRow>
                    )}
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