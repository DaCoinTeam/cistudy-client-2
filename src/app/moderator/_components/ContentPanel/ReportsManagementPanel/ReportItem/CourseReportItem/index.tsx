import { ReportCourseEntity } from "@common"
import { Avatar, Chip, ChipProps, Link, Pagination, Spacer, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import dayjs from "dayjs"
import React, { useCallback, useContext } from "react"
import { CourseReportItemContext, CourseReportItemProvider, ROWS_PER_PAGE } from "./CourseReportItemProvider"
import { ResolveModalRef, ResolveModalRefSelectors } from "./ResolveModal"
import { EyeIcon } from "@heroicons/react/24/outline"
import { PencilRulerIcon } from "lucide-react"

const WrappedCourseReportItem = () => {
    const { swrs, reducer } = useContext(CourseReportItemContext)!
    const { courseReportsSwr, } = swrs
    const { data: reportData, isLoading, } = courseReportsSwr
    const [state, dispatch] = reducer
    const { page } = state

    const resolveModalRef = React.useRef<ResolveModalRefSelectors | null>(null)

    const statusColorMap: Record<string, ChipProps["color"]>  = {
        approved: "success",
        rejected: "danger",
        processing: "warning",
    }
    const indexOfItem = (item: ReportCourseEntity) => reportData?.results.indexOf(item) || 0

    const columns = [
        { key: "no", label: "No" },
        { key: "reporter", label: "Reporter" },
        { key: "course", label: "Course"},
        { key: "status", label: "Status" },
        { key: "reportTitle", label: "Report Title"},
        { key: "submittedDate", label: "Submitted date" },
        { key: "actions", label: "Actions" }
    ]

    const renderCell = useCallback((report: ReportCourseEntity, columnKey: React.Key) => {
        switch (columnKey) {
        case "no": 
            return <div>
                {(page - 1)* ROWS_PER_PAGE + indexOfItem(report)  + 1}
            </div>
        case "reporter":
            return <div className="flex items-center justify-center">
                <Avatar
                    name='avatar'
                    className='w-8 h-8'
                    src={getAvatarUrl({
                        avatarId: report.reporterAccount.avatarId,
                        avatarUrl: report.reporterAccount.avatarUrl,
                        kind: report.reporterAccount.kind,
                    })}
                />
                <Spacer x={2} />
                <div className="font-normal">{report.reporterAccount.username}</div>
            </div>
        case "course":
            return (
                <div className="font-normal line-clamp-2">
                    {report.reportedCourse.title}
                </div>
            )
        case "status":
            return (
                <Chip className="capitalize" color={statusColorMap[report.processStatus]} size="sm" variant="flat">
                    {report.processStatus}
                </Chip>
            )
        case "reportTitle":
            return (
                <div className="line-clamp-2">
                    {report.title}
                </div>
            )
        case "submittedDate":
            return dayjs(report.createdAt).format("hh:mm:ss A DD/MM/YYYY")
        case "actions":
            return (
                <div className="flex justify-center">
                    {
                        report.processStatus === "processing" ? (
                            <Link className="cursor-pointer flex flex-row gap-2" onPress={() => handleResolve(report)}>
                                <Tooltip content="Resolve" color="primary">
                                    <PencilRulerIcon className="w-5 h-5" strokeWidth={3/2}/> 
                                </Tooltip>
                            </Link>
                        ) : (
                            <Link onPress={() => handleResolve(report)}>
                                <Tooltip content="View" color="primary">
                                    <EyeIcon className="w-5 h-5" strokeWidth={3/2}/>
                                </Tooltip>
                            </Link>
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
                    {(columns) => <TableColumn className="" key={columns.key} align={columns.key === "actions" ? "center" : "start"}>{columns.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={reportData.results}
                    loadingContent={<Spinner />}
                    loadingState={loadingState()}
                    emptyContent="No course reports yet."
                >
                    {( item,) => (
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