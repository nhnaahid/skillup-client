import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useOneUser = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: oneUser = [], refetch: refetchOneUser } = useQuery({
        queryKey: ['oneUser', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    return [oneUser, refetchOneUser];
};

export default useOneUser;