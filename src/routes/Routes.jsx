import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AllCourses from "../pages/AllCourses/AllCourses";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import StudentProfile from "../pages/Dashboard/StudentProfile/StudentProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import TeacherProfile from "../pages/Dashboard/TeacherProfile/TeacherProfile";
import PrivateRoute from "./PrivateRoute";
import TeacherRoute from "./TeacherRoute";
import AdminRoute from "./AdminRoute";


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
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // student routes
            {
                path: 'studentProfile',
                element: <StudentProfile></StudentProfile>
            },

            // teacher routes
            {
                path: 'teacherProfile',
                element: <TeacherRoute><TeacherProfile></TeacherProfile></TeacherRoute>
            },

            // admin routes
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            }

        ]
    }
]);

export default router;