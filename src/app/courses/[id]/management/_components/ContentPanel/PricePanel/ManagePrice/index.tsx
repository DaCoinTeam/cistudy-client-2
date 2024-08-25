import { sanitizeNumericInput } from "@common"
import { Button, Input, Spacer, Switch } from "@nextui-org/react"
import { useContext, useMemo } from "react"
import { ManagePriceContext, ManagePriceProvider } from "./ManagePriceProvider"
import { ManagementContext } from "../../../../_hooks"
import useSWR from "swr"
import { findLatestConfiguration } from "../../../../../../../../services/server"

export const PLATFORM_PEE_PERCENT = 0.5

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
    const earnValue = useMemo(() => {
        if (formik.values.enableDiscount) {
            return (
                parseInt(formik.values.discountPrice) *
        (1 - PLATFORM_PEE_PERCENT)
            ).toFixed(2)
        } else {
            return (
                parseInt(formik.values.price) *
        (1 - PLATFORM_PEE_PERCENT)
            ).toFixed(2)
        }
    }, [
        formik.values.enableDiscount,
        formik.values.discountPrice,
        formik.values.price,
    ])
    const onSubmit = () => formik.submitForm()

    const configurationSwr = useSWR("CONFIGURATION_1", async () => {
        return await findLatestConfiguration({
            configurationId: true,
            updatedAt: true,
            createdAt: true,
            foundation: true,
        })
    })

    const {
        swrs: {
            courseManagementSwr: { data },
        },
    } = useContext(ManagementContext)!
    const { courseConfiguration } = { ...data }

    return (
        <div className="flex flex-col w-full">
            <div className="gap-0">
                <Input
                    variant="bordered"
                    classNames={{
                        inputWrapper:
              "px-4 !border !border-divider bg-transparent shadow-none",
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
                    endContent={<div className="text-foreground-400 text-sm">STARCI</div>}
                />
                <Spacer y={4} />
                <Input
                    variant="bordered"
                    classNames={{
                        inputWrapper:
              "px-4 !border !border-divider bg-transparent shadow-none",
                    }}
                    id="discountPrice"
                    value={formik.values.discountPrice}
                    onValueChange={onDiscountChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                        !!(formik.touched.discountPrice && formik.errors.discountPrice)
                    }
                    errorMessage={
                        formik.touched.discountPrice && formik.errors.discountPrice
                    }
                    placeholder="Input price here"
                    labelPlacement="outside"
                    label="Discount Price"
                    endContent={<div className="text-foreground-400 text-sm">STARCI</div>}
                />
                <Spacer y={4} />
                <div className="flex justify-between items-center">
                    <div className="text-sm">Enable Discount</div>
                    <Switch
                        isSelected={formik.values.enableDiscount}
                        onValueChange={onEnableDiscountChange}
                        classNames={{
                            wrapper: "mr-0",
                        }}
                        color="primary"
                    />
                </div>
                <Spacer y={6} />
                <div className="notification bg-blue-50 dark:bg-blue-800 dark:text-white border-l-4 border-blue-500 dark:border-blue-600 text-primary-500 p-4 mb-4 rounded-md shadow-sm">
                    <h3 className="font-semibold text-primary dark:text-white">
                        {" "}
            Platform Notice
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">
            For each enrollment, you will receive only{" "}
                        {100 -
              (configurationSwr.data?.foundation ?? 10) -
              (courseConfiguration?.completed ?? 10) -
              (courseConfiguration?.earn ?? 30)}
            % as your share. The remainder, which constitutes a substantial
            portion of the total funds, is allocated to the platform. This
            allocation is necessary to cover various operational costs,
            maintenance, and other expenses associated with running the
            platform.
                    </p>
                </div>
                <Spacer y={4} />
                <Input
                    variant="bordered"
                    isReadOnly
                    classNames={{
                        inputWrapper:
              "px-4 !border !border-divider bg-transparent shadow-none",
                    }}
                    id="earnValue"
                    value={earnValue.toString()}
                    labelPlacement="outside"
                    label="Estimated Receiving"
                    endContent={<div className="text-foreground-400 text-sm">STARCI</div>}
                />
            </div>
            <Spacer y={6} />
            <div className="pt-2 space-x-2">
                <Button
                    color="primary"
                    variant="bordered"
                    isDisabled={!hasChanged()}
                    onPress={onDiscardChangesPress}
                >
          Cancel
                </Button>
                <Button isDisabled={!hasChanged()} onPress={onSubmit} color="primary">
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
