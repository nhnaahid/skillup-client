import { RxCrossCircled } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";

const TeacherRequestTable = ({ teacher }) => {
    const { _id, name, image, experience, category, title, status } = teacher;
    const handleAcceptRequest=id=>{
        console.log();
    }
    return (
        <>
            <tr>
                <td>
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Craft item image" />
                        </div>
                    </div>
                </td>
                <td>
                    <p >{name}</p>
                </td>
                <td>
                    <p>{title}</p>
                </td>
                <td>{category}</td>
                <td>{experience}</td>
                <td>{status}</td>
                <td>
                    <div className="flex gap-5">
                        <button onClick={()=>handleAcceptRequest(_id)} className="text-xl rounded-full  my-btn p-2 tooltip" data-tip="Accept"><SiTicktick /></button>
                        <button onClick={()=>handleRejectRequest(_id)} className="text-2xl rounded-full  my-btn p-2 tooltip" data-tip="Reject"><RxCrossCircled /></button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default TeacherRequestTable;