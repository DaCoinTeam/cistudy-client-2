import { sanitizeNumericInput } from "@common"
import {
    Input,
    Spacer,
} from "@nextui-org/react"
import { useContext } from "react"
import { ManagePriceContext, ManagePriceProvider } from "./ManagePriceProvider"


const WrappedManagePrice = () => {

    const { formik } = useContext(ManagePriceContext)!

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
                    isReadOnly
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
                    isReadOnly
                />
            </div>
        </div>
    )
}

export const ManagePrice = () => (
    <ManagePriceProvider>
        <WrappedManagePrice />
    </ManagePriceProvider>
)
