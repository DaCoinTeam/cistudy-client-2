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
import { AnswerMoreButtonContext } from "../index"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

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

      const { props } = useContext(AnswerMoreButtonContext)!
      const { answer } = props
      const { position } = answer
    
      return (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
              <ModalContent>
                  <ModalHeader className="p-4 pb-2 text-xl">
            Edit
                  </ModalHeader>
                  <ModalBody className="p-4">
                      <div>
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
                          <Spacer y={4} />
                          <div className="flex justify-between items-center">
                              <div className="text-sm">Last Answer</div>
                              <Switch
                                  isSelected={formik.values.lastAnswer}
                                  onValueChange={(lastAnswer) =>
                                      formik.setFieldValue("lastAnswer", lastAnswer)
                                  }
                                  classNames={{
                                      wrapper: "mr-0",
                                  }}
                              />
                          </div>
                          <Spacer y={4} />
                          <div className="flex items-center justify-between">
                              <div className="text-sm">Position</div>
                              <div className="justify-between flex items-center">
                                  <div className="text-sm flex gap-4 items-center">
                                      <div>{position}</div>
                                      <ArrowRightIcon  className="w-5 h-5"/>
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
                      </div> 
                  </ModalBody>
                  <ModalFooter className="p-4 pt-2">
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
