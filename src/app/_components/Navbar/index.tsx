"use client"
import {
    Button,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Navbar as NextUINavbar
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { RootContext } from "../../_hooks"
import { AuthModal } from "./AuthModal"
import { Categories } from "./Categories"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { NavbarContext, NavbarProvider } from "./NavbarProvider"
import { ProfileMenu } from "./ProfileMenu"
import { SearchInput } from "./SearchInput"

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
            payload: false,
        })
    }
    const onSignUpPress = () => {
        onOpen()
        dispatch({
            type: "SET_IS_SIGN_UP",
            payload: true,
        })
    }
    
    
    return (
        <>
            <NextUINavbar
                className={className}
                classNames={{
                    wrapper: "!max-w-full px-12",
                }}
            >
                <NavbarBrand>
                    <div
                        className='font-semibold text-primary cursor-pointer'
                        role='button'
                        onClick={() => router.push("/")}
                    >
                        <span className='text-primary'>Ci</span>
                        <span className='text-primary'>Study</span>
                    </div>
                </NavbarBrand>
                <NavbarContent justify='center' className="space-x-4">
                    <Categories/>
                    <SearchInput className='w-[500px]' />
                </NavbarContent>
                <NavbarContent justify='end'>
                    <NavbarItem>
                        <DarkModeSwitch />
                    </NavbarItem>
                    {profile ? (
                        <NavbarItem>
                            <ProfileMenu />
                        </NavbarItem>
                    ) : (
                        <>
                            <NavbarItem className='hidden lg:flex'>
                                <Button
                                    color='primary'
                                    onPress={onSignUpPress}
                                    variant='bordered'
                                    className="mr-2"
                                >
                  Sign Up
                                </Button>
                                <Button color="primary" variant="solid" onPress={onSignInPress}>
                  Sign In
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
        <WrappedNavbar {...props} />
    </NavbarProvider>
)
