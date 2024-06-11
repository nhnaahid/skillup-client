import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Collab from "../Collab/Collab";
import Statistics from "../Statistics/Statistics";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SkillUp | Home</title>
            </Helmet>
            <Banner></Banner>
            <Collab></Collab>
            <Statistics></Statistics>
        </div >
    );
};

export default Home;