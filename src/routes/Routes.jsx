import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AllCourses from "../pages/AllCourses/AllCourses";
import SignIn from "../pages/SignIn/SignIn";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/all-courses',
                element: <AllCourses></AllCourses>
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            }
        ]
    },
]);

export default router;