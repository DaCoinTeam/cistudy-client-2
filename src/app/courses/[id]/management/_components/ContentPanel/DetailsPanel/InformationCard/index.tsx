import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Textarea,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { SaveIcon, ClipboardXIcon } from "lucide-react"
import { DetailsPanelProviders, DetailsPanelContext } from "./DetailsPanelProviders"

interface InformationCardProps {
  className?: string;
}

export const WrappedInformationCard = (props: InformationCardProps) => {
    const { className } = props

    const { formik, functions } = useContext(DetailsPanelContext)!

    const { hasChanged, discardChanges } = functions

    const onDiscardChangesPress = () => discardChanges()

    return (
        <Card shadow="none" className={`${className} border border-divider rounded-medium`}>
            <CardHeader className="p-4 pb-2 justify-between text-lg  font-semibold items-center">
                Information
            </CardHeader> 
            <CardBody className="p-4 gap-4">
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
                <Textarea
                    label="Description"
                    id="description"
                    value={formik.values.description}
                    labelPlacement="outside"
                    classNames={{
                        inputWrapper: "shadow-none !border !border-divider"
                    }}
                    variant="bordered"
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.description && formik.errors.description)}
                    errorMessage={!!(formik.touched.description && formik.errors.description)}
                />
            </CardBody>
            {
                hasChanged() ? (
                    <CardFooter className="gap-2 flex-row-reverse">
                        <Button
                            type="submit"
                            className="bg-content2"
                            startContent={<SaveIcon size={20} strokeWidth={3/2} />}
                        >
              Save
                        </Button>
                        <Button
                            onPress={onDiscardChangesPress}
                            variant="light"
                            startContent={<ClipboardXIcon size={20} strokeWidth={3/2} />}
                        >
              Discard Changes
                        </Button>
                    </CardFooter>
                ) : null
            }
           
        </Card>
    )
}

export const InformationCard = (props: InformationCardProps) => (
    <DetailsPanelProviders>
        <WrappedInformationCard {...props} />
    </DetailsPanelProviders>
)
