import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAssignment = (id) => {
    const axiosSecure = useAxiosSecure();
    const { data: assignments = [], refetch: assignmentRefetch } = useQuery({
        queryKey: ['assignments', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignments/${id}`);
            return res.data;
        }
    })

    return [assignments, assignmentRefetch];
};

export default useAssignment;