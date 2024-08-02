import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { RootContext } from "./RootProvider"

export const SocketIOContext = createContext<Socket | null>(null)
export const SocketIOProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    useEffect(() => {
        setSocket(io(process.env.NEXT_PUBLIC_SERVER_ENDPOINT_WEBSOCKET ?? ""))
    }, [])

    const { swrs } = useContext(RootContext)!
    const { profileSwr: { data } } = swrs
    const { accountId } = { ...data }

    useEffect(() => {
        if (!socket) return
        if (!accountId) return
        socket.emit("initialize", {
            accountId,
        })
    }, [socket, accountId])

    useEffect(() => {
        if (!socket) return
        socket.on("initialized", (message) => console.log(message))

        return () => {
            socket.removeListener("initialized")
        }
    }, [socket])

    return (
        <SocketIOContext.Provider value={socket}>
            {children}
        </SocketIOContext.Provider>
    )
}
