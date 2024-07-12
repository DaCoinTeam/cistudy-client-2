import React, { useCallback, useContext } from "react"
import { Chip, ChipProps, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { parseISODateString, ReportCourseEntity } from "@common"
import { CourseReportItemProvider, CourseReportItemContext, ROWS_PER_PAGE } from "./CourseReportItemProvider"
import { ResolveModalRef, ResolveModalRefSelectors } from "./ResolveModal"
import { ClipboardPenLine } from "lucide-react"

const WrappedCourseReportItem = () => {
    const { swrs, reducer } = useContext(CourseReportItemContext)!
    const { courseReportsSwr } = swrs
    const { data: reportData, isLoading } = courseReportsSwr
    const [state, dispatch] = reducer

    const resolveModalRef = React.useRef<ResolveModalRefSelectors | null>(null)

    const statusColorMap: Record<string, ChipProps["color"]>  = {
        approved: "success",
        rejected: "danger",
        processing: "warning",
    }

    const columns = [
        { key: "reporter", label: "Reporter" },
        { key: "title", label: "Title"},
        { key: "createdAt", label: "Created At" },
        { key: "updatedAt", label: "Updated At"},
        { key: "status", label: "Status" },
        { key: "description", label: "Description"},
        { key: "actions", label: "Actions" }
    ]

    const renderCell = useCallback((report: ReportCourseEntity, columnKey: React.Key) => {
        switch (columnKey) {
        case "reporter":
            return report.reporterAccount.username
        case "title":
            return (
                <div className="line-clamp-3">
                    {report.reportedCourse.title}
                </div>
            )
        case "createdAt":
            return parseISODateString(report.createdAt)
        case "updatedAt":
            return parseISODateString(report.updatedAt)
        case "status":
            return (
                <Chip className="capitalize" color={statusColorMap[report.processStatus]} size="sm" variant="flat">
                    {report.processStatus}
                </Chip>
            )
        case "description":
            return (
                <div className="line-clamp-3">
                    {report.description}
                </div>
            )
        case "actions":
            return (
                <div className="flex justify-center">
                    {
                        report.processStatus === "processing" && (
                            <div className="flex flex-row gap-2">
                                <Tooltip content="Resolve" color="primary">
                                    <ClipboardPenLine
                                        color="rgb(20,184,166)" 
                                        onClick={() => handleResolve(report)}
                                        className="cursor-pointer" 
                                    />
                                </Tooltip>
                            </div>
                        )
                    }
                </div>
            )
        }
    }, [])

    const handleResolve = (item: ReportCourseEntity) => {
        dispatch({ type: "SET_REPORT", payload: item })
        resolveModalRef.current?.onOpen()
    }

    const loadingState = () => {
        if (isLoading) return "loading"
        return "idle"
    }

    const onPageChange = (page: number) => dispatch({type: "SET_PAGE", payload: page})

    if (!reportData) {
        return null
    }

    const count = reportData.metadata.count

    const pages = Math.ceil(count / ROWS_PER_PAGE)

    return (
        <div>
            <Table
                aria-label="Example table with custom cells"
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
                    items={reportData.results}
                    loadingContent={<Spinner />}
                    loadingState={loadingState()}
                    emptyContent="No course reports yet."
                >
                    {(item) => (
                        <TableRow key={item.reportCourseId}>
                            {
                                (columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ResolveModalRef 
                report={state.report}
                ref={resolveModalRef}
            />
        </div>
    )
}

export const CourseReportItem = () => {
    return (
        <CourseReportItemProvider>
            <WrappedCourseReportItem />
        </CourseReportItemProvider>
    )
}