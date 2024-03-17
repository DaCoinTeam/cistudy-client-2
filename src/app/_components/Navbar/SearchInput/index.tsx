import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Input, Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { RootContext } from "../../../_hooks"

interface SearchInputProps {
  className?: string;
}

export const SearchInput = (props: SearchInputProps) => {
    const { className } = props
    const { formik } = useContext(RootContext)!

    const onValueChange = (value: string) => {
        formik.setFieldValue("searchValue", value)
    }

    console.log(formik.values)
    
    const onSubmit = () => {
        formik.submitForm()
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") onSubmit()
    }

    return (
        <Input
            variant="bordered"
            classNames={{
                inputWrapper: "!border !border-divider shadow-none",
            }}
            value={formik.values.searchValue}
            onValueChange={onValueChange}
            className={`${className}`}
            labelPlacement="outside"
            label=""
            onKeyDown={onKeyDown}
            startContent={
                <Link color="foreground" as="button" onPress={onSubmit}>
                    <MagnifyingGlassIcon height={20} width={20} />
                </Link>
            }
        />
    )
}
