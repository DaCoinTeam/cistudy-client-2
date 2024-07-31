import React, { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Table,
    Pagination,
    useDisclosure,
    Spinner,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Chip,
} from "@nextui-org/react"
import {
    AttemptsModalContext,
    AttemptsModalProvider,
    ROWS_PER_PAGE,
} from "./AttemptsModalProvider"
import dayjs from "dayjs"
import numeral from "numeral"
import { AttemptDetailsModal } from "./AttemptDetailsModal"

const WrappedAttemptsModal = () => {
    const { reducer, swrs } = useContext(AttemptsModalContext)!
    const [state, dispatch] = reducer
    const { page } = state
    const { quizAttemptsSwr } = swrs
    const { data, isLoading, mutate } = quizAttemptsSwr
    const { metadata } = { ...data }
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

    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button onPress={async() => {
                onOpen()
                await mutate()
            }}>View attempts</Button>
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Attempts</ModalHeader>
                    <ModalBody className="p-4">
                        <Table
                            removeWrapper={true}
                            aria-label="Example table with client async pagination"
                            bottomContent={
                                pages > 0 ? (
                                    <div className="flex w-full justify-center">
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
                                ) : null
                            }
                        >
                            <TableHeader>
                                <TableColumn key="result">Result</TableColumn>
                                <TableColumn key="status">Status</TableColumn>
                                <TableColumn key="createdAt">Finished At</TableColumn>
                                <TableColumn key="details">Details</TableColumn>
                            </TableHeader>
                            <TableBody
                                items={data?.results ?? []}
                                loadingContent={<Spinner />}
                                loadingState={loadingState()}
                            >
                                {(attempt) => (
                                    <TableRow key={attempt.quizAttemptId}>
                                        <TableCell>
                                            {numeral(attempt.receivedPercent).format("0.00")}% ({attempt.receivedPoints}/{attempt.totalPoints})
                                        </TableCell>
                                        <TableCell>
                                            {attempt.isPassed ? (
                                                <Chip color="success" variant="flat">Passed</Chip>
                                            ) : (
                                                <Chip color="danger" variant="flat">Not Pass</Chip>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {dayjs(attempt.observedAt).format("YYYY, MMM D hh:mm:ss A")}
                                        </TableCell>
                                        <TableCell>
                                            <AttemptDetailsModal attempt={attempt}/>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export const AttemptsModal = () => (
    <AttemptsModalProvider>
        <WrappedAttemptsModal />
    </AttemptsModalProvider>
)
