import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from '../assets/logo.gif'
import useTeacher from "../hooks/useTeacher";


const TeacherRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isTeacher, isTeacherLoading] = useTeacher();
    const location = useLocation();

    if (loading || isTeacherLoading) {
        return <div className='w-full h-dvh flex items-center justify-center'><img className='w-16 md:w-24' src={logo} alt="" /></div>
    }

    if (user && isTeacher) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default TeacherRoute;