import Signin from "./Signin";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from "./Signup";
import Dashboard from "./Dashboard";
const Body = () => {
    const router = createBrowserRouter([
        {
            path:'/Signin',
            element: <Signin/>
        },
        {
            path:'/Signup',
            element: <Signup/>
        },
        {
            path:"/",
            element:<Dashboard/>
        }
    ])
    return(
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}
export default Body;