import { useForm } from "react-hook-form";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import FormButton from "../../../components/FormButton/FormButton";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCourse = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const coursePic = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, coursePic, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const courseInfo = {
                name: data.name,
                email: data.email,
                teacherImage: user.photoURL,
                title: data.title,
                courseImage: res.data.data.display_url,
                price: data.price,
                description: data.description,
                status: 'pending'
            }
            // console.log('imgbb :', courseInfo);
            axiosSecure.post('/courses', courseInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        // console.log(res);
                        reset();
                        toast.success('Course added successfully. Please wait for SkillUp response')
                        navigate('/dashboard/teacherCourses');
                    }
                })
        }
    }

    return (

        <div className="w-4/5 mx-auto">
            <Helmet>
                <title>SkillUp | Add Course</title>
            </Helmet>
            <PageHeadline headline="Add Course" text="Become an instructor, add new courses on different categories in which you are a specialist and change lives including your own"></PageHeadline>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 mt-5">

                <label>Full Name</label>
                <input type="text" readOnly defaultValue={user.displayName} {...register("name", { required: true })} name="name" id="" placeholder="Name" className="border border-gray-300 p-2 md:p-3" />
                {errors.name && <span className="text-red-600">Name is required</span>}

                <label>Email address</label>
                <input type="email" defaultValue={`${user.email}`} readOnly {...register("email", { required: true })} name="email" id="" placeholder="Email" className="border border-gray-300 p-2 md:p-3" />
                {errors.email && <span className="text-red-600">Email is required</span>}

                <label>Course Title</label>
                <input type="text"  {...register("title", { required: true })} name="title" id="" placeholder="Title" className="border border-gray-300 p-2 md:p-3" />
                {errors.title && <span className="text-red-600">Course title is required</span>}

                <label>Price</label>
                <input type="number"  {...register("price", { required: true })} name="price" id="" placeholder="Price" className="border border-gray-300 p-2 md:p-3" />
                {errors.price && <span className="text-red-600">Course price is required</span>}

                <label>Course Description</label>
                <textarea {...register("description", { required: true })} placeholder="Write a Short Description" className="textarea textarea-bordered rounded-none textarea-sm w-full" ></textarea>
                {errors.description && <span className="text-red-600">Course description is required</span>}

                {/* upload image */}
                <div>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <label>Upload Course Image</label>
                        </div>
                        <input {...register("image", { required: true })} type="file" className="file-input rounded-none w-full max-w-xs" />
                    </label>
                    {errors.image && <span className="text-red-600">Course Image is required</span>}
                </div>

                <FormButton text="Add Course"></FormButton>
            </form>
        </div>
    );
};

export default AddCourse;