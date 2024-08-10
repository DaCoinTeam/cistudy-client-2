import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"
import { MoreVerticalIcon, PenLineIcon, XIcon } from "lucide-react"
import { QuizQuestionAnswerEntity } from "@common"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../../../../../../../../_shared"
import { createContext, useContext, useMemo, useRef } from "react"
import { DeleteQuizQuestionAnswerInput, deleteQuizQuestionAnswer } from "@services"
import useSWRMutation from "swr/mutation"
import { ManagementContext } from "../../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../../_components"
import { EditQuizQuestionAnswerModalRef, EditQuizQuestionAnswerModalRefSelectors } from "./EditQuizQuestionAnwserModal"

interface AnswerMoreButtonProps {
  answer: QuizQuestionAnswerEntity;
}

interface AnswerMoreButtonContextValue {
    props: AnswerMoreButtonProps
}

export const AnswerMoreButtonContext = createContext<AnswerMoreButtonContextValue | null>(null)

export const AnswerMoreButton = (props: AnswerMoreButtonProps) => {
    const { answer } = props
    const { quizQuestionAnswerId } = answer
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { notify } = useContext(RootContext)!

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )

    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const deleteSwrMutation = useSWRMutation("DELETE_QUIZ_QUESTION_ANWSER", async (_: string, { arg }: { arg: DeleteQuizQuestionAnswerInput}) => await deleteQuizQuestionAnswer(arg)) 

    const onDeletePress = async () => {
        if (!quizQuestionAnswerId) return
        try {
            const { message } = await deleteSwrMutation.trigger({ 
                data: {
                    quizQuestionAnswerId
                }
            })
            await courseManagementSwr.mutate()
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
        } catch (ex: unknown) {
            const { message } = ex as { message : string }
            notify!({
                data: {
                    error: message
                },
                type: ToastType.Error
            })
        }
        
    }

    const editQuizQuestionAnwserModalRef = useRef<EditQuizQuestionAnswerModalRefSelectors | null>(null)
    const onEditQuizQuestionAnwserModalOpen = () => editQuizQuestionAnwserModalRef.current?.onOpen()

    const answerMoreButtonContextValue : AnswerMoreButtonContextValue = useMemo(() => ({
        props
    }), [props])

    return (
        <AnswerMoreButtonContext.Provider value={answerMoreButtonContextValue}>
            <Dropdown
                placement="top-start"
                backdrop="blur"
                classNames={{
                    content: "text-center",
                }}
            >
                <DropdownTrigger>
                    <Link
                        color="foreground"
                    >
                        <MoreVerticalIcon size={20} strokeWidth={3/2} />
                    </Link>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<PenLineIcon size={20} strokeWidth={3/2} />}
                        key="edit"
                        onPress={onEditQuizQuestionAnwserModalOpen}
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
                title="Delete answer"
                content="Are you sure you want to delete this answer? All references will be lost, and you cannot undo this action."
                onDeletePress={onDeletePress}
                isLoading={deleteSwrMutation.isMutating}
            />
            <EditQuizQuestionAnswerModalRef ref={editQuizQuestionAnwserModalRef}/>
        </AnswerMoreButtonContext.Provider>
    )   
}