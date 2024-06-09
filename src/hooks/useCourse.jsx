import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCourse = () => {
    const axiosSecure = useAxiosSecure();
    const { data: courses = [], refetch: courseRefetch } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courses');
            return res.data;
        }
    })

    return [courses, courseRefetch];
};

export default useCourse;