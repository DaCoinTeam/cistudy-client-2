import React, { useContext } from "react"
import { FormikContext } from "../FormikProviders"
import Markdown from "react-markdown"
import gfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Code, Link } from "@nextui-org/react"
import rehypeHighlight from 'rehype-highlight'

export const PreviewSection = () => {
    const formik = useContext(FormikContext)!
    const { values } = formik

    return (
        <div className="flex-1 flex flex-col gap-4">
            <Markdown remarkPlugins={[gfm]} rehypePlugins={[rehypeHighlight]} components={
                {
                    code: (props) => {
                        const { children } = props
                        return <Code className="whitespace-break-spaces">{children}</Code>
                    },
                    p: (props) => {
                        const { children } = props
                        return <div className="whitespace-break-spaces text-sm">{children}</div>
                    },
                    pre: (props) => {
                        const { children } = props
                        return <div className="w-full grid contents-stretch">{children}</div>
                    },
                    h1: (props) => {
                        const { children } = props
                        return <h1>{children}</h1>
                    },
                    h2: (props) => {
                        const { children } = props
                        return <h2>{children}</h2>
                    },
                    h3: (props) => {
                        const { children } = props
                        return <h3>{children}</h3>
                    },
                    h4: (props) => {
                        const { children } = props
                        return <h4>{children}</h4>
                    },
                    h5: (props) => {
                        const { children } = props
                        return <h5>{children}</h5>
                    },
                    h6: (props) => {
                        const { children } = props
                        return <h6>{children}</h6>
                    },
                    u: (props) => {
                        const { children } = props
                        return <div className="underline underline-offset-4">{children}</div>
                    },
                    a: (props) => {
                        const { children, href } = props
                        return <Link href={href} underline="always" size="sm">{children}</Link>
                    }
                }
            }>{values.content}</Markdown>
        </div>
    )
}
