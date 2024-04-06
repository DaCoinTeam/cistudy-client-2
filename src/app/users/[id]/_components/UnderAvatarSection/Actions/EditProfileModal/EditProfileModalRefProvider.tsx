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
import { updateCourse, updateProfile } from "@services"
import { UserDetailsContext } from "../../../../_hooks"
import { parseISODateString } from "@common"
import { RootContext, RootProvider } from "../../../../../../_hooks"

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
}

const initialValues: FormikValues = {
    username: "",
    usernamePrevious: "",
    birthdate: parseISODateString(),
    birthdatePrevious: parseISODateString(),
}

const WrappedEditProfileModalRefProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user } = userSwr
    const { username, birthdate } = { ...user }

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

    const hasChanged = () =>
        formik.values.username !== formik.values.usernamePrevious ||
    formik.values.birthdate !== formik.values.birthdatePrevious

    const discardChanges = () => {
        formik.setFieldValue("username", formik.values.usernamePrevious)
        formik.setFieldValue("birthdate", formik.values.birthdatePrevious)
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

export const EditProfileModalRefProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile, mutate } = profileSwr


    const { formik } = useContext(EditProfileModalContext)!
    const { values } = formik
    const { birthdate,  username } = values

    return (
        <div/>
    )
}