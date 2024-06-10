import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SharedCard from "../Shared/SharedCard/SharedCard";
import PageHeadline from "../Shared/PageHeadline/PageHeadline";

const AllCourses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: validCourses = [], refetch: validCoursesRefetch } = useQuery({
        queryKey: ['validCourses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courses/valid-courses');
            return res.data;
        }
    })
    console.log(validCourses);
    return (
        <div>
            <PageHeadline headline="All Courses" text="Our diverse range of courses is designed to cater to your personal and professional growth, whether you're looking to develop new skills, advance in your career, or simply explore new interests."></PageHeadline>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-12 w-4/5 mx-auto mt-16">
                {
                    validCourses.map(course => <SharedCard key={course._id} data={course} url={`/all-courses/${course._id}`} ></SharedCard>)
                }
            </div>
        </div>
    );
};

export default AllCourses;