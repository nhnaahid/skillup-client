import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import SmallButton from "../../components/SmallButton/SmallButton";
import FormButton from "../../components/FormButton/FormButton";

const Login = () => {
    const { signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSignIn = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                // console.log(result.user);
                toast.success('User Login Successful.');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="my-20 text-sm md:text-base">
            <Helmet>
                <title>SkillUp | Login</title>
            </Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start mx-3 md:mx-20 my-7 gap-7 font-inter">
                <div className="w-full md:w-2/5 border border-gray-300 p-3 md:p-5 space-y-1">
                    <h2 className="font-merri font-semibold text-xl">New User</h2>
                    <p className="text-gray-700">Sign Up</p>
                    <p className="text-sm">By creating an account you will be able to enroll courses, up to date with new courses and latest offers.</p>
                    <div className="w-2/5 md:w-1/2 lg:w-2/5 mx-auto">
                        <Link to="/signup"><SmallButton name="Sign Up"></SmallButton></Link>
                    </div>
                </div>
                <div className="w-full md:w-3/5 border border-gray-300 p-2 md:p-4 space-y-3">
                    <h2 className="font-merri font-semibold text-xl">Returning User</h2>
                    <form onSubmit={handleSignIn} className="flex flex-col space-y-1 pt-1">
                        <label>Your email address</label>
                        <input type="email" name="email" id="" placeholder="Email" className="border border-gray-300 p-2 md:p-3" />
                        <div>
                            <label>Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'password' : 'text'} name='password' placeholder="Password" className="border border-gray-300 p-2 md:p-3 w-full" required />
                                <div onClick={() => setShowPassword(!showPassword)} className='absolute bottom-3 md:bottom-4 right-3 text-lg'>
                                    {
                                        showPassword ? <FaRegEye></FaRegEye> : <FaRegEyeSlash></FaRegEyeSlash>
                                    }
                                </div>
                            </div>
                        </div>
                        <Link><p className="mt-2">Forget Password</p></Link>
                        <FormButton text="Sign In"></FormButton>
                        <SocialLogin name="Sign In"></SocialLogin>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;