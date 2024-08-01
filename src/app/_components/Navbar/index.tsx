"use client"
import {
    Badge,
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
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { Notifications } from "./Notifications"

interface NavbarProps {
  className?: string;
}

const WrappedNavbar = (props: NavbarProps) => {
    const { className } = props
    const { disclosures, reducer } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onOpen } = authModalDisclosure
    const [, dispatch] = reducer
    const { swrs, reducer: rootContextReducer } = useContext(RootContext)!
    const [,rootReducerDispatch] = rootContextReducer

    const { profileSwr } = swrs
    const { data: profile } = profileSwr
    const {cart} = { ...profile }
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
    const handleCoursesPress = () => {
        rootReducerDispatch({type: "RESET_CATEGORY_FILTER"})
        router.push("/courses")
    }

    const handleCartPress = () => {
        router.push("/cart")
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
                        <span className='text-lg  text-blue-400'>Ci</span>
                        <span className='text-lg text-primary '>Study</span>
                    </div>
                </NavbarBrand>
                <NavbarContent justify='start' className="space-x-6 -ml-32">
                    <Link className="font-medium text-base leading-8 text-gray-700 dark:text-gray-200 hover:text-primary cursor-pointer" onPress={handleCoursesPress}>Courses</Link>
                    <Categories/>
                    <SearchInput className='w-[500px]' />
                </NavbarContent>
                <NavbarContent justify='end'>
                    {profile?.accountId ? (<NavbarItem className="mr-2 justify-center">
                        <Button isIconOnly variant="light" className="p-6" onPress={handleCartPress}>
                            {cart && cart?.cartCourses?.length > 0 ? (
                                <Badge color="danger" content={cart?.cartCourses?.length}  shape="circle">
                                    <ShoppingCartIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                                </Badge>
                            ) : (
                                <ShoppingCartIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                            )}
                            
                        </Button>
                    </NavbarItem>) : (<NavbarItem></NavbarItem>)}
                    {profile && profile?.accountId ? (
                        <NavbarItem className="mr-2 justify-center">
                            <Notifications/>
                        </NavbarItem>
                    ) : (
                        <NavbarItem></NavbarItem>
                    ) }
                    <NavbarItem>
                        <DarkModeSwitch />
                    </NavbarItem>
                    {profile && profile ? (
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
