import useOneUser from "../../../hooks/useOneUser";
import SharedProfile from "../../Shared/SharedProfile/SharedProfile";

const TeacherProfile = () => {
    const [oneUser] = useOneUser();
    return (
        <div>
            <SharedProfile user={oneUser}></SharedProfile>
        </div>
    );
};

export default TeacherProfile;