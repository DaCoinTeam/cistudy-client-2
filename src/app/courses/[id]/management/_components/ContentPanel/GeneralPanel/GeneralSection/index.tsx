import {
    Button,
    Input,
    Spacer,
    Textarea,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { GeneralSectionProviders, GeneralSectionContext } from "./GeneralSectionProviders"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface GeneralSectionProps {
  className?: string;
}

export const WrappedGeneralSection = (props: GeneralSectionProps) => {
    const { className } = props

    const { formik, functions } = useContext(GeneralSectionContext)!

    const { hasChanged, discardChanges } = functions

    const onDiscardChangesPress = () => discardChanges()

    return (
        <div className={`${className}`}>
            <div className="text-2xl"> General </div>
            <Spacer y={4}/>
            <Input
                label="Title"
                id="title"
                labelPlacement="outside"
                value={formik.values.title}
                classNames={{
                    inputWrapper: "shadow-none !border !border-divider",
                }}
                variant="bordered"
                placeholder="Input title here"
                onChange={formik.handleChange}
                isInvalid={!!(formik.touched.title && formik.errors.title)}
                errorMessage={formik.touched.title && formik.errors.title}
            />
            <Spacer y={4}/>
            <Textarea
                label="Description"
                id="description"
                value={formik.values.description}
                labelPlacement="outside"
                placeholder="Input description here"
                classNames={{
                    inputWrapper: "shadow-none !border !border-divider"
                }}
                variant="bordered"
                onChange={formik.handleChange}
                isInvalid={!!(formik.touched.description && formik.errors.description)}
                errorMessage={!!(formik.touched.description && formik.errors.description)}
            />
            <Spacer y={4}/>
            <div className="flex gap-2">
                <Button
                    isDisabled={!hasChanged()}
                    onPress={onDiscardChangesPress}
                    startContent={<XMarkIcon height={20} width={20} />}
                >
              Cancel
                </Button>
                <Button
                    isDisabled={!hasChanged()}
                    type="submit"
                    color="primary"
                    className="text-secondary-foreground"
                    startContent={<CheckIcon height={20} width={20} />}
                >
              Save
                </Button>
            </div>
        </div>
    )
}

export const GeneralSection = (props: GeneralSectionProps) => (
    <GeneralSectionProviders>
        <WrappedGeneralSection {...props} />
    </GeneralSectionProviders>
)
