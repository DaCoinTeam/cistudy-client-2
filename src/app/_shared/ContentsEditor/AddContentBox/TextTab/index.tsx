import React, { useContext } from "react"
import { Textarea } from "@nextui-org/react"
import { FormikContext } from "../FormikProviders"


export const TextTab = () => {
    const formik = useContext(FormikContext)!

    return (
        <Textarea
            fullWidth
            classNames={{
                inputWrapper: !(formik.touched.text && formik.errors.text)
                    ? "!bg-content1"
                    : undefined,
            }}
            id="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.text && formik.errors.text)}
            errorMessage={formik.touched.text && formik.errors.text}
        />
    )
}
