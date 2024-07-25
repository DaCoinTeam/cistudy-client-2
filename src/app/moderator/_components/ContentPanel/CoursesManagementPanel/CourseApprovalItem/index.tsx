import { CourseEntity, parseISODateString } from "@common"
import { Chip, ChipProps, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { Eye } from "lucide-react"
import { useCallback, useContext } from "react"
import { CourseApprovalItemContext, CourseApprovalItemProvider, ROWS_PER_PAGE } from "./CourseApprovalitemProvider"

const WrappedCourseApprovalItem = () => {
    const { reducer, swrs } = useContext(CourseApprovalItemContext)!
    const [state, dispatch] = reducer
    const { pendingCoursesSwr } = swrs
    const { data: unverifiedCourseData, isLoading } = pendingCoursesSwr

    const statusColorMap: Record<string, ChipProps["color"]> = {
        approved: "success",
        rejected: "danger",
        pending: "warning",
    }

    const columns = [
        { key: "title", label: "Title" },
        { key: "description", label: "Description"},
        { key: "author", label: "Author" },
        { key: "createdAt", label: "Created At" },
        { key: "updatedAt", label: "Updated At"},
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
                    {parseISODateString(course.createdAt)}
                </div>
            )
        case "updatedAt":
            return (
                <div className="w-24">
                    {parseISODateString(course.updatedAt)}
                </div>
            )
        case "status":
            return (
                <Chip className="capitalize" color={statusColorMap[course.verifyStatus]} size="sm" variant="flat">
                    {course.verifyStatus}
                </Chip>
            )
        case "actions":
            return (
                <div className="flex justify-center">
                    {
                        course.verifyStatus === "pending" && (
                            <div className="flex flex-row gap-2">
                                <Tooltip content="Preview" color="primary">
                                    <Eye
                                        className="cursor-pointer"
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

    if (!unverifiedCourseData) {
        return null
    }

    const count = unverifiedCourseData.metadata.count

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
                    items={unverifiedCourseData.results}
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