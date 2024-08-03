"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { AppendKey, Media } from "@common"
import { createPostComment } from "@services"
import { RootContext } from "../../../../../_hooks"
import { ToastType } from "../../../../../_components"
import { PostDetailContext } from "../../../hooks"

interface FormikValues {
    html: string
    postCommentMedias: Array<AppendKey<Media>>
}

interface CreateCommentModalContextValue {
    formik: FormikProps<FormikValues>
}

export const CreateCommentModalContext = createContext<CreateCommentModalContextValue | null>(
    null
)

const initialValues: FormikValues = {
    html: "",
    postCommentMedias: []
}

const WrappedCreateCommentModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => (
    <CreateCommentModalContext.Provider value={{formik}}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </CreateCommentModalContext.Provider>
)

export const CreateCommentModalProvider = ({ children, onClose }: { children: ReactNode, onClose: () => void }) => {

    const {swrs} = useContext(PostDetailContext)!
    const {postSwr, postCommentsSwr} = swrs
    const {mutate: postMutate, data} = postSwr
    const {mutate: postCommentMutate} = postCommentsSwr
    const { notify } = useContext(RootContext)!

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ html, postCommentMedias: postCommentMediasRaw }, helpers) => {
                let countIndex = 0
                const files: Array<File> = []     
                
                const postCommentMedias = postCommentMediasRaw.map(({mediaType, file}) => {
                    const result = {
                        mediaIndex: countIndex,
                        mediaType
                    }

                    countIndex ++
                    files.push(file)

                    return result
                })

                const { others } = await createPostComment({
                    data: {
                        postId: data?.postId?? "",
                        html,
                        postCommentMedias
                    },
                    files
                })
                if(others.earnAmount){
                    notify!({
                        type: ToastType.Earn,
                        data: {
                            earnAmount: others.earnAmount
                        }
                    })
                }

                await postCommentMutate()
                await postMutate()
                helpers.resetForm()
                onClose()
            }}
        >
            {(formik) => (
                <WrappedCreateCommentModalProvider formik={formik}>
                    {children}
                </WrappedCreateCommentModalProvider>
            )}
        </Formik>
    )
}
