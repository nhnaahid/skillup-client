import { BiSolidDetail } from "react-icons/bi";
import { RiDeleteBin6Line, RiProgress5Line } from "react-icons/ri";
import { RxCrossCircled, RxUpdate } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


// TODO: refetch need to send and receive
const SharedTable = ({ dataList, tableHeads, buttons, courseRefetch, userRefetch, teacherCourseRefetch }) => {
    // const [submitted, setSubmitted] = useState(false);
    const axiosSecure = useAxiosSecure();
    const handleAccept = data => {
        console.log(data.title);
    }
    const handleApprove = data => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to approve this course.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Approve"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/courses/${data._id}`, { status: 'approved' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            courseRefetch();
                            Swal.fire({
                                title: "Approved!",
                                text: `${data.title} is approved as a new course.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleReject = data => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to reject this course`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Reject"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/courses/${data._id}`, { status: 'rejected' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            courseRefetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: `${data.title} is Rejected`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleDelete = data => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete this course.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/courses/${data._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            teacherCourseRefetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your course has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleMakeAdmin = data => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make ${data.name} an Admin`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Admin"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${data.email}`, { role: 'admin' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            userRefetch();
                            Swal.fire({
                                title: "Access Given!",
                                text: `${data.name} is an Admin now.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleSubmit = data => {
        axiosSecure.patch(`/assignments/${data._id}`, { submissionCount: data.subCount + 1 })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Assignment Submitted');
                    // setSubmitted(true);
                }
            })
    }

    return (
        <div className="overflow-x-auto mt-12">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        {
                            tableHeads.map((thData, idx) => <th key={idx}>{thData}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {
                        dataList.map((data, index) => <tr key={data._id}>
                            <td>
                                {index + 1}
                            </td>
                            {
                                data.image && <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={data.image} alt="Craft item image" />
                                        </div>
                                    </div>
                                </td>
                            }

                            {
                                data.name && <td>{data.name}</td>
                            }
                            {
                                data.title && <td>{data.title}</td>
                            }
                            {
                                data.category && <td>{data.category}</td>
                            }
                            {
                                data.experience && <td>{data.experience}</td>
                            }
                            {
                                data.price && <td>{data.price}</td>
                            }
                            {
                                data.description && <td>{data.description}</td>
                            }
                            {
                                data.email && <td>{data.email}</td>
                            }
                            {
                                data.role && <>
                                    {
                                        data.role === 'admin' ? <td><p className="text-white bg-red-400 rounded-2xl p-1 text-center">Admin</p></td> : <td> <button onClick={() => handleMakeAdmin(data)} className="text-2xl rounded-full my-btn p-2 tooltip" data-tip="Make Admin"><GrUserAdmin /></button> </td>
                                    }
                                </>
                            }
                            {
                                data.publishDate && <td>{data.publishDate}</td>
                            }
                            {
                                data.deadline && <td>{data.deadline}</td>
                            }
                            {
                                data.submissionCount >= 0 && <td className="text-center">{data.submissionCount}</td>
                            }
                            {
                                data.status === 'approved' && <td><p className="text-white bg-green-500 rounded-2xl p-1 text-center">Approved</p></td>
                            }
                            {
                                data.status === 'accepted' && <td><p className="text-white bg-green-500 rounded-2xl p-1 text-center">Accepted</p></td>
                            }
                            {
                                data.status === 'rejected' && <td><p className="text-white bg-red-500 rounded-2xl p-1 text-center">Rejected</p></td>
                            }
                            {
                                data.status === 'pending' && <td><p className="text-white bg-yellow-500 rounded-2xl p-1 text-center">Pending</p></td>
                            }
                            {
                                buttons.map((btn, idx) => btn === 'submit' && <td key={idx}> <button onClick={() => handleSubmit(data)} className=" tooltip btn btn-sm text-xs md:text-sm bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700 mt-3 w-full" data-tip="Submit Assignment">Submit</button> </td>)
                            }
                            {
                                buttons.map((btn, idx) => btn === 'update' && <td key={idx}> <Link to={`/dashboard/teacherCourses/${data._id}`}><button className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="Update"><RxUpdate /></button> </Link></td>)
                            }
                            {
                                buttons.map((btn, idx) => btn === 'delete' && <td key={idx}> <button onClick={() => handleDelete(data)} className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="Delete"><RiDeleteBin6Line /></button> </td>)
                            }
                            {
                                buttons.map((btn, idx) => btn === 'details' && <td key={idx}><Link to={`/dashboard/teacherCourses/details/${data._id}`}><button disabled={data.status !== 'approved'} className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="Show Details"><BiSolidDetail /></button></Link> </td>)
                            }
                            {
                                buttons.map((btn, idx) => btn === 'accept' && <td key={idx}> <button onClick={() => handleAccept(data)} className="text-xl rounded-full  my-btn p-2 tooltip" data-tip="Accept" disabled={data.status !== 'pending'}><SiTicktick /></button> </td>)
                            }
                            {
                                buttons.map((btn, idx) => btn === 'approve' && <td key={idx}> <button onClick={() => handleApprove(data)} className="text-xl rounded-full  my-btn p-2 tooltip" data-tip="Approve" disabled={data.status !== 'pending'}><SiTicktick /></button> </td>)
                            }
                            {
                                buttons.map((btn, idx) => btn === 'reject' && <td key={idx}> <button onClick={() => handleReject(data)} className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="Reject" disabled={data.status !== 'pending'}><RxCrossCircled /></button></td>)
                            }
                            {
                                buttons.map((btn, idx) => btn === 'progress' && <td key={idx}> <Link to={`/dashboard/allCourses/${data._id}`}> <button disabled={data.status !== 'approved'} className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="See Progress"><RiProgress5Line /> </button> </Link></td>)
                            }
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SharedTable;