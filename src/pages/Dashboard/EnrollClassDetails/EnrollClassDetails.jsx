import { useParams } from "react-router-dom";
import useAssignment from "../../../hooks/useAssignment";
import SharedTable from "../../Shared/SharedTable/SharedTable";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import { MdAdd } from "react-icons/md";
import FormButton from "../../../components/FormButton/FormButton";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCourse from "../../../hooks/useCourse";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const EnrollClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    // console.log(id);
    const [assignments] = useAssignment(id);
    const [oneCourse] = useCourse(id);
    const { user } = useAuth();
    // console.log("assignments: ",assignments);
    // console.log("course: ",oneCourse);


    const handlePost = e => {
        e.preventDefault();
        // console.log("okay");
        const form = e.target;
        const ratings = form.ratings.value;
        const description = form.description.value;

        const feedbackInfo = {
            description,
            ratings: parseInt(ratings),
            courseId: id,
            title: oneCourse.title,
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
        }
        // console.log("From modal: ", feedbackInfo);

        axiosSecure.post('/feedbacks', feedbackInfo)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset();
                    toast.success('Feedback Posted.');
                }
            })
    }

    // Table data 
    const tableHeads = ['Assignment Title', 'Description', 'Published Date', 'Deadline', ' '];
    const buttons = ['submit'];
    let tableInfo = [];
    assignments.map((assignment) => {
        const assignmentInfo = {
            _id: assignment._id,
            title: assignment.title,
            description: assignment.description,
            publishDate: assignment.publishDate,
            deadline: assignment.deadline,
            subCount: assignment.submissionCount
        }
        tableInfo = [...tableInfo, assignmentInfo];
    })
    return (
        <div className="px-2 font-inter">
            <Helmet>
                <title>SkillUp | Course details</title>
            </Helmet>
            <PageHeadline headline="Assignments & Feedbacks" text="Here is the assignments for this course added by the course teacher. You can also give feedback about this course."></PageHeadline>
            {/*post feedback */}
            <div className="mt-10">
                <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-sm md:btn-md text-xs md:text-sm bg-transparent rounded-none border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700">
                    <MdAdd className="text-2xl" /><span className="text-lg -ml-2">Feedback</span>
                </button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-xl font-merri">Post a Course Feedback</h3>
                        <form onSubmit={handlePost} className="flex flex-col space-y-2 mt-5">

                            <label>Description</label>
                            <textarea required name="description" placeholder="Write your opinion" className="textarea textarea-bordered rounded-none textarea-sm w-full" ></textarea>

                            <label>Ratings</label>
                            <input required type="number" name="ratings" id="" placeholder="Out of 5" className="border border-gray-300 p-2 md:p-3 text-sm" />

                            <FormButton text="Post"></FormButton>
                        </form>
                    </div>

                </dialog>
            </div>

            {/* show assignments */}
            {
                assignments.length > 0 ? <SharedTable dataList={tableInfo} tableHeads={tableHeads} buttons={buttons}></SharedTable> : <h1 className="text-2xl text-center font-bold font-merri my-7">No Assignments Added</h1>
            }
        </div>
    );
};

export default EnrollClassDetails;