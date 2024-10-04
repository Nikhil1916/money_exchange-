import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
// import {StoreProvider} from "@repo/ui/Providers";
import Body from './Components/Body';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
function App() {
  const router = createBrowserRouter([
    {
        path:"/",
        element:<Body/>
    },
    {
        path:'/Signin',
        element: <Signin/>
    },
    {
        path:'/Signup',
        element: <Signup/>
    },
])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}
export default App;