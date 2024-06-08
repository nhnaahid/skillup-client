import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import useTeacherRequest from "../../../hooks/useTeacherRequest";
import TeacherRequestTable from "./TeacherRequestTable/TeacherRequestTable";


const TeacherRequest = () => {
    const [teacherRequests] = useTeacherRequest();
    // console.log(teacherRequests);
    return (
        <div>
            <PageHeadline headline="Teacher Requests" text="All the requests made by teacher is here. To Approve or Reject the requests press the corresponding button."></PageHeadline>
            <div className="overflow-x-auto mt-12">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {
                            teacherRequests.map((teacher, index) => <TeacherRequestTable key={teacher._id} teacher={teacher} index={index}></TeacherRequestTable>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;