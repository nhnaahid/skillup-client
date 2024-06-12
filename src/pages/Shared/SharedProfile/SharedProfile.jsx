import { Link } from "react-router-dom";
import SmallButton from "../../../components/SmallButton/SmallButton";


const SharedProfile = ({ user }) => {
    return (
        <div className="p-1 md:p-5 font_inter">
            <div className="w-full md:w-4/5 mx-auto bg-white">
                <h1 className="text-2xl font-bold p-3 border-b text-center font-merri">{user.role == 'student' && 'Student Profile' || user.role == 'teacher' && 'Teacher Profile' || user.role == 'admin' && 'Admin Profile'}</h1>
                <div className="avatar flex justify-center items-center mt-5">
                    <div className="w-24 md:w-40 mask mask-hexagon">
                        <img src={user?.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} />
                    </div>
                </div>
                <div className="w-full overflow-hidden mt-5 pb-1 text-xs md:text-base px-1 text-center">
                    <p className="border-b py-2 font-bold">Name: <span className="font-normal ml-1 md:ml-3">{user.name}</span></p>
                    <p className="border-b py-2 font-bold">Email: <span className="font-normal ml-1 md:ml-3">{user.email}</span></p>
                    <p className="border-b py-2 font-bold">Phone: <span className="font-normal ml-1 md:ml-3">{user.phone ? user.phone : 'N/A'}</span></p>
                    <p className="py-2 font-bold">Role: <span className="font-normal ml-1 md:ml-3">{user.role}</span></p>
                </div>
                <div className="w-full flex justify-center">
                    <Link to=""><SmallButton name="Edit Profile"></SmallButton></Link>
                </div>
            </div>
        </div>
    );
};

export default SharedProfile;