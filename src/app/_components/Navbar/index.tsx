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
import { PencilIcon } from "@heroicons/react/16/solid"
import { AuthModal } from "./AuthModal"
import { NavbarContext, NavbarProviders } from "./NavbarProviders"
import { ProfileMenu } from "./ProfileMenu"
import { RootContext } from "../../_hooks"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { SearchInput } from "./SearchInput"

interface NavbarProps {
  className?: string;
}

const WrappedNavbar = (props: NavbarProps) => {
    const { className } = props 

    const { dispatch } = useContext(NavbarContext)!

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    const onSignInPress = () => {
        dispatch({
            type: "SET_IS_AUTH_MODAL_OPEN",
            payload: true
        })
        dispatch({
            type: "SET_IS_SIGN_UP",
            payload: false
        })
    }
    const onSignUpPress = () => {
        dispatch({
            type: "SET_IS_AUTH_MODAL_OPEN",
            payload: true
        })
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
                    <PencilIcon className="w-6 h-6" />
                    <p className="font-semibold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent justify="center">
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
    <NavbarProviders>
        <WrappedNavbar {...props} />{" "}
    </NavbarProviders>
)
