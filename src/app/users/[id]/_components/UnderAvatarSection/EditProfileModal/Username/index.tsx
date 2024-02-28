import { Input, Link } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { updateProfile } from "@services"
import { isErrorResponse } from "@common"
import * as Yup from "yup"
import { ValidationError } from "yup"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { RootContext } from "../../../../../../_hooks"
import { UserDetailsContext } from "../../../../_hooks"

interface ValidationShape {
    username: string
}

export const Username = () => {
    const profile = useSelector((state: RootState) => state.auth.profile)

    const { functions } = useContext(UserDetailsContext)!
    const { fetchAndSetUser } = functions
    const { functions: rootFunctions } = useContext(RootContext)!
    const { fetchAndSetProfile } = rootFunctions

    const [isEdited, setIsEdited] = useState(false)
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (profile === null) return
        const { username } = profile
        setUsername(username)

    }, [profile?.username])


    const schema =  Yup.object().shape({
        username: Yup.string().required("Username is required"),
    })

    const shape: ValidationShape = {
        username,
    }

  
    const isValid = schema.isValidSync(shape)

    const errors: Partial<ValidationShape> = {}
    try{
        schema.validateSync(shape, {abortEarly: false})
    } catch(ex) {
        const inner = (ex as ValidationError).inner
        for (const { path,  message } of inner) {
            errors[path as "username"] = message
        }
    }

    const onPress = async () => {
        if (isEdited) {
            const response = await updateProfile({
                data: {
                    username
                },
            })
            if (!isErrorResponse(response)) {
                await fetchAndSetUser()
                await fetchAndSetProfile()
            } else {
                console.log(response)
            }
        }
        setIsEdited(!isEdited)
    }

    const onValueChange = (value: string) => setUsername(value)

    return (
        <Input
            label="Username"
            value={username}
            onValueChange={onValueChange}
            isInvalid={!isValid}
            errorMessage={errors.username}
            readOnly={!isEdited}
            endContent={
                <Link
                    color="primary"
                    onPress={onPress}
                    as="button"
                    className="text-sm"
                >
                    {isEdited ? "Save" : "Edit"}
                </Link>
            }
        />
    )
}
