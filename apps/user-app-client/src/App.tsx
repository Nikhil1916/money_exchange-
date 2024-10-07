import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
// import Body from './Components/Body';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { StoreProvider } from '@repo/ui/Providers';
import Notification from './Components/Notification';
import Dashboard from './Components/Dashboard';
import Transfer from './Components/Transfer';
import Transactions from './Components/Transactions';
import BankUI from './Components/BankUI';
import { lazy, Suspense } from 'react';
function App() {
  const Body = lazy(()=> import("./Components/Body"));
  const router = createBrowserRouter([
    {
        path:"/",
        element:<Suspense><Body/></Suspense>,
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
            path:"/view-transactions",
            element:<Transactions/>
          },
          {
            path:"/transfer",
            element:<Transfer/>
          }, 
          {
            path: "/transaction/bank",
            element: <BankUI/>
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