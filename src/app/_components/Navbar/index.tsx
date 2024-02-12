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
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { ProfileMenu } from "./ProfileMenu"

interface INavbarProps {
  className?: string;
}

const WrappedNavbar = (props: INavbarProps) => {
    const { dispatch } = useContext(NavbarContext)!

    const profile = useSelector((state: RootState) => state.auth.profile)

    const onClickSignIn = () => {
        dispatch({
            type: "SET_IS_AUTH_MODAL_OPEN",
            payload: true
        })
        dispatch({
            type: "SET_IS_SIGN_UP",
            payload: false
        })
    }
    const onClickSignUp = () => {
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
            <NextUINavbar isBordered shouldHideOnScroll className={props.className}>
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
                                <Link onClick={onClickSignIn} className="cursor-pointer">
                  Sign In
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button color="primary" onClick={onClickSignUp} variant="flat">
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

export const Navbar = (props: INavbarProps) => (
    <NavbarProviders>
        {" "}
        <WrappedNavbar {...props} />{" "}
    </NavbarProviders>
)