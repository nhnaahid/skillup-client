import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Collab from "../Collab/Collab";
import Statistics from "../Statistics/Statistics";
import BeTeacher from "../BeTeacher/BeTeacher";
import Featured from "../Featured/Featured";
import NewsLetter from "../NewsLetter/NewsLetter";
import Feedback from "../Feedback/Feedback";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SkillUp | Home</title>
            </Helmet>
            <Banner></Banner>
            <Collab></Collab>
            <Featured></Featured>
            <Statistics></Statistics>
            <BeTeacher></BeTeacher>
            <Feedback></Feedback>
            <NewsLetter></NewsLetter>
        </div >
    );
};

export default Home;