"use client"
import {
    Button,
    Input,
    Link,
    ModalBody,
    ModalFooter,
    Spacer,
} from "@nextui-org/react"
import { FormikContext, FormikProviders } from "./FormikProviders"
import { useContext } from "react"
import { NavbarContext } from "../../NavbarProviders"

const WrappedSignUpTab = () => {
    const formik = useContext(FormikContext)!

    const { isSignUpState } = useContext(NavbarContext)!
    const { setIsSignUp } = isSignUpState
    
    const onClickToSignIn = () => setIsSignUp(false)
    return (
        <>
            <ModalBody className="p-6">
                <div>
                    <Input
                        label="Email"
                        id="email"
                        isRequired
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                    />
                    <Spacer y={4} />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        isRequired
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.password && formik.errors.password)}
                        errorMessage={formik.touched.password && formik.errors.password}
                    />
                    <Spacer y={4} />
                    <Input
                        label="Confirm"
                        id="confirm"
                        type="password"
                        isRequired
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.confirm && formik.errors.confirm)}
                        errorMessage={formik.touched.confirm && formik.errors.confirm}
                    />
                    <Spacer y={4} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First name"
                            id="firstName"
                            isRequired
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(formik.touched.firstName && formik.errors.firstName)
                            }
                            errorMessage={formik.touched.firstName && formik.errors.firstName}
                        />
                        <Input
                            label="Last name"
                            id="lastName"
                            isRequired
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.lastName && formik.errors.lastName)}
                            errorMessage={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                    <Spacer y={4} />
                    <Input
                        label="Birthdate"
                        id="birthdate"
                        type="date"
                        disableAnimation
                        isRequired
                        value={formik.values.birthdate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.birthdate && formik.errors.birthdate)}
                        errorMessage={formik.touched.birthdate && formik.errors.birthdate}
                    />
                    <Spacer y={4} />
                    <div className="text-center">
                        <span className="text-sm">Already have an account?</span>{" "}
                        <Link className="text-sm cursor-pointer" onClick={onClickToSignIn}>
            Sign In
                        </Link>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="p-6">
                <Button
                    isDisabled={!!Object.keys(formik.errors).length}
                    type="submit"
                    className="w-full"
                    color="primary"
                >
          Sign Up
                </Button>
            </ModalFooter>
        </>
    )
}

export const SignUpTab = () => (
    <FormikProviders>
        <WrappedSignUpTab />
    </FormikProviders>
)
