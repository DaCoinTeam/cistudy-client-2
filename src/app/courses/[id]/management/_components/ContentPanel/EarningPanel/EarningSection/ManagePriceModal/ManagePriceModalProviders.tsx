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
import { ManagementContext } from "../../../../../_hooks"
import { updateCourse } from "@services"

interface ManagePriceModalContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
  };
}

export const ManagePriceModalContext =
  createContext<ManagePriceModalContextValue | null>(null)

interface FormikValues {
  price: string;
  pricePrevious: string;
  discount: string;
  discountPrevious: string;
  enableDiscount: boolean;
  enableDiscountPrevious: boolean;
}

const initialValues: FormikValues = {
    price: "",
    pricePrevious: "",
    discount: "",
    discountPrevious: "0",
    enableDiscount: false,
    enableDiscountPrevious: false,
}

const WrappedManagePriceModalProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr
    const { price, discount, enableDiscount } = { ...courseManagement }

    const pricePreviousRef = useRef(false)

    useEffect(() => {
        if (!pricePreviousRef.current) {
            pricePreviousRef.current = true
            formik.setFieldValue("pricePrevious", price?.toString())
        }
        formik.setFieldValue("price", price?.toString())
    }, [price])

    const discountPreviousRef = useRef(false)

    useEffect(() => {
        if (!discountPreviousRef.current) {
            discountPreviousRef.current = true
            formik?.setFieldValue("discountPrevious", discount?.toString())
        }
        formik?.setFieldValue("discount", discount?.toString())
    }, [discount])

    const enableDiscountPreviousRef = useRef(false)

    useEffect(() => {
        if (!enableDiscountPreviousRef.current) {
            enableDiscountPreviousRef.current = true
            formik?.setFieldValue("descriptionPrevious", enableDiscount)
        }
        formik?.setFieldValue("description", enableDiscount)
    }, [enableDiscount])

    const hasChanged = () =>
        formik?.values.price !== formik?.values.pricePrevious ||
    formik?.values.discount !== formik?.values.discountPrevious ||
    formik.values.enableDiscount !== formik.values.enableDiscountPrevious

    const discardChanges = () => {
        formik.setFieldValue("price", formik?.values.pricePrevious)
        formik.setFieldValue("discount", formik?.values.discountPrevious)
        formik.setFieldValue(
            "enableDiscount",
            formik?.values.enableDiscountPrevious
        )
    }

    const detailsPanelContextValue: ManagePriceModalContextValue = useMemo(
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
        <ManagePriceModalContext.Provider value={detailsPanelContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </ManagePriceModalContext.Provider>
    )
}

export const ManagePriceModalProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr
    const { courseId } = { ...courseManagement }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (
                { price, discount, enableDiscount },
                { setFieldValue }
            ) => {
                if (!courseId) return
                await updateCourse({
                    data: {
                        courseId,
                        price: Number.parseFloat(price),
                        discount: Number.parseFloat(discount),
                        enableDiscount,
                    },
                })
                setFieldValue("pricePrevious", price)
                setFieldValue("discountPrevious", discount)
                setFieldValue("enableDiscountPrevious", enableDiscount)
                await mutate()
            }}
        >
            {(formik) => (
                <WrappedManagePriceModalProviders formik={formik}>
                    {children}
                </WrappedManagePriceModalProviders>
            )}
        </Formik>
    )
}
