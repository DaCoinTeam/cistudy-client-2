"use client"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/react"
import classNames from "classnames"
import { ArrowUpIcon } from "lucide-react"

export const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false)

    const handleScroll = () => {
        if (window.scrollY > 500) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div
            className={classNames(
                "fixed bottom-5 right-5 z-50 transition-opacity duration-300",
                {
                    "opacity-0": !showButton,
                    "opacity-100": showButton,
                }
            )}
        >
            <Button
                color="primary"
                isIconOnly 
                aria-label="ScrollToTop"
                onClick={scrollToTop}
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-full p-6"
            >
                <ArrowUpIcon color="white" className="h-5 w-5" />
            </Button>
            
        </div>
    )
}

