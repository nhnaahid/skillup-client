import { NavLink, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import NavBar from "../pages/Shared/NavBar/NavBar";
import useTeacher from "../hooks/useTeacher";
import useAuth from "../hooks/useAuth";
import Footer from "../pages/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
    const location = useLocation();
    let isHome;
    if (location.pathname === '/') {
        isHome = true;
    }
    else {
        isHome = false;
    }
    const { user } = useAuth();
    const [isTeacher] = useTeacher();
    const [isAdmin] = useAdmin();

    return (
        <div className="bg-base-200">
            <div className={`${isHome ? '' : 'h-[56px] md:h-[80px]'}`}>
                <NavBar isHome={isHome}></NavBar>
            </div>
            <div className="flex gap-3 md:gap-5">
                {/* dashboard side bar */}
                <div className="w-28 md:w-48 bg-white text-black font-semibold h-screen">
                    <ul className="menu p-4">
                        {
                            user && !isAdmin && !isTeacher && <>
                                <li>
                                    <NavLink to="/dashboard/studentProfile">
                                        Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/studentCourses">
                                        My Courses</NavLink>
                                </li>
                            </>
                        }
                        {
                            user && isTeacher && <>
                                <li>
                                    <NavLink to="/dashboard/teacherProfile">
                                        Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/teacherCourses">
                                        My Courses</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myRequests">
                                        My Requests</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addCourse">
                                        Add Course</NavLink>
                                </li>
                            </>
                        }
                        {
                            user && isAdmin && <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                        Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/teacherRequests">
                                        Teacher Requests</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allCourses">
                                        All Courses</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers">
                                        All Users</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>

                {/* dashboard content */}
                <div className="flex-1 overflow-x-auto bg-white h-fit pb-5">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Dashboard;