import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTeacherRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: teacherRequests = [], refetch: teacherRequestsRefetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacherRequests');
            return res.data;
        }
    })

    return [teacherRequests, teacherRequestsRefetch];
};

export default useTeacherRequest;