import React, { useContext } from "react"
import { Textarea } from "@nextui-org/react"
import { FormikContext } from "../FormikProviders"


export const CodeTab = () => {
    const formik = useContext(FormikContext)!

    return (
        <Textarea
            fullWidth
            classNames={{
                inputWrapper: !(formik.touched.code && formik.errors.code)
                    ? "!bg-content1"
                    : undefined,
                input: "font-mono"
            }}
            id="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.code && formik.errors.code)}
            errorMessage={formik.touched.code && formik.errors.code}
        />
    )
}
