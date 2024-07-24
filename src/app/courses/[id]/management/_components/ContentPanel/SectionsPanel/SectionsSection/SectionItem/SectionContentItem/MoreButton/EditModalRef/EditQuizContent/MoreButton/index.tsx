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

interface MoreButtonProps {
  className?: string;
  question: DeepPartial<QuizQuestionEntity>;
}

interface MoreButtonContextValue {
    props: MoreButtonProps
}

export const MoreButtonContext = createContext<MoreButtonContextValue | null>(null)

export const MoreButton = (props: MoreButtonProps) => {
    const {functions} = useContext(EditQuizContentContext)!
    const {removeQuestion} = functions
    const { className, question } = props
    const { quizQuestionId } = question

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
        removeQuestion(quizQuestionId?? "")
    }

    const moreButtonContextValue : MoreButtonContextValue = useMemo(() => ({
        props
    }), [props])

    return (
        <MoreButtonContext.Provider value={moreButtonContextValue}>
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
                title="Delete Section"
                content="Are you sure you want to delete this section? All references will be lost, and you cannot undo this action."
                onDeletePress={onDeletePress}
            />
        </MoreButtonContext.Provider>
    )
}