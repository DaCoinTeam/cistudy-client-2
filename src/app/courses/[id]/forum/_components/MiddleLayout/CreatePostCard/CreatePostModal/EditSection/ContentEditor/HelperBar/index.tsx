import {
    BsTypeBold,
    BsTypeH1,
    BsTypeH2,
    BsTypeH3,
    BsTypeH4,
    BsTypeH5,
    BsTypeH6,
    BsTypeItalic,
    BsTypeUnderline,
} from "react-icons/bs"
import { Link, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { FormikContext } from "../../../FormikProviders"
import {
    CodeBracketIcon,
    CodeBracketSquareIcon,
    LinkIcon,
} from "@heroicons/react/24/outline"

export const HelperBar = () => {
    const formik = useContext(FormikContext)!
    const { setFieldValue, values } = formik
    const { content } = values

    const onBoldPress = () => {
        const contentToAppend = "**Nguyen Van Tu Cuong**"
        setFieldValue("content", `${content} ${contentToAppend}`)
    }

    const onItalicPress = () => {
        const contentToAppend = "*Nguyen Van Tu Cuong*"
        setFieldValue("content", `${content} ${contentToAppend}`)
    }

    const onUnderlinePress = () => {
        const contentToAppend = "<u>Nguyen Van Tu Cuong</u>"
        setFieldValue("content", `${content} ${contentToAppend}`)
    }

    const onHeaderPress = (level: number) => {
        const hashSymbols = "#".repeat(level)
        const contentToAppend = `${hashSymbols} Nguyen Van Tu Cuong`
        setFieldValue("content", `${content} ${contentToAppend}`)
    }

    const onLinkPress = () => {
        const contentToAppend =
      "[Nguyen Van Tu Cuong](https://www.facebook.com/starci183)"
        setFieldValue("content", `${content} ${contentToAppend}`)
    }

    const onCodePress = () => {
        const contentToAppend = "`<div> Nguyen Van Tu Cuong </div>`"
        setFieldValue("content", `${content} ${contentToAppend}`)
    }

    const onCodeBlockPress = () => {
        const contentToAppend = `\`\`\`
<div> Nguyen Van Tu Cuong </div>
\`\`\``
        setFieldValue(
            "content",
            `${content ? `${content}\n` : ""}${contentToAppend}`
        )
    }

    return (
        <div>
            <div className="flex gap-6 items-center">
                <div className="flex gap-3 items-center">
                    <Link as="button" onPress={onBoldPress}>
                        <BsTypeBold className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={onItalicPress}>
                        <BsTypeItalic className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={onUnderlinePress}>
                        <BsTypeUnderline className="w-6  h-6" />
                    </Link>
                </div>

                <div className="flex gap-3 items-center">
                    <Link as="button" onPress={() => onHeaderPress(1)}>
                        <BsTypeH1 className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={() => onHeaderPress(2)}>
                        <BsTypeH2 className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={() => onHeaderPress(3)}>
                        <BsTypeH3 className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={() => onHeaderPress(4)}>
                        <BsTypeH4 className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={() => onHeaderPress(5)}>
                        <BsTypeH5 className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={() => onHeaderPress(6)}>
                        <BsTypeH6 className="w-6  h-6" />
                    </Link>
                </div>
            </div>

            <Spacer y={3}/>
            
            <div className="flex gap-6 items-center">
                <div className="flex gap-3 items-center">
                    <Link as="button" onPress={onCodePress}>
                        <CodeBracketIcon className="w-6  h-6" />
                    </Link>
                    <Link as="button" onPress={onCodeBlockPress}>
                        <CodeBracketSquareIcon className="w-6  h-6" />
                    </Link>
                </div>
                <div className="flex gap-3 items-center">
                    <Link as="button" onPress={onLinkPress}>
                        <LinkIcon className="w-6  h-6" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
