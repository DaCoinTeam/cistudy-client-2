import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
    useDisclosure,
} from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import {
    EditQuizQuestionContext,
    EditQuizQuestionProvider,
} from "./EditQuizQuesitonModalProvider"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { QuestionMoreButtonContext } from "../index"

export interface EditQuizQuestionModalRefSelectors {
  onOpen: () => void;
}

const WrappedEditQuizQuestionModalRef =
  forwardRef<EditQuizQuestionModalRefSelectors>((_, ref) => {
      const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()

      const { props } = useContext(QuestionMoreButtonContext)!
      const { question: _question } = props
      const { position } = _question

      useImperativeHandle(ref, () => ({
          onOpen,
      }))

      const { formik } = useContext(EditQuizQuestionContext)!

      return (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
              <ModalContent>
                  <ModalHeader className="p-6 pb-2 text-xl">
            Edit
                  </ModalHeader>
                  <ModalBody className="p-6">
                      <Tabs variant="underlined" classNames={{
                          cursor: "w-full"
                      }} aria-label="Options">
                          <Tab key="infomation" title="Information">
                              <div className="grid gap-4">
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
                          </Tab>
                          <Tab key="    " title="Photos">

                          </Tab>
                      </Tabs>
                  </ModalBody>
                  <ModalFooter className="p-6 pt-2">
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
