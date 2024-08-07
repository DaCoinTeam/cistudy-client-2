import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react"
import {
    forwardRef,
    useContext,
    useImperativeHandle
} from "react"
import {
    ReportPostModalContext, ReportPostModalProvider,
} from "./ReportPostModalProvider"
import { REPORT_TITLES } from "@common"

interface WrappedReportPostModalRefProps {
    onClose: () => void
}


export const WrappedReportPostModalRef = (refProps : WrappedReportPostModalRefProps) => {
    const { formik } = useContext(ReportPostModalContext)!
    const onPress = () => formik.handleSubmit()
    const {onClose} = refProps
    const handleChangeTitle = (value: string) => {
        formik.setFieldValue("title", value)
    }
    return (
        <>
            <ModalHeader className="p-4 flex flex-col" >
                <div className="text-xl pb-2">You’re about to submit a report</div>
                <div className="text-base font-normal">
            We only remove content that goes against our Community Standards. You can review or edit your report details again.
                </div>
            </ModalHeader>
            <ModalBody className="p-4 gap-4">
                <Autocomplete
                    label="Title"
                    labelPlacement="outside"
                    variant="bordered"
                    id="title"
                    size="md"
                    allowsCustomValue
                    defaultItems={REPORT_TITLES}
                    placeholder="What problem with this post ?"
                    value={formik.values.title}
                    onSelectionChange={(selection) => {if(selection) handleChangeTitle(selection.toString())}}
                    onInputChange={(value) => handleChangeTitle(value)}
                    errorMessage={formik.touched.title && formik.errors.title}
                    isInvalid={!!(formik.touched.title && formik.errors.title)}
                >
                    {(item) => <AutocompleteItem key={item.label} textValue={item.value}>{item.value}</AutocompleteItem>}
                </Autocomplete>
                
                <Textarea  
                    variant="bordered"
                    id="description"
                    size="lg"
                    label="Description"
                    labelPlacement="outside"
                    classNames={
                        {
                            innerWrapper: "text-sm",
                            inputWrapper: "px-4 !border !border-divider bg-transparent shadow-none"
                        }
                    }
                    placeholder="Please provide us more details"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.description && formik.errors.description)}
                    errorMessage={formik.touched.description && formik.errors.description}
                />
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <Button
                    onPress={onPress}
                    variant="bordered"
                    isLoading={formik.isSubmitting}
                    isDisabled={formik.isSubmitting}
                >
                    {
                        formik.isSubmitting ? "Submitting" : "Submit"
                    }
                </Button>
                <Button
                    color="primary"
                    onPress={onClose}
                >
            Cancel
                </Button>
            </ModalFooter>
        </>
    )
}

export interface ReportPostModalRefSelectors {
  onOpen: () => void;
}

interface ReportPostModalRefProps {
    className?: string
}

export const ReportPostModalRef = forwardRef<ReportPostModalRefSelectors, ReportPostModalRefProps>(
    (props, ref) => {
        const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
        const { className } = props

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className={`${className}`}>
                <ModalContent>
                    <ReportPostModalProvider onClose={onClose}>
                        <WrappedReportPostModalRef  onClose={onClose}/>
                    </ReportPostModalProvider>
                </ModalContent>
            </Modal>
        )
    }
)
