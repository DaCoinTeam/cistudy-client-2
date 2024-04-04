import { useEffect } from "react"
import { UserRole } from "@common"
import { useRouter } from "next/navigation"

export const useAuthorization = (allowedUserRoles: Array<UserRole> = [UserRole.User], userRole?: UserRole) => {
    const router = useRouter()
    useEffect(() => {
        if (!userRole) return
        const isAuthorized = allowedUserRoles.includes(userRole)
        console.log(isAuthorized)
        if (!isAuthorized) {
            router.push("/")
        }
        //continue proccess
    }, [userRole])
}