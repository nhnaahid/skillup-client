import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import FormButton from "../../../components/FormButton/FormButton";
import { useQuery } from "@tanstack/react-query";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCourse = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: updateCourse = [], refetch: updateCourseRefetch } = useQuery({
        queryKey: ['updateCourse', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/courses/update/${id}`);
            return res.data;
        }
    })
    console.log('image Url: ', updateCourse.courseImage);
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const title = form.title.value;
        const price = form.price.value;
        const description = form.description.value;
        const image = form.image.value;
        const courseInfo = {
            name,
            email,
            title,
            courseImage: image,
            price,
            description
        }
        console.log(courseInfo);

        axiosSecure.patch(`/courses/update/${id}`, courseInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    console.log(res);
                    updateCourseRefetch();
                    toast.success('Course Updated.')
                    navigate('/dashboard/teacherCourses');
                }
            })
    }


    return (
        <div className="w-4/5 mx-auto">
            <PageHeadline headline="Update Course" text="Update your course outline. Stay current with the latest educational trends and continue your growth."></PageHeadline>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mt-5">

                <label>Full Name</label>
                <input type="text" defaultValue={user.displayName} name="name" id="" placeholder="Name" className="border border-gray-300 p-2 md:p-3" />
                {/* {errors.name && <span className="text-red-600">Name is required</span>} */}

                <label>Email address</label>
                <input type="email" defaultValue={`${user.email}`} name="email" id="" placeholder="Email" className="border border-gray-300 p-2 md:p-3" />
                {/* {errors.email && <span className="text-red-600">Email is required</span>} */}

                <label>Course Title</label>
                <input type="text" defaultValue={updateCourse.title} name="title" id="" placeholder="Title" className="border border-gray-300 p-2 md:p-3" />
                {/* {errors.title && <span className="text-red-600">Course title is required</span>} */}

                <label>Course Image</label>
                <input type="text" defaultValue={updateCourse.courseImage} name="image" id="" placeholder="Image URL" className="border border-gray-300 p-2 md:p-3" />
                {/* {errors.price && <span className="text-red-600">Course price is required</span>} */}


                <label>Price</label>
                <input type="number" defaultValue={updateCourse.price} name="price" id="" placeholder="Price" className="border border-gray-300 p-2 md:p-3" />
                {/* {errors.price && <span className="text-red-600">Course price is required</span>} */}

                <label>Course Description</label>
                <textarea defaultValue={updateCourse.description} name="description" placeholder="Write a Short Description" className="textarea textarea-bordered rounded-none textarea-sm w-full" ></textarea>
                {/* {errors.description && <span className="text-red-600">Course description is required</span>} */}

                <FormButton text="Update Course"></FormButton>
            </form>
        </div>
    );
};

export default UpdateCourse;