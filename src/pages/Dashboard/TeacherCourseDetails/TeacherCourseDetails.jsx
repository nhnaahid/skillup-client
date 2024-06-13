import { MdAdd } from "react-icons/md";
import FormButton from "../../../components/FormButton/FormButton";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAssignment from "../../../hooks/useAssignment";
import SharedTable from "../../Shared/SharedTable/SharedTable";
import useEnrolls from "../../../hooks/useEnrolls";
import { Helmet } from "react-helmet-async";

const TeacherCourseDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    // console.log(id);
    const [assignments, assignmentRefetch] = useAssignment(id);
    const [totalEnrolls] = useEnrolls(id);
    // console.log("From course details: ", assignments);
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const deadline = form.deadline.value;

        const assignmentInfo = {
            title,
            description,
            deadline,
            courseId: id,
            submissionCount: 0,
            publishDate: new Date()
        }
        // console.log("From modal: ", assignmentInfo);
        axiosSecure.post('/assignments', assignmentInfo)
            .then(res => {
                if (res.data.insertedId) {
                    assignmentRefetch();
                    form.reset();
                    toast.success('Assignment added successfully.')
                }
            })
    }

    let totalSubmission = 0;

    // Table data 
    const tableHeads = ['Assignment Title', 'Description', 'Published Date', 'Deadline', 'Submission'];
    const buttons = [];
    let tableInfo = [];
    assignments.map((assignment) => {
        // only for total submission count
        totalSubmission = totalSubmission + assignment.submissionCount;
        const assignmentInfo = {
            _id: assignment._id,
            title: assignment.title,
            description: assignment.description,
            publishDate: assignment.publishDate,
            deadline: assignment.deadline,
            submissionCount: assignment.submissionCount
        }
        tableInfo = [...tableInfo, assignmentInfo];
    })

    return (
        <div className="mt-16 px-2 font-inter">
            <Helmet>
                <title>SkillUp | Teacher Requests</title>
            </Helmet>
            {/* stat */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
                <div className="w-full stats shadow rounded-none">
                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{totalEnrolls.length}</div>
                        <div className="stat-title font-bold">Enrollment</div>
                    </div>
                </div>
                <div className="w-full stats shadow rounded-none">
                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{assignments.length}</div>
                        <div className="stat-title font-bold">Assignment</div>
                    </div>
                </div>
                <div className="w-full stats shadow rounded-none">
                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{totalSubmission}</div>
                        <div className="stat-title font-bold">Submission</div>
                    </div>
                </div>
            </div>
            {/* create */}
            <div className="mt-10">
                <button onClick={() => document.getElementById('my_modal').showModal()} className="btn btn-sm md:btn-md text-xs md:text-sm bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700">
                    <MdAdd className="text-2xl" /><span className="text-lg -ml-2">Create</span>
                </button>
                <dialog id="my_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-xl font-merri">Create Assignment</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mt-5">
                            <label>Title</label>
                            <input required type="text" name="title" id="" placeholder="Assignment title" className="border border-gray-300 p-2 md:p-3 text-sm" />

                            <label>Description</label>
                            <textarea required name="description" placeholder="Assignment Description" className="textarea textarea-bordered rounded-none textarea-sm w-full" ></textarea>

                            <label>Deadline</label>
                            <input required type="date" id="deadline" name="deadline" className="border border-gray-300 p-2 md:p-3 text-sm"></input>

                            <FormButton text="Add Assignment"></FormButton>
                        </form>
                    </div>

                </dialog>
            </div>
            {/* show */}
            {
                assignments.length > 0 ? <SharedTable dataList={tableInfo} tableHeads={tableHeads} buttons={buttons}></SharedTable> : <h1 className="text-2xl text-center font-bold font-merri my-5">No Assignments Added</h1>
            }
        </div>
    );
};

export default TeacherCourseDetails;