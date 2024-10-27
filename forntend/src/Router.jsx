import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Notfound from "./views/Notfound";
import DashBoard from "./views/DashBoard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
 

    { // rotta di default
        path: '/',
        element: <DefaultLayout></DefaultLayout>,
        children : [
            {
                path: '/',
                element: <Navigate to='/users' /> // Utilizza Navigate per il reindirizzamento
            },
            {
                path: '/users',
                element: <Users></Users>
            },
            {
                path: '/dashboard',
                element: <DashBoard></DashBoard>
            },
            {
                path: '/users/new',
                element: <UserForm key='userCreate'></UserForm>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"></UserForm>
            },

      
        ]
    },

    {  // rotta per il guest
        path: '/',
        element: <GuestLayout></GuestLayout>,
        children : [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    },

    { //pagina 404
        path: '*',
        element: <Notfound></Notfound>
    },
]);

export default router;
