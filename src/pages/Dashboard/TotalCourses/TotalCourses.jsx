import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import PageHeadline from '../../Shared/PageHeadline/PageHeadline';
import SharedTable from '../../Shared/SharedTable/SharedTable';

const TotalCourses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: courses = [], refetch: courseRefetch } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courses');
            return res.data;
        }
    })
    // console.log(courses);
    // Table data 
    const tableHeads = ['Image', 'Title', 'Description', 'Email', 'Status', ' ', ' ', ' '];
    const buttons = ['approve', 'reject', 'progress'];
    let tableInfo = [];
    courses.map((course) => {
        const courseInfo = {
            _id: course._id,
            image: course.courseImage,
            title: course.title,
            description: course.description,
            email: course.email,
            status: course.status
        }
        tableInfo = [...tableInfo, courseInfo];
    })
    console.log(tableInfo);
    return (
        <div>
            <PageHeadline headline="All Courses" text="All the courses added by teacher is here. View the courses, if the requirements met accept it otherwise reject."></PageHeadline>
            <SharedTable dataList={tableInfo} tableHeads={tableHeads} buttons={buttons} courseRefetch={courseRefetch}></SharedTable>
        </div>
    );
};

export default TotalCourses;