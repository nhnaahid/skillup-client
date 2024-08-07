import { RxCrossCircled } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import useTeacherRequest from "../../../../hooks/useTeacherRequest";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const TeacherRequestTable = ({ teacher, index }) => {
    const [, teacherRequestsRefetch] = useTeacherRequest();
    const axiosSecure = useAxiosSecure()
    // console.log(teacher);
    const handleAcceptRequest = teacher => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to accept ${teacher.name} as a Teacher`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/teacherRequests/${teacher._id}`, { status: 'accepted' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            teacherRequestsRefetch();
                            Swal.fire({
                                title: "Accepted!",
                                text: `${teacher.name}'s request as teacher is Accepted`,
                                icon: "success"
                            });
                        }
                    })
                axiosSecure.patch(`/users/${teacher.email}`, { role: 'teacher' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            // console.log("Success");
                        }
                    })
            }
        });
    }
    const handleRejectRequest = teacher => {
        // console.log(teacher.name);
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to reject ${teacher.name} as a Teacher`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Reject"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/teacherRequests/${teacher._id}`, { status: 'rejected' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            teacherRequestsRefetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: `${teacher.name}'s request as teacher is Rejected`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <>
            <tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={teacher.image} alt="Craft item image" />
                        </div>
                    </div>
                </td>
                <td>
                    <p >{teacher.name}</p>
                </td>
                <td>
                    <p>{teacher.title}</p>
                </td>
                <td>{teacher.category}</td>
                <td>{teacher.experience}</td>
                {
                    teacher.status === 'accepted' && <td><p className="text-white bg-green-500 rounded-2xl p-1 text-center">Accepted</p></td>
                }
                {
                    teacher.status === 'rejected' && <td><p className="text-white bg-red-500 rounded-2xl p-1 text-center">Rejected</p></td>
                }
                {
                    teacher.status === 'pending' && <td><p className="text-white bg-yellow-500 rounded-2xl p-1 text-center">Pending</p></td>
                }
                <td>
                    <div className="flex gap-5">
                        <button onClick={() => handleAcceptRequest(teacher)} className="text-xl rounded-full  my-btn p-2 tooltip" data-tip="Accept" disabled={teacher.status !== 'pending'}><SiTicktick /></button>
                        <button onClick={() => handleRejectRequest(teacher)} className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="Reject" disabled={teacher.status !== 'pending'}><RxCrossCircled /></button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default TeacherRequestTable;