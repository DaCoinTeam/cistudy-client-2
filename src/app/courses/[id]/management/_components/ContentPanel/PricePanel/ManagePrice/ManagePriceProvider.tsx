"use client"
import { Form, Formik, FormikProps } from "formik"
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from "react"
import { updateCourse } from "@services"
import { ManagementContext } from "../../../../_hooks"
import { RootContext } from "../../../../../../../_hooks"
import { ToastType } from "../../../../../../../_components"

interface ManagePriceContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
  };
}

export const ManagePriceContext =
  createContext<ManagePriceContextValue | null>(null)

interface FormikValues {
  price: string;
  pricePrevious: string;
  discountPrice: string;
  discountPricePrevious: string;
  enableDiscount: boolean;
  enableDiscountPrevious: boolean;
}

const initialValues: FormikValues = {
    price: "",
    pricePrevious: "",
    discountPrice: "",
    discountPricePrevious: "0",
    enableDiscount: false,
    enableDiscountPrevious: false,
}

const WrappedManagePriceProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr
    const { price, discountPrice, enableDiscount } = { ...courseManagement }

    const pricePreviousRef = useRef(false)

    useEffect(() => {
        if (!pricePreviousRef.current) {
            pricePreviousRef.current = true
            formik.setFieldValue("pricePrevious", price?.toString())
        }
        formik.setFieldValue("price", price?.toString())
    }, [price])

    const discountPricePreviousRef = useRef(false)

    useEffect(() => {
        if (!discountPricePreviousRef.current) {
            discountPricePreviousRef.current = true
            formik?.setFieldValue("discountPricePrevious", discountPrice?.toString())
        }
        formik?.setFieldValue("discountPrice", discountPrice?.toString())
    }, [discountPrice])

    const enableDiscountPreviousRef = useRef(false)

    useEffect(() => {
        if (!enableDiscountPreviousRef.current) {
            enableDiscountPreviousRef.current = true
            formik?.setFieldValue("enableDiscountPrevious", enableDiscount)
        }
        formik?.setFieldValue("enableDiscount", enableDiscount)
    }, [enableDiscount])

    const hasChanged = () =>
        formik?.values.price !== formik?.values.pricePrevious ||
    formik?.values.discountPrice !== formik?.values.discountPricePrevious ||
    formik.values.enableDiscount !== formik.values.enableDiscountPrevious

    const discardChanges = () => {
        formik.setFieldValue("price", formik?.values.pricePrevious)
        formik.setFieldValue("discountPrice", formik?.values.discountPricePrevious)
        formik.setFieldValue(
            "enableDiscount",
            formik?.values.enableDiscountPrevious
        )
    }

    const detailsPanelContextValue: ManagePriceContextValue = useMemo(
        () => ({
            formik,
            functions: {
                hasChanged,
                discardChanges,
            },
        }),
        [formik]
    )

    return (
        <ManagePriceContext.Provider value={detailsPanelContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </ManagePriceContext.Provider>
    )
}

export const ManagePriceProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const {notify} = useContext(RootContext)!
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr
    const { courseId } = { ...courseManagement }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (
                { price, discountPrice, enableDiscount },
                { setFieldValue }
            ) => {
                if (!courseId) return
                const {message} = await updateCourse({
                    data: {
                        courseId,
                        price: Number.parseFloat(price),
                        discountPrice: Number.parseFloat(discountPrice),
                        enableDiscount,
                    },
                })
                notify!({
                    data: {
                        message,
                    },
                    type: ToastType.Success,
                })
                setFieldValue("pricePrevious", price)
                setFieldValue("discountPricePrevious", discountPrice)
                setFieldValue("enableDiscountPrevious", enableDiscount)
                await mutate()
            }}
        >
            {(formik) => (
                <WrappedManagePriceProvider formik={formik}>
                    {children}
                </WrappedManagePriceProvider>
            )}
        </Formik>
    )
}
