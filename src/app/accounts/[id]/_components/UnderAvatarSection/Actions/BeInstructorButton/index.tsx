import { Button, Tooltip } from "@nextui-org/react"
import { registerInstructor } from "@services"
import { useContext } from "react"
import useSWRMutation from "swr/mutation"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { ErrorResponse } from "@common"

export const BeInstructorButton = () => {
    const {notify} = useContext(RootContext)!

    const registerInstructorSwrMutation = useSWRMutation(
        "REGISTER_INSTRUCTOR",
        async () => {
            return await registerInstructor()
        }
    )

    const beInstructor = async () => {
        try {
            const {message} = await registerInstructorSwrMutation.trigger()
                notify!({
                    data: {
                        message
                    },
                    type: ToastType.Success
                })
        } catch (ex) {
            const {message} = ex as ErrorResponse
            notify!({
                data: {
                    error: message as string
                },
                type: ToastType.Error
            })
        }
    }

    return (
        <div>
            <Tooltip content="Add your work experience before submitting">
                <Button 
                    color="primary" 
                    variant="bordered" 
                    onPress={beInstructor}
                    isLoading={registerInstructorSwrMutation.isMutating}
                    isDisabled={registerInstructorSwrMutation.isMutating}
                >
                    {
                        registerInstructorSwrMutation.isMutating? (
                            "Requesting..."
                        ) : (
                            "Become an instructor"
                        )
                    }
                </Button>
            </Tooltip>
        </div>
    )
}