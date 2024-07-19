import React, { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react"
import { NavbarContext } from "../NavbarProvider"
import { SignInTab } from "./SignInTab"
import { SignUpTab } from "./SignUpTab"

interface AuthModalProps {
  className?: string;
}

export const AuthModal = (props: AuthModalProps) => {
    const { disclosures, reducer } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onOpenChange, isOpen } = authModalDisclosure

    const [state] = reducer

    const { isSignUp } = state
    
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            className={`${props.className}`}
        >
            <ModalContent>
                <ModalHeader className="p-4 pb-2">
                    {
                        isSignUp ? "Sign Up" : "Sign In"
                    }
                </ModalHeader>
                {isSignUp ? <SignUpTab /> : <SignInTab />}
            </ModalContent>
        </Modal>
    )
}
