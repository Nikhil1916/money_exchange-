import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from "./Signin";
const Body = () => {
    const router = createBrowserRouter([
        {
            path:'/Signin',
            element: <Signin/>
        }
    ])
    return(
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default Body;
