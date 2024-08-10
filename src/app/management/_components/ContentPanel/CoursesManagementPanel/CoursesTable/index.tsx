"use client"
import {
    Chip,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { InteractiveThumbnail } from "../../../../../_shared"
import { CoursesManagementPanelContext, ROWS_PER_PAGE } from "../CoursesManagementPanelProvider"
import dayjs from "dayjs"
import { VerifyStatus } from "@common"

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
        <Table
            aria-label="Example table with client async pagination"
            selectionMode="none"
            
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
            <TableHeader >
                <TableColumn key="no" className="text-sm text-center">
          No
                </TableColumn>
                <TableColumn key="course" width={750} className="text-sm">
          Course
                </TableColumn>
                <TableColumn key="enrollment" className="text-sm ">
          Learner
                </TableColumn>
                <TableColumn key="price" className="text-sm px-6">
          Price
                </TableColumn>
                <TableColumn key="price" className="text-sm px-6">
            Status
                </TableColumn>
                <TableColumn key="created_date" className="text-sm">
          Created Date
                </TableColumn>
            </TableHeader>
            <TableBody
                emptyContent={"You haven't created any course."}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {results.map(({ courseId, thumbnailId, title, description, createdAt, price, discountPrice, enableDiscount, enrolledInfos, verifyStatus  }, index) => (
                    <TableRow key={courseId}>
                        <TableCell >{(page - 1)*ROWS_PER_PAGE + index +1}</TableCell>
                        <TableCell>
                            <div className="flex gap-3 py-2">
                                <InteractiveThumbnail
                                    isPressable
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
                        <TableCell className="text-black dark:text-white"><div >
                            <div></div>
                            {enrolledInfos?.length ?? 0 }
                        </div></TableCell>
                        <TableCell className="text-black dark:text-white">
                            {enableDiscount ? (
                                <>
                                    <div>{discountPrice} STARCI</div>
                                    <div className="text-foreground-400 line-through">{price} STARCI</div>
                                </>
                            ) : (
                                <>{price} STARCI</>
                            )}</TableCell>
                        <TableCell className="text-black dark:text-white">{renderStatus(verifyStatus)}</TableCell>
                        <TableCell className="text-black dark:text-white">{dayjs(createdAt).format("HH:mm:ss DD/MM/YYYY")}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
