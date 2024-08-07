"use client"
import {
    Button,
    DatePicker,
    Input,
    Link,
    ModalBody,
    ModalFooter,
    Spacer,
} from "@nextui-org/react"
import { SignUpTabContext, SignUpTabProvider } from "./SignUpTabProvider"
import { useContext } from "react"
import { NavbarContext } from "../../NavbarProvider"
import { parseDate, getLocalTimeZone } from "@internationalized/date"
import { parseISODateString } from "@common"

const WrappedSignUpTab = () => {

    const { formik, swrs } = useContext(SignUpTabContext)!
    const {signUpTabSwrMutation} = swrs
    const {isMutating} = signUpTabSwrMutation
    const { reducer } = useContext(NavbarContext)!
    const [, dispatch] = reducer

    const onPressToSignIn = () =>
        dispatch({
            type: "SET_IS_SIGN_UP",
            payload: false,
        })
    return (
        <>
            <ModalBody className="p-4">
                <div>
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }} 
                        label="Email"
                        id="email"
                        isRequired
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
                    <Spacer y={4} />
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }} 
                        label="Confirm"
                        id="confirm"
                        type="password"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input confirm here"
                        value={formik.values.confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.confirm && formik.errors.confirm)}
                        errorMessage={formik.touched.confirm && formik.errors.confirm}
                    />
                    <Spacer y={4} />
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }} 
                        label="Username"
                        id="username"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Input username here"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            !!(formik.touched.username && formik.errors.username)
                        }
                        errorMessage={formik.touched.username && formik.errors.username}
                    />
                    <Spacer y={4} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }} 
                            label="First name"
                            id="firstName"
                            isRequired
                            labelPlacement="outside"
                            placeholder="Input first name here"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(formik.touched.firstName && formik.errors.firstName)
                            }
                            errorMessage={formik.touched.firstName && formik.errors.firstName}
                        />
                        <Input
                            classNames={{
                                inputWrapper: "input-input-wrapper",
                            }} 
                            label="Last name"
                            id="lastName"
                            isRequired
                            labelPlacement="outside"
                            placeholder="Input last name here"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.lastName && formik.errors.lastName)}
                            errorMessage={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                    <Spacer y={4} />
                    <DatePicker
                        // classNames={{
                        //     inputWrapper: "input-input-wrapper"
                        // }}
                        label="Birthdate" value={parseDate(formik.values.birthdate)} className="w-full" 
                        labelPlacement="outside" onChange={(value) => {
                            formik.setFieldValue("birthdate", parseISODateString(value.toDate(getLocalTimeZone())))
                        }}
                    />
                    <Spacer y={4} />
                    <div className="text-center">
                        <span className="text-sm">Already have an account?</span>{" "}
                        <Link className="text-sm cursor-pointer" onPress={onPressToSignIn}>
              Sign In
                        </Link>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <Button
                    isDisabled={!!Object.keys(formik.errors).length}
                    type="submit"
                    className="w-full"
                    color="primary"
                    isLoading={isMutating}
                >
                    {isMutating? "Signing up..." : "Sign Up"}
                </Button>
            </ModalFooter>
        </>
    )
}

export const SignUpTab = () => (
    <SignUpTabProvider>
        <WrappedSignUpTab />
    </SignUpTabProvider>
)
