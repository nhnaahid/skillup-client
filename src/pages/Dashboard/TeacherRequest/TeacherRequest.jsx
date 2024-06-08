import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";

import { SiTicktick } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";
import Swal from "sweetalert2";

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: teachers = [], refetch } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacherRequests');
            return res.data;
        }
    })

    const handleAcceptRequest = teacher => {
        console.log(teacher._id);
    }
    const handleRejectRequest = teacher => {
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
                            refetch();
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
                            teachers.map((teacher, index) => <tr key={teacher._id}>
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
                                <td>{teacher.status}</td>
                                <td>
                                    <div className="flex gap-5">
                                        <button onClick={() => handleAcceptRequest(teacher)} className="text-xl rounded-full  my-btn p-2 tooltip" data-tip="Accept" disabled={teacher.status !== 'pending'}><SiTicktick /></button>
                                        <button onClick={() => handleRejectRequest(teacher)} className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="Reject" disabled={teacher.status !== 'pending'}><RxCrossCircled /></button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;