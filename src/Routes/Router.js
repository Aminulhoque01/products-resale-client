import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import DashboardLayout from "../layout/Dashboardlayout/DashboardLayout";
import Main from "../layout/Main/Main";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
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
        children:[
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            }
        ]
    }
])