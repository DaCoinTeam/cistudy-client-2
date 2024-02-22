"use client"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import { FormikContext } from "./FormikProviders"
import { Content, ContentData } from "@common"
import { v4 as uuidv4 } from "uuid"

export interface CreateCommentModalContextValue {
  functions: {
    addContent: (data: ContentData) => void,
    updateContent: (content: Content) => void,
    deleteContent: (key: string) => void
  }
}

export const CreateCommentModalContext =
  createContext<CreateCommentModalContextValue | null>(null)

export const CreateCommentModalProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const formik = useContext(FormikContext)!
    const { values } = formik
    const { contents } = values

    const addContent = (data: ContentData) => {
        const content: Content = {
            key: uuidv4(),
            ...data
        }
        formik.setFieldValue("contents", [...contents, content])
    }

    const updateContent = (content: Content) => {
        const updated = contents.map(base => {
            if (content.key === base.key) {
                return content
            }
            return base
        })
        formik.setFieldValue("contents", updated)
    }

    const deleteContent = (key: string) => {
        const deleted = contents.filter(content => content.key !== key)
        formik.setFieldValue("contents", deleted)
    }

    const createCommentModalContextValue: CreateCommentModalContextValue = useMemo(
        () => ({
            functions: {
                addContent,
                updateContent,
                deleteContent
            }
        }),
        [formik.values.contents]
    )

    return (
        <CreateCommentModalContext.Provider value={createCommentModalContextValue}>
            {children}
        </CreateCommentModalContext.Provider>
    )
}
