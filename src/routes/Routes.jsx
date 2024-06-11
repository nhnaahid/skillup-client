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
import AddCourse from "../pages/Dashboard/AddCourse/AddCourse";
import TeachOn from "../pages/TeachOn/TeachOn";
import TeacherRequest from "../pages/Dashboard/TeacherRequest/TeacherRequest";
import TeacherCourses from "../pages/Dashboard/TeacherCourses/TeacherCourses";
import TotalCourses from "../pages/Dashboard/TotalCourses/TotalCourses";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Payment from "../pages/Payment/Payment";
import MyEnrolls from "../pages/Dashboard/MyEnrolls/MyEnrolls";
import EnrollClassDetails from "../pages/Dashboard/EnrollClassDetails/EnrollClassDetails";



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
            },
            {
                path: '/teach',
                element: <PrivateRoute><TeachOn></TeachOn></PrivateRoute>
            },
            {
                path: '/all-courses/:id',
                element: <PrivateRoute><CourseDetails></CourseDetails></PrivateRoute>,
                // loader: ({ params }) => fetch(`http://localhost:5000/courses/valid-courses/${params.id}`)
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
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
            {
                path: 'my-enrolls',
                element: <MyEnrolls></MyEnrolls>
            },
            {
                path: 'my-enrolls/:id',
                element: <EnrollClassDetails></EnrollClassDetails>
            },

            // teacher routes
            {
                path: 'teacherProfile',
                element: <TeacherRoute><TeacherProfile></TeacherProfile></TeacherRoute>
            },
            {
                path: 'addCourse',
                element: <TeacherRoute><AddCourse></AddCourse></TeacherRoute>
            },
            {
                path: 'teacherCourses',
                element: <TeacherRoute><TeacherCourses></TeacherCourses></TeacherRoute>
            },

            // admin routes
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'teacherRequests',
                element: <AdminRoute><TeacherRequest></TeacherRequest></AdminRoute>
            },
            {
                path: 'allCourses',
                element: <AdminRoute><TotalCourses></TotalCourses></AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            }
        ]
    }
]);

export default router;