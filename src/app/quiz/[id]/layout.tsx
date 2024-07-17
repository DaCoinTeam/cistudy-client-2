"use client"
import { ReactNode } from "react"
import { QuizProvider } from "./hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <QuizProvider>{children}</QuizProvider>
}

export default Layout
