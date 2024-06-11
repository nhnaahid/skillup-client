import { FaUsers } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import SmallButton from "../../components/SmallButton/SmallButton";
import useCourse from "../../hooks/useCourse";

const CourseDetails = () => {
    // const course = useLoaderData();
    const { id } = useParams();
    const [oneCourse] = useCourse(id);

    const { name, email, teacherImage, title, courseImage, price, description } = oneCourse;

    return (
        <div className="mb-20 mt-16 font-inter px-2">
            <div className="w-full flex flex-col md:flex-row gap-3 md:gap-7">
                <figure className="w-full h-full md:h-[360px] md:w-2/5 bg-white p-3">
                    <img className="w-full h-full object-contain md:object-cover" src={courseImage} alt="" />
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
                        <Link to={`/payment/${id}`}><SmallButton name="Buy Now"></SmallButton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;