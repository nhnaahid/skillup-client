import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import FormButton from "../../components/FormButton/FormButton";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const profilePic = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, profilePic, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const userInfo = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: 'student',
                photoURL: res.data.data.display_url
            }
            // console.log('imgbb :', userInfo);
            createUser(data.email, data.password)
                .then(result => {
                    const loggedUser = result.user;
                    console.log('user from sign up: ', loggedUser);
                    updateUserProfile(data.name, data.email, userInfo.photoURL)
                        .then(() => {
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        reset();
                                        toast.success('User Registration Successful.');
                                        navigate('/');
                                    }
                                })
                        })
                        .catch(error => toast.error(error.message));
                })
        }
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

                    <label>Phone Number</label>
                    <input type="text" {...register("phone", { required: true })} id="" placeholder="Phone Number" className="border border-gray-300 p-2 md:p-3" />
                    {errors.phone && <span className="text-red-600">Phone Number is required</span>}

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

                    {/* upload image */}
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <label>Upload Profile Picture</label>
                            </div>
                            <input {...register("image", { required: true })} type="file" className="file-input rounded-none w-full max-w-xs" />
                        </label>
                        {errors.image && <span className="text-red-600">Profile Picture is required</span>}
                    </div>

                    {/* <div className="flex gap-2 items-center">
                        <input type="checkbox" name="checkbox" id="" />
                        <p>I have read and agree to the <Link className="font-bold text-blue-500">Privacy Policy</Link></p>
                    </div> */}
                    <FormButton text="Sign Up"></FormButton>
                    <SocialLogin name="Sign Up"></SocialLogin>
                </form>
            </div>
        </div>
    );
};

export default SignUp;