import { Textarea } from "@nextui-org/react"
import { FormikContext } from "../../../FormikProviders"
import React, { useContext } from "react"

export const WriteTextarea = () => {
    const formik = useContext(FormikContext)!
    return (
        <Textarea 
            classNames={{
                inputWrapper: "!bg-content1 p-4 shadow-none"
            }}
            id="content"
            onChange={formik.handleChange}
            value={formik.values.content}
        >
        </Textarea>
    )
}