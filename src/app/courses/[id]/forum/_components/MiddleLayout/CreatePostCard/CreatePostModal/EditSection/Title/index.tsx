import { Spacer, Input } from "@nextui-org/react"
import React, { useContext } from "react"
import { FormikContext } from "../../FormikProviders"

export const Title = () => {
    const formik = useContext(FormikContext)!

    return (
        <div>
            <Spacer y={1} />
            <Input
                label="Title"
                id="title"
                size="lg"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.touched.title && formik.errors.title)}
                errorMessage={formik.touched.title && formik.errors.title}
            />
        </div>
    )
}