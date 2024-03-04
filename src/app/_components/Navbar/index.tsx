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
                wrapper: "!max-w-full px-6 !bg-content1"
            }}>
                <NavbarBrand>
                    <PencilIcon className="w-6 h-6" />
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">
              Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
              Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
              Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    {profile ? (
                        <ProfileMenu />
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
