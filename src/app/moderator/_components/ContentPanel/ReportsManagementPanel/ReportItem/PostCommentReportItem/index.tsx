import { ReportPostCommentEntity } from "@common"
import { Chip, ChipProps, Link, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import dayjs from "dayjs"
import { PencilRulerIcon } from "lucide-react"
import React, { useCallback, useContext } from "react"
import { TextRenderer } from "../../../../../../_shared"
import { PostCommentReportItemContext, PostCommentReportItemProvider, ROWS_PER_PAGE } from "./PostCommentReportItemProvider"
import { ResolveModalRef, ResolveModalRefSelectors } from "./ResolveModal"

const WrappedPostCommentReportItem = () => {
    const { swrs, reducer } = useContext(PostCommentReportItemContext)!
    const { postCommentReportsSwr } = swrs
    const { data: reportData, isLoading } = postCommentReportsSwr
    const [state, dispatch] = reducer

    const resolveModalRef = React.useRef<ResolveModalRefSelectors | null>(null)
    const indexOfItem = (item: ReportPostCommentEntity) => reportData?.results.indexOf(item) || 0

    const statusColorMap: Record<string, ChipProps["color"]>  = {
        approved: "success",
        rejected: "danger",
        processing: "warning",
    }

    const columns = [
        {key: "no", label: "No"},
        { key: "reporter", label: "Reporter" },
        { key: "comment", label: "Comment"},
        {key: "author", label: "Comment Author"},
        { key: "status", label: "Status" },
        { key: "submittedDate", label: "Submitted Date" },
        { key: "reportReason", label: "Report Reason"},
        { key: "actions", label: "Actions" },    
    ]

    const renderCell = useCallback((report: ReportPostCommentEntity, columnKey: React.Key) => {
        const {processStatus, title, reporterAccount, reportedPostComment, createdAt, } = {...report}

        switch (columnKey) {
        case "no": 
            return  <div>
                {(state.page - 1) * ROWS_PER_PAGE + indexOfItem(report)  + 1}
            </div>
        case "reporter":
            return <div className="flex items-center justify-center">
                <div className="font-normal">{reporterAccount.username}</div>
            </div>
        case "comment":
            return (
                <div className="line-clamp-2">
                    <TextRenderer html={reportedPostComment.html} />
                </div>
            )
        case "author":
            return <div className="flex items-center justify-center line-clamp-1">
                <div className="font-normal">{reportedPostComment.creator.username}</div>
            </div>
        case "status":
            return (
                <Chip className="capitalize" color={statusColorMap[processStatus]} size="sm" variant="flat">
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
                <div className="flex justify-center w-20">
                    {
                        report.processStatus === "processing" ? (
                            <Link className="cursor-pointer flex flex-row gap-2" onClick={() => handleResolve(report)}>
                                <Tooltip content="Resolve" color="primary">
                                    <PencilRulerIcon className="w-5 h-5" strokeWidth={3/2}/> 
                                </Tooltip>
                            </Link>
                        )
                            : (
                                <div className="text-foreground-400 text-sm">
                                 No action
                                </div>
                            )
                    }
                </div>
            )
        }
    }, [])

    const handleResolve = (item: ReportPostCommentEntity) => {
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
                    {(columns) => <TableColumn key={columns.key} align={columns.key === "actions" ? "center" : "start"}>{columns.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={reportData.results}
                    loadingContent={<Spinner />}
                    loadingState={loadingState()}
                    emptyContent="No post comment reports yet."
                >
                    {(item) => (
                        <TableRow key={item.reportPostCommentId}>
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

export const PostCommentReportItem = () => {
    return (
        <PostCommentReportItemProvider>
            <WrappedPostCommentReportItem />
        </PostCommentReportItemProvider>
    )
}