import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Collab from "../Collab/Collab";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SkillUp | Home</title>
            </Helmet>
            <Banner></Banner>
            <Collab></Collab>
        </div >
    );
};

export default Home;