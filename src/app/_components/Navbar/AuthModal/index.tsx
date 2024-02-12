import React, { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    Tabs,
    Tab,
} from "@nextui-org/react"
import { NavbarContext } from "../NavbarProviders"
import { SignInTab } from "./SignInTab"
import { SignUpTab } from "./SignUpTab"

interface IAuthModalProps {
  className?: string;
}

type Key = "signIn" | "signUp";

export const AuthModal = (props: IAuthModalProps) => {
    const { isSignUpState, isAuthModalOpenState } = useContext(NavbarContext)!
    const { isSignUp, setIsSignUp } = isSignUpState
    const { isAuthModalOpen, setIsAuthModalOpen } = isAuthModalOpenState

    const onOpenChange = () => setIsAuthModalOpen(!isAuthModalOpen)
    const onSelectionChange = (key: string | number) => {
        const _key = key as Key
        setIsSignUp(_key === "signUp")
    }
    return (
        <Modal
            isOpen={isAuthModalOpen}
            onOpenChange={onOpenChange}
            className={`${props.className}`}
        >
            <ModalContent>
                <ModalHeader className="p-6 pb-0">
                    <Tabs
                        selectedKey={isSignUp ? "signUp" : "signIn"}
                        onSelectionChange={onSelectionChange}
                        variant="underlined"
                        size="lg"
                    >
                        <Tab key="signIn" title="Sign In" />
                        <Tab key="signUp" title="Sign Up" />
                    </Tabs>
                </ModalHeader>
                {isSignUp ? <SignUpTab /> : <SignInTab />}
            </ModalContent>
        </Modal>
    )
}
