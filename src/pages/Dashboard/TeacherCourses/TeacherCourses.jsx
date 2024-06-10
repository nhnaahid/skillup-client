import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import SharedTable from "../../Shared/SharedTable/SharedTable";
import useAuth from "../../../hooks/useAuth";


const TeacherCourses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: teacherCourses = [], refetch: teacherCourseRefetch } = useQuery({
        queryKey: ['teacherCourses'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/teacher/myCourses/${user.email}`);
            return res.data;
        }
    })


    // Table data 
    const tableHeads = ['Image', 'Title', 'Price', 'Description', 'Status', ' ', ' ', ' '];
    const buttons = ['update', 'delete', 'details'];
    let tableInfo = [];
    teacherCourses.map((course) => {
        const courseInfo = {
            _id: course._id,
            image: course.courseImage,
            title: course.title,
            price: course.price,
            description: course.description.slice(0, 20) + '...',
            status: course.status
        }
        tableInfo = [...tableInfo, courseInfo];
    })
    // console.log(tableInfo);
    return (
        <div>
            <PageHeadline headline="My Courses" text="All the courses you have uploaded is here. Some courses might be in pending phase for skillUp review. In that case please wait for skillUp response."></PageHeadline>
            <SharedTable dataList={tableInfo} tableHeads={tableHeads} buttons={buttons}></SharedTable>
        </div>
    );
};

export default TeacherCourses;