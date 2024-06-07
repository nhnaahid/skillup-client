import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import SocialButton from "../../../components/SocialButton/SocialButton";


const SocialLogin = ({ name }) => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photo: result.user?.photoURL,
                    role: 'student'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            toast.success('User Registration Successful.');
                            navigate(from, { replace: true });
                        }
                        else {
                            toast.success('User Login Successful.');
                            navigate(from, { replace: true });
                        }
                    })
            })
    }

    return (
        <div className='space-y-3 pt-5'>
            <p className='text-center font-bold'>{name} With</p>
            <div className='flex items-center justify-center gap-2'>
                <div onClick={handleGoogleSignIn}>
                    <SocialButton logo={<FaGoogle></FaGoogle>}></SocialButton>
                </div>
                <div>
                    <SocialButton logo={<FaFacebookF></FaFacebookF>}></SocialButton>
                </div>
                <div>
                    <SocialButton logo={<FaGithub></FaGithub>}></SocialButton>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;