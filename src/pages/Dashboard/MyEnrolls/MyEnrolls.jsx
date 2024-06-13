import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import useAuth from "../../../hooks/useAuth";
import SharedCard from "../../Shared/SharedCard/SharedCard";

const MyEnrolls = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: myEnrolls = [], refetch: myEnrollsRefetch } = useQuery({
        queryKey: ['myEnroll'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolls/student/${user.email}`);
            return res.data;
        }
    })
    console.log(myEnrolls);

    return (
        <div>
            <PageHeadline headline="My Enrolled Courses" text="Here, you will find a comprehensive list of the courses you are currently registered. Each course is designed to provide you with a rich learning experience."></PageHeadline>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 p-5 mt-16">
                {
                    myEnrolls.map(course => <SharedCard key={course._id} data={course} btnText="Continue" url={`/dashboard/my-enrolls/${course.courseId}`} ></SharedCard>)
                }
            </div>
        </div >
    );
};

export default MyEnrolls;