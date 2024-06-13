import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import SharedCard from "../../Shared/SharedCard/SharedCard";

const Popular = () => {
    const axiosPublic = useAxiosPublic();
    const { data: courses = [] } = useQuery({
        queryKey: ['popular'],
        queryFn: async () => {
            const res = await axiosPublic.get('/enrolls/aggregate');
            return res.data;
        }
    })
    console.log(courses);

    return (
        <div className="mt-24">
            <PageHeadline headline="Popular Courses" text="Explore our most sought-after courses designed to elevate your skills and knowledge. Whether you're looking to advance your career or expand your expertise, we have something for everyone."></PageHeadline>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-12 w-4/5 mx-auto mt-16">
                {
                    courses.slice(0, 6).map(course => <SharedCard key={course._id} data={course} btnText="Enroll Now" url={`/all-courses/${course._id}`} ></SharedCard>)
                }
            </div>

        </div>
    );
};

export default Popular;