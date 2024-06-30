import { useEffect } from "react"
import { AccountRole } from "@common"
import { useRouter } from "next/navigation"

export const useAuthorization = (allowedAccountRoles: Array<AccountRole> = [AccountRole.Account], accountRole?: AccountRole) => {
    const router = useRouter()
    useEffect(() => {
        if (!accountRole) return
        const isAuthorized = allowedAccountRoles.includes(accountRole)
        if (!isAuthorized) {
            router.push("/")
        }
    }, [accountRole])
}