import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.email, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoURL,
                            role: 'student'
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    toast.success('User Registration Successful.');
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <div className="my-16">
            <div className="w-4/5 md:w-3/5 mx-auto mt-5">
                <p className="font-semibold mb-5">If you already have an account, please sign in at the <Link to="/signin"><span className="text-blue-500 font-bold">sign in page.</span></Link></p>
                <h1 className="border-b border-gray-300 font-merri tracking-wide text-2xl py-2">Your Personal Details</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 mt-5">

                    <label>Your Full Name</label>
                    <input type="text" {...register("name", { required: true })} name="name" id="" placeholder="Name" className="border border-gray-300 p-2 md:p-3" />
                    {errors.name && <span className="text-red-600">Name is required</span>}

                    <label>Your email address</label>
                    <input type="email" {...register("email", { required: true })} name="email" id="" placeholder="Email" className="border border-gray-300 p-2 md:p-3" />
                    {errors.email && <span className="text-red-600">Email is required</span>}

                    <label>Photo URL</label>
                    <input type="text" {...register("photoURL", { required: true })} id="" placeholder="Photo url" className="border border-gray-300 p-2 md:p-3" />
                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}


                    <div>
                        <label>Password</label>
                        <div>
                            <div className="relative">
                                <input type={showPassword ? 'password' : 'text'} {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 15,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} name='password' placeholder="Password" className="border border-gray-300 p-2 md:p-3 w-full" />
                                <div onClick={() => setShowPassword(!showPassword)} className='absolute bottom-3 md:bottom-4 right-3 text-lg'>
                                    {
                                        showPassword ? <FaRegEye></FaRegEye> : <FaRegEyeSlash></FaRegEyeSlash>
                                    }
                                </div>
                            </div>
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must have at least 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must have less than or equal 15 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have a Uppercase, lower case, number and special character.</p>}
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="checkbox" id="" />
                        <p>I have read and agree to the <Link className="font-bold text-blue-500">Privacy Policy</Link></p>
                    </div>
                    <input type="submit" value="Sign Up" className="w-full btn btn-sm md:btn-md btn-outline bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700" />
                    <SocialLogin name="Sign Up"></SocialLogin>
                </form>
            </div>
        </div>
    );
};

export default SignUp;