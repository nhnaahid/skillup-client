import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
            <h1>All Courses: {validCourses.length}</h1>
            <h1>All courses</h1>
            <h1>All courses</h1>
            <h1>All courses</h1>
            <h1>All courses</h1>
            <h1>All courses</h1>
        </div>
    );
};

export default AllCourses;