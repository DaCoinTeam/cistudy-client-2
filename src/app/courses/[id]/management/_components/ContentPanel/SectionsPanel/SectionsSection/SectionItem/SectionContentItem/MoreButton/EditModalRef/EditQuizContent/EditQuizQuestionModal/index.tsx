import React, { createContext, useContext, useRef } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Card,
    CardBody,
    Spacer,
    Image,
    Textarea,
    Tabs,
    Tab,
    Chip,
    Tooltip,
    Link,
    Input,
} from "@nextui-org/react"
import { MediaType, QuizQuestionAnswerEntity, QuizQuestionEntity, sortByPosition } from "@common"
import { CreateQuizQuestionAnswerInput, DeleteQuizQuestionInput, createQuizQuestionAnswer, deleteQuizQuestion, getAssetUrl } from "@services"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors, VideoPlayer } from "../../../../../../../../../../../../../_shared"
import { EditQuizQuestionContext, EditQuizQuestionProvider } from "./EditQuizQuesitonModalProvider"
import { DropzonePreview } from "./DropzonePreview"
import { AnswerMoreButton } from "../AnswerMoreButton"
import useSWRMutation from "swr/mutation"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../../_components"
import { ManagementContext } from "../../../../../../../../../../_hooks"
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline"

interface EditQuizQuesitonModalProps {
    question: QuizQuestionEntity;
}

interface EditQuizQuesitonModal {
    props: EditQuizQuesitonModalProps
}

export const WrappedEditQuizQuesitonModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { formik } = useContext(EditQuizQuestionContext)!
    const { swrs: { courseManagementSwr: { mutate } } } = useContext(ManagementContext)!

    const { props: { question } } = useContext(EditQuizQuestionModalContext)!

    const { notify } = useContext(RootContext)!

    const { trigger } = useSWRMutation(
        "CREATE_QUIZ_QUESTION_ANSWER",
        async (_: string, { arg }: { arg: CreateQuizQuestionAnswerInput }) => {
            const res = await createQuizQuestionAnswer(arg)
            await mutate()
            notify!({
                data: {
                    message: res.message
                },
                type: ToastType.Success
            })
            return res
        }
    )

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const deleteQuizQuestionSwrMutation = useSWRMutation(
        "DELETE_QUIZ_QUESTION",
        async(_: string, {arg} : {arg : DeleteQuizQuestionInput}) => {
            return await deleteQuizQuestion(arg)
        }
    )

    return (
        <>
            <Card
                onPress={onOpen}
                isPressable
                className="w-full shadow-none"
                radius="none"
                key={question.quizQuestionId}
            >
                <CardBody className="p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div>
                                <span className="font-semibold">Q{question.position}.</span>{" "}
                                <span>{question.question}</span>
                            </div>
                            {question.mediaId ? (
                                <>
                                    <Spacer y={2} />
                                    {question.mediaType == MediaType.Image ? (
                                        <Image
                                            src={getAssetUrl(question.mediaId)}
                                            alt="media"
                                            className="w-[400px] aspect-video"
                                        />
                                    ) : (
                                        <VideoPlayer
                                            src={getAssetUrl(question.mediaId)}
                                            className="w-[400px] aspect-video"
                                        />
                                    )}
                                </>
                            ) : null}
                        </div>
                        <div>
                            <Chip variant="flat">{question.point} points</Chip>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">
                        Question {question.position}
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <div>
                            <Tabs aria-label="Options" variant="underlined" color="primary" classNames={{
                                panel: "!p-0 !pt-4",
                                cursor: "w-full",
                            }}>
                                <Tab key="content" title="Content">
                                    <Textarea
                                        id="question"
                                        classNames={{
                                            inputWrapper: "input-input-wrapper"
                                        }}
                                        value={formik.values.question}
                                        onValueChange={(value) => formik.setFieldValue("question", value)}
                                        label="Question"
                                        isRequired
                                        labelPlacement='outside'
                                        placeholder="Enter question"
                                        onChange={formik.handleChange("question")}
                                        onBlur={formik.handleBlur}
                                        isInvalid={!!(formik.touched.question && formik.errors.question)}
                                        errorMessage={formik.touched.question && formik.errors.question}
                                    />
                                    <Spacer y={4} />
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">Point</div>
                                        <Input
                                            id="point"
                                            className="w-[50px]"
                                            classNames={{
                                                inputWrapper: "input-input-wrapper"
                                            }}
                                            value={formik.values.point.toString()}
                                            onValueChange={(value) => formik.setFieldValue("point", value)}
                                            labelPlacement='outside'
                                            onChange={formik.handleChange("point")}
                                            onBlur={formik.handleBlur}
                                            isInvalid={!!(formik.touched.point && formik.errors.point)}
                                            errorMessage={formik.touched.point && formik.errors.point}
                                        />
                                    </div>
                                    <Spacer y={4} />
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">Position</div>
                                        <div className="justify-between flex items-center">
                                            <div className="text-sm flex gap-4 items-center">
                                                <div>{question.position}</div>
                                                <ArrowRightIcon className="w-5 h-5" />
                                                <Input
                                                    id="swapPosition"
                                                    className="w-[50px]"
                                                    isRequired
                                                    classNames={{
                                                        inputWrapper: "input-input-wrapper",
                                                    }}
                                                    labelPlacement="outside"
                                                    placeholder="Input title here"
                                                    value={formik.values.swapPosition.toString()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    isInvalid={!!(formik.touched.swapPosition && formik.errors.swapPosition)}
                                                    errorMessage={formik.touched.swapPosition && formik.errors.swapPosition}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab key="media" title="Media">
                                    <DropzonePreview />
                                </Tab>
                                <Tab key="answers" title="Answers">
                                    <div className="border border-divider rounded-medium overflow-hidden">
                                        {sortByPosition(question.answers ?? [])?.map((answer) => {
                                            return (
                                                <div key={answer?.quizQuestionAnswerId} className="p-3">
                                                    <div className="flex items-center w-full justify-between gap-2">
                                                        <div className="flex gap-3 items-center">
                                                            <div
                                                                className={`text-sm ${answer.isCorrect
                                                                    ? "text-success"
                                                                    : "text-foreground-400"
                                                                }`}
                                                            >
                                                                <span className="font-semibold">
                                                                    {answer?.position}.
                                                                </span>{" "}
                                                                <span>{answer?.content}</span>
                                                            </div>
                                                            <div className="flex gap-2 items-center min-w-[60px] flex-row-reverse">
                                                                {answer.lastAnswer ? (
                                                                    <Tooltip
                                                                        content={
                                                                            <div className="max-w-[200px]">
                                                                                {
                                                                                    "The 'Last' ensures that this answer is always placed at the end, no matter the order. This is especially useful for 'All of the above' questions, keeping the annotation consistently at the end."
                                                                                }
                                                                            </div>
                                                                        }
                                                                    >
                                                                        <Chip variant="flat" color="warning">
                                                                            Last
                                                                        </Chip>
                                                                    </Tooltip>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div className="grid place-items-center">
                                                            <AnswerMoreButton
                                                                answer={answer as QuizQuestionAnswerEntity}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className="w-full grid place-content-center py-3 px-4">
                                            <Link
                                                onPress={() => trigger({
                                                    data: {
                                                        quizQuestionId: question.quizQuestionId
                                                    }
                                                })}
                                                as="button"
                                                className="flex gap-2 items-center"
                                            >
                                                <PlusIcon className="w-5 h-5" />
                                                <div className="text-sm"> Add Answer </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-between p-4 pt-2">
                        <Button color="primary" variant="bordered" onPress={() => onConfirmDeleteModalOpen()}>
                            Delete
                        </Button>
                        <Button color="primary" isLoading={formik.isSubmitting} onPress={() => formik.submitForm()}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
                <ConfirmDeleteModalRef
                    ref={confirmDeleteModalRef}
                    onDeletePress={async () => {
                        const {message} = await deleteQuizQuestionSwrMutation.trigger({
                            data: {
                                quizQuestionId: question.quizQuestionId
                            }
                        })
                        mutate()
                        notify!({
                            data: {
                                message
                            },
                            type: ToastType.Success
                        })
                        onOpenChange()
                    }}
                    isLoading={deleteQuizQuestionSwrMutation.isMutating}
                    title="Delete Question"
                    content="Are you sure you want to delete this question? All references will be lost, and you cannot undo this action."
                />
            </Modal>
        </>
    )
}

export const EditQuizQuestionModalContext = createContext<EditQuizQuesitonModal | null>(null)

export const EditQuizQuesitonModal = (props: EditQuizQuesitonModalProps) => {

    return (
        <EditQuizQuestionModalContext.Provider value={{ props }}>
            <EditQuizQuestionProvider>
                <WrappedEditQuizQuesitonModal />
            </EditQuizQuestionProvider>
        </EditQuizQuestionModalContext.Provider>
    )
}