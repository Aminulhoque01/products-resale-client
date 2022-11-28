import { createBrowserRouter } from "react-router-dom";
import Blogs from "../Components/Blogs/Blogs";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import DashboardLayout from "../layout/Dashboardlayout/DashboardLayout";
import Main from "../layout/Main/Main";
import AddProducts from "../pages/Dashboard/AddProducts/AddProducts";
import AllUser from "../pages/Dashboard/Alluser/AllUser";
import Payment from "../pages/Dashboard/Dashboard/Payment/Payment";
import SellerProduct from "../pages/Dashboard/Dashboard/SellerProduct/SellerProduct";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import SingleCategory from "../pages/singleCategory/SingleCategory";

import ErrorPage from "../sheared/ErrorPage/ErrorPage";
import PrivetRout from "./PrivetRout/PrivetRout";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blogs></Blogs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },

            {
                path: '/single_category/:id',
                element: <PrivetRout><SingleCategory></SingleCategory></PrivetRout>,
                loader: ({ params }) => fetch(`http://localhost:5000/product-categories/${params.id}`)
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivetRout><DashboardLayout></DashboardLayout></PrivetRout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/dashboard',
                element:<MyOrders></MyOrders>
            },
            {
                path:'/dashboard/my-products',
                element:<AddProducts></AddProducts>
            },
            {
                path:'/dashboard/my_sell_products',
                element:<SellerProduct></SellerProduct>
            },
            {
                path:'/dashboard/all-user',
                element:<AllUser></AllUser>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=> fetch(`http://localhost:5000/bookings/${params.id}`)
            },
        ]
    }
])