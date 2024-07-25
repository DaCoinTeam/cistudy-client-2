import { sanitizeNumericInput } from "@common"
import {
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import {
    Button,
    Input,
    Spacer,
    Switch,
} from "@nextui-org/react"
import { useContext } from "react"
import { ManagePriceContext, ManagePriceProvider } from "./ManagePriceProvider"


const WrappedManagePrice = () => {

    const { formik, functions } = useContext(ManagePriceContext)!

    const { hasChanged, discardChanges } = functions

    const onDiscardChangesPress = () => discardChanges()

    const onEnableDiscountChange = (value: boolean) =>
        formik.setFieldValue("enableDiscount", value)

    const onPriceChange = (value: string) => {
        const sanitizeInput = sanitizeNumericInput(value)
        if (sanitizeInput != null) formik.setFieldValue("price", sanitizeInput)
    }

    const onDiscountChange = (value: string) => {
        const sanitizeInput = sanitizeNumericInput(value)
        if (sanitizeInput != null) {
            if (
                sanitizeInput &&
        (Number.parseFloat(sanitizeInput) < 0 ||
          Number.parseFloat(sanitizeInput) > 100)
            )
                return
            formik.setFieldValue("discountPrice", sanitizeInput)
        }
    }
    const onSubmit = () => formik.submitForm()

    return (
        
        <div>
            <div className="p-4 pb-2 text-xl">Manage Price</div>
            <div className="p-4 gap-0">
                <Input
                    variant="bordered"
                    classNames={{
                        inputWrapper: "px-4 !border !border-divider bg-transparent shadow-none"
                    }} 
                    id="price"
                    value={formik.values.price}
                    onValueChange={onPriceChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.price && formik.errors.price)}
                    errorMessage={formik.touched.price && formik.errors.price}
                    placeholder="Input price here"
                    labelPlacement="outside"
                    label="Price"
                    endContent={
                        <div className="text-foreground-400 text-sm">STARCI</div>
                    }
                />
                <Spacer y={4} />
                <Input
                    variant="bordered"
                    classNames={{
                        inputWrapper: "px-4 !border !border-divider bg-transparent shadow-none"
                    }} 
                    id="discountPrice"
                    value={formik.values.discountPrice}
                    onValueChange={onDiscountChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.discountPrice && formik.errors.discountPrice)}
                    errorMessage={formik.touched.discountPrice && formik.errors.discountPrice}
                    placeholder="Input price here"
                    labelPlacement="outside"
                    label="Discount price"
                    endContent={
                        <div className="text-foreground-400 text-sm">STARCI</div>
                    }
                />
                <Spacer y={4} />
                <div className="flex justify-between items-center">
                    <div className="text-sm">Enable discountPrice</div>
                    <Switch
                        isSelected={formik.values.enableDiscount}
                        onValueChange={onEnableDiscountChange}
                        classNames={{
                            wrapper: "mr-0",
                        }}
                        color="secondary"
                    />
                </div>
            </div>
            <div className="p-4 pt-2">
                <Button
                    isDisabled={!hasChanged()}
                    onPress={onDiscardChangesPress}
                    startContent={<XMarkIcon height={20} width={20} />}
                >
              Cancel
                </Button>
                <Button
                    isDisabled={!hasChanged()}
                    onPress={onSubmit}
                    color="secondary"
                    startContent={<CheckIcon height={20} width={20} />}
                >
              Save
                </Button>
            </div>
        </div>
    )
}

export const ManagePrice = () => (
    <ManagePriceProvider>
        <WrappedManagePrice />
    </ManagePriceProvider>
)
