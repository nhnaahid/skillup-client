import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import useTeacher from "../../hooks/useTeacher";
import useAdmin from "../../hooks/useAdmin";

const TeachOn = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isPending, setIsPending] = useState(false);
    const [isTeacher] = useTeacher();
    const [isAdmin] = useAdmin();
    axiosSecure.get(`/teacherRequests/${user.email}`)
        .then(res => {
            const requestList = res.data;
            const result = requestList.some(request => request.status === 'pending')
            setIsPending(result);
        })
    // console.log(user);
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        // console.log(data);
        const teacherInfo = {
            name: data.name,
            image: data.image,
            email: data.email,
            title: data.title,
            experience: data.experience,
            category: data.category,
            status: 'pending'
        }
        // console.log(teacherInfo);
        const resTeacher = await axiosSecure.post('/teacherRequests', teacherInfo);
        console.log('response on teacher request: ', resTeacher);
        if (resTeacher.data.insertedId) {
            reset();
            toast.success('Teacher Request Send Successfully');
        }
    }
    return (
        <div className="my-16">
            <div className="w-4/5 md:w-3/5 mx-auto mt-5 ">
                <h1 className="border-b border-gray-300 font-merri tracking-wide text-2xl py-2">Teacher Info</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 mt-5">

                    <label>Full Name</label>
                    <input type="text" defaultValue={user.displayName} {...register("name", { required: true })} name="name" id="" placeholder="Name" className="border border-gray-300 p-2 md:p-3" />
                    {errors.name && <span className="text-red-600">Name is required</span>}

                    <label>Email address</label>
                    <input type="email" defaultValue={`${user.email}`} readOnly {...register("email", { required: true })} name="email" id="" placeholder="Email" className="border border-gray-300 p-2 md:p-3" />
                    {errors.email && <span className="text-red-600">Email is required</span>}

                    <label>Image</label>
                    <input type="text" defaultValue={`${user.photoURL}`} {...register("image", { required: true })} id="" placeholder="Image Url" className="border border-gray-300 p-2 md:p-3" />
                    {errors.image && <span className="text-red-600">Image is required</span>}

                    <label>Title</label>
                    <input type="text"  {...register("title", { required: true })} name="title" id="" placeholder="Title" className="border border-gray-300 p-2 md:p-3" />
                    {errors.title && <span className="text-red-600">Title is required</span>}

                    <div className="flex justify-between items-center gap-7">
                        <div className="w-1/2">
                            <div className="flex flex-col space-y-2">
                                <label>Experience</label>
                                <Controller
                                    name="experience"
                                    control={control}
                                    rules={{ required: "Please select an option" }}
                                    render={({ field }) => (
                                        <select {...field} defaultValue="default" className="select select-bordered w-full rounded-none">
                                            <option disabled value="default">Experience Level</option>
                                            <option>Beginner</option>
                                            <option>Mid Level</option>
                                            <option>Experienced</option>
                                        </select>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex flex-col space-y-2">
                                <label>Category</label>
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{ required: "Please select an option" }}
                                    render={({ field }) => (
                                        <select {...field} defaultValue="default" className="select select-bordered w-full rounded-none">
                                            <option disabled value="default">Course Category</option>
                                            <option>Web Development</option>
                                            <option>Digital Marketing</option>
                                            <option>Photography & Video</option>
                                            <option>Data Science</option>
                                            <option>App Development</option>
                                        </select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        {errors.experience ? <p className="text-start text-red-600">{errors.experience.message}</p> : <p></p>}
                        {errors.category ? <p className="text-end text-red-600">{errors.category.message}</p> : <p></p>}
                    </div>
                    {/* <FormButton text="Submit"></FormButton> */}
                    {
                        isPending && <p className="text-red-600">* Your previous request is still pending. Please wait for SkillUp response. We will inform you soon.</p>
                    }
                    {
                        isTeacher && <p className="text-red-600">* You are already a registered SkillUp Teacher</p>
                    }
                    {
                        isAdmin && <p className="text-red-600">* Admin cannot be a teacher</p>
                    }
                    <div className="pt-3">
                        <input type="submit" value="Submit" disabled={isPending || isTeacher || isAdmin} className="w-full btn btn-sm md:btn-md btn-outline bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeachOn;