import React, { useContext } from "react"
import {
    EditQuizContentContext,
    EditQuizContentProvider,
} from "./EditQuizContentProvider"
import {
    Button,
    Input,
    Link,
    ModalBody,
    ScrollShadow,
    Spacer,
    Tab,
    Tabs,
    Textarea,
} from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { sortByPosition } from "@common"
import {
    createQuizQuestion,
    CreateQuizQuestionInput
} from "@services"
import useSWRMutation from "swr/mutation"
import { ToastType } from "../../../../../../../../../../../../_components"
import { SectionContentItemContext } from "../../../index"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { EditQuizQuesitonModal } from "./EditQuizQuestionModal"

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
                            <div className="text-sm text-foreground-400">minutes</div>
                        }
                    />
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper",
                        }}
                        label="Passing Percent"
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
                        endContent={<div className="text-sm text-foreground-400">/100%</div>}
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
    
    const totalPoints = questions?.reduce((acc, question) => acc + question.point, 0)

    const createQuizQuestionSwrMutation = useSWRMutation(
        "CREATE_QUIZ_QUESTION",
        async (_: string, { arg }: { arg: CreateQuizQuestionInput }) => {
            return await createQuizQuestion(arg)
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
                    <div className="text-xl font-semibold">
                        Total Points: {totalPoints}
                    </div>
                    {
                        totalPoints !== 100 && (
                            <>
                                <Spacer y={2} />
                                <div>
                                    <div className="bg-danger/20 rounded-medium p-3">
                                The total points for this quiz do not equal 100. Please update the points for each question; otherwise, the quiz will be hidden from learners.
                                    </div>
                                </div>
                            </>
                        )
                    }
                    <Spacer y={4} />
                    <div className="border border-divider rounded-medium overflow-hidden">
                        <ScrollShadow className="h-[400px]">
                            <div
                                className="!px-0 gap-4"
                            >
                                {sortByPosition(questions ?? []).map((question) => (
                                    <EditQuizQuesitonModal key={question.quizQuestionId} question={question}/>
                                ))}
                            </div>
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

