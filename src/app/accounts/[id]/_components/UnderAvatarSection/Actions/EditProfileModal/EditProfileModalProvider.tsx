"use client"
import { Form, Formik, FormikProps } from "formik"
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from "react"
import { updateProfile } from "@services"
import { AccountDetailsContext } from "../../../../_hooks"
import { parseISODateString } from "@common"
import * as Yup from "yup"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"

interface EditProfileModalContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
  };
}

export const EditProfileModalContext =
  createContext<EditProfileModalContextValue | null>(null)

interface FormikValues {
  username: string;
  usernamePrevious: string;
  birthdate: string;
  birthdatePrevious: string;
  bio: string;
  bioPrevious: string;
}

const initialValues: FormikValues = {
    username: "",
    usernamePrevious: "",
    birthdate: parseISODateString(),
    birthdatePrevious: parseISODateString(),
    bio: "",
    bioPrevious: "",
}

const WrappedEditProfileModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account } = accountSwr
    const { username, birthdate, bio } = { ...account }

    const usernamePreviousRef = useRef(false)
    useEffect(() => {
        if (!username) return

        if (!usernamePreviousRef.current) {
            usernamePreviousRef.current = true
            formik?.setFieldValue("usernamePrevious", username)
        }

        formik?.setFieldValue("username", username)
    }, [username])

    const birthdatePreviousRef = useRef(false)
    useEffect(() => {
        if (!birthdate) return

        if (!birthdatePreviousRef.current) {
            birthdatePreviousRef.current = true
            formik?.setFieldValue("birthdatePrevious", birthdate)
        }

        formik?.setFieldValue("birthdate", birthdate)
    }, [birthdate])

    const bioPreviousRef = useRef(false)
    useEffect(() => {
        if (!bio) return

        if (!bioPreviousRef.current) {
            bioPreviousRef.current = true
            formik?.setFieldValue("bioPrevious", bio)
        }

        formik?.setFieldValue("bio", bio)
    }, [bio])

    const hasChanged = () =>
        formik.values.username !== formik.values.usernamePrevious ||
    formik.values.birthdate !== formik.values.birthdatePrevious ||
    formik.values.bio !== formik.values.bioPrevious

    const discardChanges = () => {
        formik.setFieldValue("username", formik.values.usernamePrevious)
        formik.setFieldValue("birthdate", formik.values.birthdatePrevious)
        formik.setFieldValue("bio", formik.values.bioPrevious)
    }

    const editProfileModalRefContextValue: EditProfileModalContextValue = useMemo(
        () => ({
            formik,
            functions: {
                hasChanged,
                discardChanges,
            },
        }),
        [formik]
    )

    return (
        <EditProfileModalContext.Provider value={editProfileModalRefContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </EditProfileModalContext.Provider>
    )
}

export const EditProfileModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { mutate } = accountSwr
    const { notify } = useContext(RootContext)!
    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                //birthdate: Yup.string().email("Invalid email").required("Email is required"),
                //username: Yup.string().required("Password is required"),
            })
        }
        onSubmit={async ({ birthdate, username, bio }) => {
            const { message } = await updateProfile({
                data: {
                    username,
                    birthdate,
                    bio,
                }
            })
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
            await mutate()
        }}
        >
            {(formik) => (
                <WrappedEditProfileModalProvider formik={formik}> {children}</WrappedEditProfileModalProvider>
            )}
        </Formik>
    )
}