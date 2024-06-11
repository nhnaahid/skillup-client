import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCourse = (id) => {
    console.log('from useCourse id: ', id);
    const axiosSecure = useAxiosSecure();
    const { data: oneCourse = [], refetch: oneCourseRefetch } = useQuery({
        queryKey: ['oneCourse', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/courses/valid-courses/${id}`);
            return res.data;
        }
    })

    return [oneCourse, oneCourseRefetch]
};

export default useCourse;