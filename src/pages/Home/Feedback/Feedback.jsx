import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Feedback = () => {
    const axiosPublic = useAxiosPublic();
    const [feedbacks, setFeedbacks] = useState([]);
    axiosPublic.get('/feedbacks')
        .then(res => {
            setFeedbacks(res.data);
        })
    return (
        <div>
            <h1>total feedbacks: {feedbacks.length}</h1>
        </div>
    );
};

export default Feedback;