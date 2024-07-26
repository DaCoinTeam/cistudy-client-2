import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import {
    EditQuizQuestionContext,
    EditQuizQuestionProvider,
} from "./EditQuizQuesitonModalProvider"

export interface EditQuizQuestionModalRefSelectors {
  onOpen: () => void;
}

const WrappedEditQuizQuestionModalRef =
  forwardRef<EditQuizQuestionModalRefSelectors>((_, ref) => {
      const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()

      useImperativeHandle(ref, () => ({
          onOpen,
      }))

      const { formik } = useContext(EditQuizQuestionContext)!

      return (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
              <ModalContent>
                  <ModalHeader className="p-4 pb-2 text-xl">
            Edit Quiz Question
                  </ModalHeader>
                  <ModalBody>
                      <Input
                          label="Question"
                          id="question"
                          isRequired
                          classNames={{
                              inputWrapper: "input-input-wrapper",
                          }}
                          labelPlacement="outside"
                          placeholder="Input question here"
                          value={formik.values.question}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!(formik.touched.question && formik.errors.question)}
                          errorMessage={formik.touched.question && formik.errors.question}
                      />
                  </ModalBody>
                  <ModalFooter>
                      <Button
                          color="primary"
                          variant="bordered"
                          onPress={() => onClose()}
                      >
              Cancel
                      </Button>
                      <Button color="primary" isLoading={formik.isSubmitting} onPress={() => formik.submitForm()}>
              Save
                      </Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
      )
  })

export const EditQuizQuestionModalRef =
  forwardRef<EditQuizQuestionModalRefSelectors>((_, ref) => {
      return (
          <EditQuizQuestionProvider>
              <WrappedEditQuizQuestionModalRef ref={ref} />
          </EditQuizQuestionProvider>
      )
  })
