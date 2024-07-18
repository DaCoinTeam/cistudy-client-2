"use client"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/react"
import classNames from "classnames"
import { ArrowLongUpIcon } from "@heroicons/react/24/solid"

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
                size="lg"
                aria-label="ScrollToTop"
                onClick={scrollToTop}
                className="bg-primary hover:bg-secondary text-white rounded-full "
            >
                <ArrowLongUpIcon className="h-5 w-5 " />
            </Button>
            
        </div>
    )
}

