import { Helmet } from "react-helmet-async";
import useOneUser from "../../../hooks/useOneUser";
import SharedProfile from "../../Shared/SharedProfile/SharedProfile";

const StudentProfile = () => {
    const [oneUser] = useOneUser();
    return (
        <div>
            <Helmet>
                <title>SkillUp | Student Profile</title>
            </Helmet>
            <SharedProfile user={oneUser}></SharedProfile>
        </div>
    );
};

export default StudentProfile;