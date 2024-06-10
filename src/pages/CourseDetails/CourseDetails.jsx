import { FaUsers } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import SmallButton from "../../components/SmallButton/SmallButton";

const CourseDetails = () => {
    const course = useLoaderData();
    const { name, email, teacherImage, title, courseImage, price, description } = course;
    return (
        <div className="mb-20 font-inter">
            <h1 className="w-full md:w-4/5 mx-auto border-b border-gray-300 tracking-wide text-2xl p-2 mt-5">Course Details</h1>
            <div className="w-full md:w-4/5 mx-auto mt-5 flex flex-col md:flex-row gap-7">
                <figure className="w-full md:w-2/5 h-[500px] bg-white p-3">
                    <img className="w-full h-full object-cover" src={courseImage} alt="" />
                </figure>
                <div className="w-full md:w-3/5 h-fit bg-white p-3">
                    <h1 className="text-2xl font-semibold border-b pb-1 font-merri">{title}</h1>
                    <div className="flex gap-5 p-2 text-lg font-semibold">
                        <p className="border-r pr-5">$ {price}</p>
                        <div className="flex gap-1 items-center justify-center">
                            <div className="text-xl">
                                <FaUsers />
                            </div>
                            <p>(0)</p>
                        </div>
                    </div>
                    <div className="space-y-2 my-2">
                        <div className="flex gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-10 h-12">
                                    <img src={teacherImage} alt="Craft item image" />
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold">{name}</p>
                                <p className="text-gray-600 text-sm">{email}</p>
                            </div>
                        </div>
                        <p><span className="font-bold">Description:</span> {description}</p>
                    </div>
                    <div className="flex gap-5 mb-3">
                        <Link to=""><SmallButton name="Add To Cart"></SmallButton></Link>
                        <Link to=""><SmallButton name="Buy Now"></SmallButton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;