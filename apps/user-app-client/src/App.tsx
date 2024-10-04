import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
// import {StoreProvider} from "@repo/ui/Providers";
import Body from './Components/Body';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { StoreProvider } from '@repo/ui/Providers';
import Notification from './Components/Notification';
function App() {
  const router = createBrowserRouter([
    {
        path:"/",
        element:<Body/>
    },
    {
        path:'/signin',
        element: <Signin/>
    },
    {
        path:'/signup',
        element: <Signup/>
    },
])
  return (
    <div>
      <StoreProvider>
        <Notification/>
        <RouterProvider router={router}/>
      </StoreProvider>
    </div>
  );
}
export default App;