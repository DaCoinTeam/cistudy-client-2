"use client"
import {
    Badge,
    Button,
    Link,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
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
                <NavbarContent className="lg:hidden"  >
                    <NavbarMenuToggle className="pr-6 " />
                    <NavbarItem  className="hidden md:flex lg:hidden">
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
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="center" className="hidden md:flex lg:hidden">
                    <NavbarItem>
                        
                    </NavbarItem>
                    <NavbarItem>
                        <SearchInput className='md:w-[320px] lg:w-[380px] xl:w-[500px]' />
                    </NavbarItem>
                   
                </NavbarContent>
                <NavbarContent justify="center" className="flex md:hidden">
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
                </NavbarContent>
                
                <NavbarContent justify="start" className="hidden lg:flex w-full gap-6">
                    <NavbarItem >
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
                    </NavbarItem>
                    <NavbarContent justify="center" className="grow gap-4 xl:gap-6" >
                        <NavbarItem>
                            <Link className=" font-medium text-base leading-8 text-gray-700 dark:text-gray-200 hover:text-primary cursor-pointer" onPress={handleCoursesPress}>Courses</Link>
                        </NavbarItem>
                        <NavbarItem className="h-full">
                            <Categories/>
                        </NavbarItem>
                        <NavbarItem>
                            <SearchInput className='md:w-[320px] lg:w-[380px] xl:w-[500px]' />
                        </NavbarItem>
                    </NavbarContent>
                    
                </NavbarContent>


                <NavbarContent justify='end' className="gap-4 lg:gap-6 flex min-w-40" style={{flexGrow: 0}}>
                    <NavbarItem className="hidden md:flex">
                        {profile && profile?.accountId ? (
                            cart && cart?.cartCourses?.length > 0 ? (
                                <Link onPress={handleCartPress} className="cursor-pointer items-center flex hover:bg-foreground-400/20 p-2 rounded-full" role="button">
                                    <Badge content={cart?.cartCourses?.length} shape="circle" color="danger">
                                        <ShoppingCartIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                                    </Badge>
                                </Link>
                                
                            ) : (
                                <Link onPress={handleCartPress} className="cursor-pointer items-center flex hover:bg-foreground-400/20 p-2 rounded-full" role="button">
                                    <ShoppingCartIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                                </Link>
                            
                            )
                        ) : (<></>)}
                    </NavbarItem>
                    <NavbarItem className="hidden md:flex">
                        {profile && profile?.accountId ? (
                            <Notifications/>
                        ) : (<></>)
                        }
                    </NavbarItem>
                    <NavbarItem className="hidden lg:flex">
                        <DarkModeSwitch />
                    </NavbarItem>

                    <NavbarItem>
                        {profile && profile ? (                            
                            <ProfileMenu />

                        ) : (
                            <>
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
                            </>
                        )}
                    </NavbarItem>
                </NavbarContent>
                
                <NavbarMenu>
                    <NavbarMenuItem>
                        <Link className="text-lg font-medium leading-8 text-gray-700 dark:text-gray-200 hover:text-primary cursor-pointer" onPress={handleCoursesPress}>Courses</Link>
                    </NavbarMenuItem>
                    <NavbarItem className="flex md:hidden">
                        <Link className="text-lg font-medium leading-8 text-gray-700 dark:text-gray-200 hover:text-primary cursor-pointer" onPress={handleCartPress}>Go to cart</Link>
                    </NavbarItem>
                    <NavbarItem >
                        <DarkModeSwitch />
                    </NavbarItem>
                </NavbarMenu>
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
