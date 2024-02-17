import {
    createBrowserRouter,

} from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/SIgnup/Signup";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Secret/Secret";
import Dashboard from "../Root/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },

            {
                path: '/secret',
                element: <PrivateRoute><Secret /></PrivateRoute>
            },
        ],


    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <Dashboard /></PrivateRoute>,
        children: [

            //normal user routes
            {
                path: "userHome",
                element: <UserHome />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "payment",
                element: <Payment />
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory />
            },


            // admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItem /></AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute>
                    <UpdateItem />
                </AdminRoute>,
                loader: ({ params }) => fetch(`https://bistro-boss-server-chi-tawny.vercel.app/menu/${params.id}`)
            },
            {
                path: 'manageItems',
                element: <AdminRoute>
                    <ManageItems />
                </AdminRoute>
            },
            {
                path: "users",
                element: <AdminRoute><AllUsers /></AdminRoute>
            }





        ]
    }

]);

export default Routes;
/**
 * 1. do not show the link to those user who should not see the link
 * 2. even if they gets the link, do not allow them to visit the link
 * 3. do not allow user to access the api. check admin in the server as well
 * (verifyAdmin)
*/