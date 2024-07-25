import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { MoreVerticalIcon, PenLineIcon, XIcon } from "lucide-react"
import { QuizAttemptEntity, QuizQuestionAnswerEntity } from "@common"
import { ManagementContext } from "../../../../../../../../../../_hooks"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../../../../../../../../_shared"
import { createContext, useContext, useMemo, useRef } from "react"
import { RootContext } from "../../../../../../../../../../../../../_hooks" 
import { ToastType } from "../../../../../../../../../../../../../_components" 
import { DeepPartial } from "@apollo/client/utilities"
import { EditQuizContentContext } from "../EditQuizContentProvider"

interface AnswerMoreButtonProps {
  className?: string;
  answer: DeepPartial<QuizQuestionAnswerEntity>;
  question: DeepPartial<QuizAttemptEntity>;
}

interface AnswerMoreButtonContextValue {
    props: AnswerMoreButtonProps
}

export const AnswerMoreButtonContext = createContext<AnswerMoreButtonContextValue | null>(null)

export const AnswerMoreButton = (props: AnswerMoreButtonProps) => {
    const {functions} = useContext(EditQuizContentContext)!
    const {removeAnswer} = functions
    const { className, answer, question } = props
    const { quizQuestionAnswerId } = answer

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const onDeletePress = async () => {
        // const {message} = await deleteSection({
        //     data: {
        //         sectionId,
        //     },
        // })
        // await mutate()
        // notify!({
        //     data: {
        //         message
        //     },
        //     type: ToastType.Success
        // })
        removeAnswer(quizQuestionAnswerId?? "")
    }

    const onEditPress = () => {
        
    }

    const AnswerMoreButtonContextValue : AnswerMoreButtonContextValue = useMemo(() => ({
        props
    }), [props])

    return (
        <AnswerMoreButtonContext.Provider value={AnswerMoreButtonContextValue}>
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
                title="Delete answer"
                content="Are you sure you want to delete this answer? All references will be lost, and you cannot undo this action."
                onDeletePress={onDeletePress}
            />
        </AnswerMoreButtonContext.Provider>
    )
}