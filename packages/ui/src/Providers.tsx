"use client"
import { Provider } from "@repo/store/react-redux";
import appStore from "@repo/store/store";
import { SessionProvider } from "next-auth/react";
export const StoreProvider = ({children}:{children:React.ReactNode}) => {
    return <Provider store={appStore}>
        <SessionProvider>
        {children}
        </SessionProvider>
    </Provider>
}