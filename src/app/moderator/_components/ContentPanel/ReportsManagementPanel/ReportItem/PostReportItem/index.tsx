import { ReportPostEntity } from "@common"
import { Avatar, Chip, ChipProps, Link, Pagination, Spacer, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import dayjs from "dayjs"
import React, { useCallback, useContext } from "react"
import { PostReportItemContext, PostReportItemProvider, ROWS_PER_PAGE } from "./PostReportItemProvider"
import { ResolveModalRef, ResolveModalRefSelectors } from "./ResolveModal"

const WrappedPostReportItem = () => {
    const { swrs, reducer } = useContext(PostReportItemContext)!
    const { postReportsSwr } = swrs
    const { data: reportData, isLoading } = postReportsSwr
    const [state, dispatch] = reducer
    const { page } = state

    const resolveModalRef = React.useRef<ResolveModalRefSelectors | null>(null)
    const indexOfItem = (item: ReportPostEntity) => reportData?.results.indexOf(item) || 0

    const statusColorMap: Record<string, ChipProps["color"]>  = {
        approved: "success",
        rejected: "danger",
        processing: "warning",
    }

    const columns = [
        {key: "no", label: "No"},
        { key: "reporter", label: "Reporter" },
        {key: "post", label: "Post"},
        {key: "author", label: "Post Author"},
        {key: "course", label: "Course"},
        { key: "reportReason", label: "Report Reason"},
        { key: "submittedDate", label: "Submitted Date" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" }
    ]

    const renderCell = useCallback((report: ReportPostEntity, columnKey: React.Key) => {
        const {title, reportedPost, reporterAccount, processStatus, createdAt,} = {...report}
        switch (columnKey) {
        case "no":
            return  <div>
                {(page - 1) * ROWS_PER_PAGE + indexOfItem(report)  + 1}
            </div>
        case "reporter":
            return <div className="flex items-center justify-center">
                <Avatar
                    name='avatar'
                    className='w-8 h-8'
                    src={getAvatarUrl({
                        avatarId: reporterAccount.avatarId,
                        avatarUrl: reporterAccount.avatarUrl,
                        kind: reporterAccount.kind,
                    })}
                />
                <Spacer x={2} />
                <div className="font-normal">{report.reporterAccount.username}</div>
            </div>
        case "post": 
            return <div className="line-clamp-1">
                { report.reportedPost.title}
            </div>
        case "author":
            return  <div className="flex items-center justify-center line-clamp-1">
                <div className="font-normal">{reportedPost.creator.username}</div>
            </div>
        case "course":
            return (
                <div className="line-clamp-1">
                    {reportedPost.course.title}
                </div>
            )
        case "status":
            return (
                <Chip className="capitalize" color={statusColorMap[report.processStatus]} size="sm" variant="flat">
                    {processStatus}
                </Chip>
            )
        case "reportReason":
            return (
                <div className="line-clamp-3">
                    {title}
                </div>
            )
        case "submittedDate":
            return dayjs(createdAt).format("hh:mm:ss A DD/MM/YYYY")
        case "actions":
            return (
                <div className="flex justify-center">
                    {
                        report.processStatus === "processing" ? (
                            <Link className="flex flex-row gap-2" onClick={() => handleResolve(report)}>
                                    Resolve 
                            </Link>
                        ) : (
                            <Link onPress={() => handleResolve(report)}>
                                    View
                            </Link>
                        )
                    }
                </div>
            )
        }
    }, [])

    const handleResolve = (item: ReportPostEntity) => {
        dispatch({ type: "SET_REPORT", payload: item })
        resolveModalRef.current?.onOpen()
    }

    const loadingState = () => {
        if (isLoading) return "loading"
        return "idle"
    }

    const onPageChange = (page: number) => dispatch({type: "SET_PAGE",payload: page})

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
                    {(columns) => <TableColumn key={columns.key} className="uppercase text-sm text-slate-700 dark:text-slate-300" align={columns.key === "actions" ? "center" : "start"}>{columns.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={reportData.results}
                    loadingContent={<Spinner />}
                    loadingState={loadingState()}
                    emptyContent="No post reports yet."
                >
                    {(item) => (
                        <TableRow key={item.reportPostId}>
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

export const PostReportItem = () => {
    return (
        <PostReportItemProvider>
            <WrappedPostReportItem />
        </PostReportItemProvider>
    )
}