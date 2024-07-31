import { Divider, Link, Spacer } from "@nextui-org/react"
import { BsDiscord, BsDribbble, BsFacebook, BsGithub, BsTwitter } from "react-icons/bs"

export const Footer = () => {
    return (<footer>
        <div className="w-full p-12">
            <Spacer y={12}/>
            <Divider />
            <Spacer y={12}/>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
                        <Link href="/" className="hover:underline">
                Cistudy™
                        </Link>
              . All Rights Reserved.
                    </span>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="#"
                        className="text-foreground-400"
                    >
                        <BsFacebook className="w-6 h-6"/>
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground-400"
                    >
                        <BsDiscord className="w-6 h-6"/>
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground-400"
                    >
                        <BsTwitter className="w-6 h-6"/>
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground-400"
                    >
                        <BsGithub className="w-6 h-6"/>
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground-400"
                    >
                        <BsDribbble className="w-6 h-6"/>
                    </Link>
                </div>
            </div>
        </div>
    </footer>
    )
}
