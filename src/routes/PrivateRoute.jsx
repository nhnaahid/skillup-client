import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from '../assets/logo.gif'


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <div className='w-full h-dvh flex items-center justify-center'><img className='w-16 md:w-24' src={logo} alt="" /></div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/signin" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;