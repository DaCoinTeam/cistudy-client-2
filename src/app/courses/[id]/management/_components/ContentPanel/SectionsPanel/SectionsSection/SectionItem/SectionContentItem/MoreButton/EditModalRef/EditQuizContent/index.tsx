import React, { useContext } from "react"
import {
    EditQuizContentContext,
    EditQuizContentProvider,
} from "./EditQuizContentProvider"
import {
    Accordion,
    AccordionItem,
    Button,
    Chip,
    Image,
    Input,
    Link,
    ModalBody,
    ScrollShadow,
    Spacer,
    Tab,
    Tabs,
    Textarea,
    Tooltip,
} from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { QuestionMoreButton } from "./QuestionMoreButton"
import { AnswerMoreButton } from "./AnswerMoreButton"
import { MediaType, QuizQuestionAnswerEntity, sortByPosition } from "@common"
import {
    createQuizQuestion,
    createQuizQuestionAnswer,
    CreateQuizQuestionAnswerInput,
    CreateQuizQuestionInput,
    getAssetUrl,
} from "@services"
import useSWRMutation from "swr/mutation"
import { ToastType } from "../../../../../../../../../../../../_components"
import { SectionContentItemContext } from "../../.."
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { VideoPlayer } from "../../../../../../../../../../../../_shared"

const WrappedEditQuizContent = () => {
    const { formik } = useContext(EditQuizContentContext)!

    return (
        <>
            <div>
                <Input
                    label="Title"
                    id="title"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    labelPlacement="outside"
                    placeholder="Input title here"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.title && formik.errors.title)}
                    errorMessage={formik.touched.title && formik.errors.title}
                />
                <Spacer y={4} />
                <Textarea
                    label="Description"
                    id="description"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    labelPlacement="outside"
                    placeholder="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                        !!(formik.touched.description && formik.errors.description)
                    }
                    errorMessage={formik.touched.description && formik.errors.description}
                />
                <Spacer y={4} />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper",
                        }}
                        label="Time Limit"
                        id="timeLimit"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input description here"
                        value={formik.values.timeLimit.toString()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.timeLimit && formik.errors.timeLimit)}
                        errorMessage={formik.touched.timeLimit && formik.errors.timeLimit}
                        endContent={
                            <div className="text-sm text-foreground-400">seconds</div>
                        }
                    />
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper",
                        }}
                        label="Passing Score"
                        id="passingPercent"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input description here"
                        value={formik.values.passingPercent.toString()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            !!(formik.touched.passingPercent && formik.errors.passingPercent)
                        }
                        errorMessage={
                            formik.touched.passingPercent && formik.errors.passingPercent
                        }
                        endContent={<div className="text-sm text-foreground-400">/10</div>}
                    />
                </div>
                <Spacer y={6} />
                <div className="flex gap-2 flex-row-reverse w-full">
                    <Button
                        color="primary"
                        isDisabled={formik.isSubmitting}
                        isLoading={formik.isSubmitting}
                        onPress={() => formik.submitForm()}
                    >
            Save
                    </Button>
                    <Button color="primary" variant="bordered">
            Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}

export const EditQuizContent = () => {
    const { props } = useContext(SectionContentItemContext)!
    const { swrs } = useContext(ManagementContext)!
    const { notify } = useContext(RootContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr
    const { sectionContent } = props
    const { quiz } = sectionContent
    const { quizId, questions } = quiz

    const createQuizQuestionSwrMutation = useSWRMutation(
        "CREATE_QUIZ_QUESTION",
        async (_: string, { arg }: { arg: CreateQuizQuestionInput }) => {
            return await createQuizQuestion(arg)
        }
    )

    const createQuizQuestionAnswerSwrMutation = useSWRMutation(
        "CREATE_QUIZ_QUESTION_ANSWER",
        async (_: string, { arg }: { arg: CreateQuizQuestionAnswerInput }) => {
            return await createQuizQuestionAnswer(arg)
        }
    )

    const handleAddQuestion = async () => {
        const { message } = await createQuizQuestionSwrMutation.trigger({
            data: { quizId },
        })
        await mutate()
    notify!({
        data: {
            message,
        },
        type: ToastType.Success,
    })
    }

    const handleAddAnswer = async (quizQuestionId: string) => {
        const { message } = await createQuizQuestionAnswerSwrMutation.trigger({
            data: { quizQuestionId },
        })
        await mutate()
    notify!({
        data: {
            message,
        },
        type: ToastType.Success,
    })
    }

    return (
        <ModalBody className="p-4">
            <Tabs
                aria-label="Options"
                variant="underlined"
                color="primary"
                classNames={{
                    panel: "p-0 pt-2",
                    tabList: "p-0",
                    cursor: "w-full",
                }}
            >
                <Tab key="details" title="Details">
                    <EditQuizContentProvider>
                        <WrappedEditQuizContent />
                    </EditQuizContentProvider>
                </Tab>
                <Tab key="questions" title="Questions">
                    <div className="border border-divider rounded-medium">
                        <ScrollShadow className="h-[400px]">
                            <Accordion
                                selectionMode="multiple"
                                variant="light"
                                className="!px-0 gap-4"
                                itemClasses={{
                                    base: "!shadow-none gap-4",
                                    title: "text-base",
                                }}
                            >
                                {sortByPosition(questions ?? []).map((question) => (
                                    <AccordionItem
                                        key={question.quizQuestionId}
                                        startContent={
                                            <QuestionMoreButton
                                                className="text-primary"
                                                question={question}
                                            />
                                        }
                                        title={
                                            <div>
                                                <div>
                                                    <span className="font-semibold">
                          Q{question.position}.
                                                    </span>{" "}
                                                    <span>{question.question}</span>
                                                </div>
                                                {
                                                    question.mediaId ? 
                                                        (
                                                            
                                                            <>
                                                                <Spacer y={2}/> 
                                                                {
                                                                    question.mediaType == MediaType.Image ?
                                                                        <Image src={getAssetUrl(question.mediaId)} alt="media" className="w-[400px] aspect-video"/>
                                                                        : <VideoPlayer src={getAssetUrl(question.mediaId)} className="w-[400px] aspect-video"/>
                                                                }
                                                            </>
                                                            
                                                            
                                                        ) : null
                                                }
                                            </div>
                                        }
                                        classNames={{
                                            content: "flex flex-col gap-4 p-4",
                                            heading: "!px-4",
                                        }}
                                    >
                                        {sortByPosition(question.answers ?? [])?.map((answer) => {
                                            return (
                                                <div key={answer?.quizQuestionAnswerId}>
                                                    <div className="flex items-center w-full justify-between gap-2">
                                                        <div className="flex gap-3 items-center">
                                                            <div className="grid place-items-center">
                                                                <AnswerMoreButton
                                                                    answer={answer as QuizQuestionAnswerEntity}
                                                                />
                                                            </div>
                                                            <div
                                                                className={`text-sm ${
                                                                    answer.isCorrect
                                                                        ? "text-success"
                                                                        : "text-foreground-400"
                                                                }`}
                                                            >
                                                                <span className="font-semibold">
                                                                    {answer?.position}.
                                                                </span>{" "}
                                                                <span>{answer?.content}</span>
                                                            </div>
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
                                                </div>
                                            )
                                        })}
                                        <div className="w-full grid place-content-center py-3 px-4">
                                            <Link
                                                onPress={() => handleAddAnswer(question.quizQuestionId)}
                                                as="button"
                                                className="flex gap-2 items-center"
                                            >
                                                <PlusIcon className="w-5 h-5" />
                                                <div className="text-sm"> Add Answer </div>
                                            </Link>
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            <div className="w-full grid place-content-center py-3 px-4">
                                <Link
                                    onPress={handleAddQuestion}
                                    as="button"
                                    className="flex gap-2 items-center"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    <div className="text-sm"> Add Question </div>
                                </Link>
                            </div>
                        </ScrollShadow>
                    </div>
                </Tab>
            </Tabs>
        </ModalBody>
    )
}
