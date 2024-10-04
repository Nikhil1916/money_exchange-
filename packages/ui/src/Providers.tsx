import { Provider } from "@repo/store/react-redux";
import appStore from "@repo/store/store";
export const StoreProvider = ({children}:{children:React.ReactNode}) => {
    return <Provider store={appStore}>
        {children}
    </Provider>
}