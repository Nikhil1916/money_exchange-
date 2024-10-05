import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
// import {StoreProvider} from "@repo/ui/Providers";
import Body from './Components/Body';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { StoreProvider } from '@repo/ui/Providers';
import Notification from './Components/Notification';
import Dashboard from './Components/Dashboard';
import Transactions from './Components/Transactions';
import Transfer from './Components/Transfer';
function App() {
  const router = createBrowserRouter([
    {
        path:"/",
        element:<Body/>,
        children:[
          {
            path:"/",
            element:<Dashboard/>
          },
          {
            path:'/dashboard',
            element:<Dashboard/>
          },
          {
            path:"/transactions",
            element:<Transactions/>
          },
          {
            path:"/transfer",
            element:<Transfer/>
          }
        ]
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