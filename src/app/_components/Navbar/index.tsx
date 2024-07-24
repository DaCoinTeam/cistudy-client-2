"use client"
import {
    Button,
    Link,
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
                        <span className='text-secondary'>Study</span>
                    </div>
                </NavbarBrand>
                <NavbarContent justify='center' className="space-x-4">
                    {/* <Link className="font-medium text-base leading-8 text-gray-700 hover:text-primary cursor-pointer" onPress={handleCoursesPress}>  
                        Courses
                    </Link> */}
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
                                <Link as='button' onPress={onSignInPress}>
                  Sign In
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button
                                    color='secondary'
                                    onPress={onSignUpPress}
                                    variant='flat'
                                >
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
        <WrappedNavbar {...props} />
    </NavbarProvider>
)
