import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useEnrolls = (id) => {
    const axiosPublic = useAxiosPublic();
    const { data: totalEnrolls = [], refetch: totalEnrollsRefetch } = useQuery({
        queryKey: ['totalEnroll', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/enrolls/course/${id}`);
            return res.data;
        }
    })
    return [totalEnrolls, totalEnrollsRefetch];
};

export default useEnrolls;