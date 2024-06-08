import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = ({ email }) => {
    const axiosSecure = useAxiosSecure();
    const { data: oneUser = [], refetch: refetchUser } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${email}`);
            return res.data;
        }
    })
    return [oneUser, refetchUser];
};

export default useUser;