import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAssignment from "../../../hooks/useAssignment";
import useEnrolls from "../../../hooks/useEnrolls";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import FeedbackCard from "../../Shared/FeedbackCard/FeedbackCard";

const CourseProgress = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    // console.log(id);
    const [assignments] = useAssignment(id);
    const [totalEnrolls] = useEnrolls(id);
    // console.log(assignments);
    const totalSubmission = assignments.reduce((sum, assignment) => sum + assignment.submissionCount, 0)

    useEffect(() => {
        axiosSecure.get(`/feedbacks/course/${id}`)
            .then(res => setFeedbacks(res.data));
    }, [axiosSecure, id])

    return (
        <div className="mt-16 px-2 font-inter">
            {/* stat */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
                <div className="w-full stats shadow rounded-none">
                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{totalEnrolls.length}</div>
                        <div className="stat-title font-bold">Enrollment</div>
                    </div>
                </div>
                <div className="w-full stats shadow rounded-none">
                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{assignments.length}</div>
                        <div className="stat-title font-bold">Assignment</div>
                    </div>
                </div>
                <div className="w-full stats shadow rounded-none">
                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{totalSubmission}</div>
                        <div className="stat-title font-bold">Submission</div>
                    </div>
                </div>
            </div>
            <PageHeadline headline='Feedbacks' text='Here is the collection of feedbacks about this course posted by the students who enrolled this course.'></PageHeadline>

            {/* feedbacks */}
            <div data-aos="zoom-in-up" data-aos-duration="1000" className="mt-8 md:mt-16 px-3 md:px-8">
                <div>
                    <Swiper
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        // slidesPerView={2}
                        // md:slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {
                            feedbacks.slice(0, 8).map(feedback => <SwiperSlide key={feedback._id}><FeedbackCard
                                image={feedback.image}
                                title={feedback.title}
                                ratings={feedback.ratings}
                                description={feedback.description}
                                name={feedback.name}
                            >
                            </FeedbackCard></SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;