import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreVerticalIcon, PenLineIcon, XIcon } from "lucide-react"
import { QuizQuestionEntity } from "@common"
import { ManagementContext } from "../../../../../../../../../../_hooks"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../../../../../../../../_shared"
import { createContext, useContext, useMemo, useRef } from "react"
import { RootContext } from "../../../../../../../../../../../../../_hooks" 
import { ToastType } from "../../../../../../../../../../../../../_components" 
import { DeepPartial } from "@apollo/client/utilities"
import { EditQuizContentContext } from "../EditQuizContentProvider"
import { EditQuizQuestionModalRef, EditQuizQuestionModalRefSelectors } from "./EditQuizQuestionModal"
import { deleteQuizQuestion, DeleteQuizQuestionInput } from "@services"
import useSWRMutation from "swr/mutation"

interface QuestionMoreButtonProps {
  className?: string;
  question: DeepPartial<QuizQuestionEntity>;
}

interface QuestionMoreButtonContextValue {
    props: QuestionMoreButtonProps
}

export const QuestionMoreButtonContext = createContext<QuestionMoreButtonContextValue | null>(null)

export const QuestionMoreButton = (props: QuestionMoreButtonProps) => {
    const { className, question } = props
    const { quizQuestionId } = question

    const editQuizQuestionModalRef = useRef<EditQuizQuestionModalRefSelectors>(null)
    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()
    const {notify} = useContext(RootContext)!
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const deleteQuizQuestionSwrMutation = useSWRMutation(
        "DELETE_QUIZ_QUESTION",
        async (_: string, { arg } : {arg : DeleteQuizQuestionInput}) => {
            return await deleteQuizQuestion(arg)
        }
    )

    const onDeletePress = async () => {
        const {message} = await deleteQuizQuestionSwrMutation.trigger({data: {quizQuestionId: question.quizQuestionId?? ""}})
        notify!({
            data: {
                message
            },
            type: ToastType.Success
        })
        mutate()
    }

    const onEditPress = () => {
        editQuizQuestionModalRef.current?.onOpen()
    }

    const questionMoreButtonContextValue : QuestionMoreButtonContextValue = useMemo(() => ({
        props
    }), [props])

    return (
        <QuestionMoreButtonContext.Provider value={questionMoreButtonContextValue}>
            <Dropdown
                placement="top-start"
                backdrop="blur"
                classNames={{
                    content: "text-center",
                }}
            >
                <DropdownTrigger>
                    <Button
                        className={`${className}`}
                        isIconOnly
                        variant="light"
                    >
                        <MoreVerticalIcon size={20} strokeWidth={3/2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<PenLineIcon size={20} strokeWidth={3/2} />}
                        key="edit"
                        onPress={onEditPress}
                    >
            Edit
                    </DropdownItem>
                    <DropdownItem
                        color="danger"
                        startContent={<XIcon size={20} strokeWidth={3/2} />}
                        onPress={onConfirmDeleteModalOpen}
                        key="delete"
                        className="text-danger"
                    >
            Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title="Delete question"
                content="Are you sure you want to delete this question? All references will be lost, and you cannot undo this action."
                onDeletePress={onDeletePress}
            />
            <EditQuizQuestionModalRef
                ref={editQuizQuestionModalRef}
                question={question as QuizQuestionEntity}
            />
        </QuestionMoreButtonContext.Provider>
    )
}