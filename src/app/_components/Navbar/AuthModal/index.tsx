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
import { Key } from "@common"

interface AuthModalProps {
  className?: string;
}

export const AuthModal = (props: AuthModalProps) => {
    const { state, dispatch } = useContext(NavbarContext)!
    const { isAuthModalOpen, isSignUp } = state

    const onOpenChange = () => dispatch({
        type: "SET_IS_AUTH_MODAL_OPEN",
        payload: !isAuthModalOpen
    })
    const onSelectionChange = (key: Key) => dispatch({
        type: "SET_IS_SIGN_UP",
        payload: key === "signUp"
    })
    
    return (
        <Modal
            isOpen={isAuthModalOpen}
            onOpenChange={onOpenChange}
            className={`${props.className}`}
        >
            <ModalContent>
                <ModalHeader className="p-4 pb-2">
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
