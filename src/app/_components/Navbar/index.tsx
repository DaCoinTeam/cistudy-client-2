"use client"
import React, { useContext } from "react"
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react"
import { AuthModal } from "./AuthModal"
import { NavbarContext, NavbarProvider } from "./NavbarProvider"
import { ProfileMenu } from "./ProfileMenu"
import { RootContext } from "../../_hooks"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { SearchInput } from "./SearchInput"
import { useRouter } from "next/navigation"

interface NavbarProps {
  className?: string;
}

const WrappedNavbar = (props: NavbarProps) => {
    const { className } = props 

    const { disclosures, reducer } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onOpen } = authModalDisclosure
    const [, dispatch] = reducer

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr
    const router = useRouter()

    const onSignInPress = () => {
        onOpen()
        dispatch({
            type: "SET_IS_SIGN_UP",
            payload: false
        })
    }
    const onSignUpPress = () => {
        onOpen()
        dispatch({
            type: "SET_IS_SIGN_UP",
            payload: true
        })
    }

    return (
        <>
            <NextUINavbar className={className} classNames={{
                wrapper: "!max-w-full px-12"
            }}>
                <NavbarBrand>
                    <div className="font-semibold text-primary cursor-pointer"  onClick={() => router.push("/")}> 
                        <span className="text-primary">
                        Ci
                        </span>
                        <span className="text-success">
                        Study
                        </span>
                    </div>
                </NavbarBrand>
                <NavbarContent justify="center">
                    <NavbarItem  className="px-4 cursor-pointer" onClick={() => router.push("/courses")}>
                        Courses
                    </NavbarItem>
                    <SearchInput className="w-[500px]"/>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <DarkModeSwitch/>
                    </NavbarItem>
                    {profile ? (
                        <NavbarItem>
                            <ProfileMenu />
                        </NavbarItem>
                      
                    ) : (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Link as="button" onPress={onSignInPress}>
                  Sign In       
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button color="primary" onPress={onSignUpPress} variant="flat">
                  Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    )}
                </NavbarContent>
            </NextUINavbar>
            <AuthModal />
        </>
    )
}

export const Navbar = (props: NavbarProps) => (
    <NavbarProvider>
        <WrappedNavbar {...props} />{" "}
    </NavbarProvider>
)
