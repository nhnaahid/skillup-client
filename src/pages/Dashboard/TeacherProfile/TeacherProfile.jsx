import { Helmet } from "react-helmet-async";
import useOneUser from "../../../hooks/useOneUser";
import SharedProfile from "../../Shared/SharedProfile/SharedProfile";

const TeacherProfile = () => {
    const [oneUser] = useOneUser();
    return (
        <div>
            <Helmet>
                <title>SkillUp | Teacher Profile</title>
            </Helmet>
            <SharedProfile user={oneUser}></SharedProfile>
        </div>
    );
};

export default TeacherProfile;