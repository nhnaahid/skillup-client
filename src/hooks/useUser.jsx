import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = (search) => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        }
    })
    return [users, refetchUsers];
};

export default useUser;