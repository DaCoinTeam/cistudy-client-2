"use client"
import {
    Button,
    Divider,
    Input,
    Link,
    ModalBody,
    ModalFooter,
    Spacer,
} from "@nextui-org/react"
import { SignInTabContext, SignInTabProvider } from "./SignInTabProvider"
import { useContext, useRef } from "react"
import { NavbarContext } from "../../NavbarProvider"
import { SignInByGoogleIcon } from "./SignInByGoogleButton"
import { SignInByFacebookIcon } from "./SignInByFacebookButton"
import { ForgotPasswordModalRef, ForgotPasswordModalRefSelectors } from "./ForgotPasswordModalRef"

const WrappedSignInTab = () => {
    const { formik, swrs } = useContext(SignInTabContext)!
    const { signInTabSwrMutation } = swrs
    const { isMutating } = signInTabSwrMutation
    const { reducer } = useContext(NavbarContext)!
    const [, dispatch] = reducer
    const forgetPasswordModalRef = useRef<ForgotPasswordModalRefSelectors>(null)

    const onPressToSignUp = () => dispatch({
        type: "SET_IS_SIGN_UP",
        payload: true
    })

    return (
        <>
            <ModalBody className="p-4">
                <div>
                    <Input
                        label="Email"
                        id="email"
                        isRequired
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }}
                        labelPlacement="outside"
                        placeholder="Input email here"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                    />
                    <Spacer y={4} />
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }}
                        label="Password"
                        id="password"
                        type="password"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input password here"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.password && formik.errors.password)}
                        errorMessage={formik.touched.password && formik.errors.password}
                    />
                    <Spacer y={1} />
                    <div className="text-left pt-2">
                        <div className="text-xs text-primary cursor-pointer underline" onClick={() => forgetPasswordModalRef.current?.onOpen()}>
                            Forgot password?
                        </div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-center">
                        <span className="text-sm">Do not have an account?</span>{" "}
                        <Link className="text-sm cursor-pointer" onPress={onPressToSignUp}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <div className="w-full">
                    <Button
                        type="submit"
                        isDisabled={!!Object.keys(formik.errors).length}
                        className="w-full"
                        color="primary"
                        isLoading={isMutating}
                    >
                        {isMutating ? "Signing..." : "Sign In"}
                    </Button>
                    <Spacer y={4} />
                    <div className="flex items-center gap-2">
                        <Divider className="flex-1" />
                        OR
                        <Divider className="flex-1" />
                    </div>
                    <Spacer y={4} />
                    <div className="gap-4 grid grid-cols-2 w-fit m-auto">
                        <SignInByGoogleIcon />
                        <SignInByFacebookIcon />
                    </div>
                </div>
            </ModalFooter>
            <ForgotPasswordModalRef ref={forgetPasswordModalRef} />
        </>
    )
}

export const SignInTab = () => (
    <SignInTabProvider>
        <WrappedSignInTab />
    </SignInTabProvider>
)
