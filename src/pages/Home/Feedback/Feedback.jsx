import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import FeedbackCard from "../../Shared/FeedbackCard/FeedbackCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Feedback = () => {
    const axiosPublic = useAxiosPublic();
    const [feedbacks, setFeedbacks] = useState([]);
    axiosPublic.get('/feedbacks')
        .then(res => {
            setFeedbacks(res.data);
        })
    return (
        <div data-aos="zoom-in-up" data-aos-duration="1000" className="mt-32 px-3 md:px-8">
            <div className="w-full md:w-1/2 mx-auto text-center mb-16 space-y-3">
                <p className="font-marri font-semibold md:text-lg text-gray-700">PEOPLE ARE PRAISING SKILLUP</p>
                <h1 className="font-merri font-bold text-2xl md:text-4xl">What make they <span className="text-blue-500">love us?</span></h1>
            </div>
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
                        feedbacks.slice(0,8).map(feedback => <SwiperSlide key={feedback._id}><FeedbackCard
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
    );
};

export default Feedback;