import { Spacer, Input } from "@nextui-org/react"
import React, { useContext } from "react"
import { FormikContext } from "../FormikProviders"

export const Title = () => {
    const formik = useContext(FormikContext)!

    return (
        <div>
            <Spacer y={1} />
            <Input
                label=""
                labelPlacement="outside"
                id="title"
                color="primary"
                size="lg"
                classNames={{
                    inputWrapper: "!px-0 !h-8 !min-h-8",
                    innerWrapper: "!pb-0 !h-8",
                    input: "h-8"
                }}
                variant="underlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.touched.title && formik.errors.title)}
                errorMessage={formik.touched.title && formik.errors.title}
            />
        </div>
    )
}