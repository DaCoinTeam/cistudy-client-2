import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Switch,
    useDisclosure,
} from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import {
    EditQuizQuestionAnswerContext,
    EditQuizQuestionAnswerProvider,
} from "./EditQuizQuesitonAnwserModalProvider"

export interface EditQuizQuestionAnswerModalRefSelectors {
  onOpen: () => void;
}

const WrappedEditQuizQuestionAnswerModalRef =
  forwardRef<EditQuizQuestionAnswerModalRefSelectors>((_, ref) => {
      const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()

      useImperativeHandle(ref, () => ({
          onOpen,
      }))

      const { formik } = useContext(EditQuizQuestionAnswerContext)!

      return (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
              <ModalContent>
                  <ModalHeader className="p-4 pb-2 text-xl">
            Edit Quiz Question Answer
                  </ModalHeader>
                  <ModalBody>
                      <Input
                          label="Content"
                          id="content"
                          isRequired
                          classNames={{
                              inputWrapper: "input-input-wrapper",
                          }}
                          labelPlacement="outside"
                          placeholder="Input title here"
                          value={formik.values.content}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!(formik.touched.content && formik.errors.content)}
                          errorMessage={formik.touched.content && formik.errors.content}
                      />
                      <Spacer y={4} />
                      <div className="flex justify-between items-center">
                          <div className="text-sm">Correct</div>
                          <Switch
                              isSelected={formik.values.isCorrect}
                              onValueChange={(isCorrect) =>
                                  formik.setFieldValue("isCorrect", isCorrect)
                              }
                              classNames={{
                                  wrapper: "mr-0",
                              }}
                          />
                      </div>
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

export const EditQuizQuestionAnswerModalRef =
  forwardRef<EditQuizQuestionAnswerModalRefSelectors>((_, ref) => {
      return (
          <EditQuizQuestionAnswerProvider>
              <WrappedEditQuizQuestionAnswerModalRef ref={ref} />
          </EditQuizQuestionAnswerProvider>
      )
  })
