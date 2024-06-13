import { useEffect, useState } from 'react';
import statBanner from '../../../assets/stat-banner.jpg'
import useAxiosPublic from '../../../hooks/useAxiosPublic';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Statistics = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalEnrolls, setTotalEnrolls] = useState(0);

    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get('/stats')
            .then(res => {
                setTotalUsers(res.data.users)
                setTotalEnrolls(res.data.enrolls)

            })
        axiosPublic.get('/courses/valid-courses')
            .then(res => {
                setTotalCourses(res.data.length)
            })
    }, [axiosPublic])

    return (
        <div data-aos="zoom-in-up" data-aos-duration="1000" className="w-4/5 mx-auto mt-28 flex flex-col-reverse md:flex-row items-center justify-between font-inter">
            {/* data */}
            <div className="w-full md:w-2/5 h-full flex flex-col gap-3">
                <div className="stats shadow rounded-none">

                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{totalUsers}</div>
                        <div className="stat-title font-bold">Total Users</div>
                    </div>

                </div>
                <div className="stats shadow rounded-none">

                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{totalCourses}</div>
                        <div className="stat-title font-bold">Total Courses</div>
                    </div>

                </div>
                <div className="stats shadow rounded-none">

                    <div className="stat text-center">
                        <div className="stat-value text-blue-500 font-merri">{totalEnrolls}</div>
                        <div className="stat-title font-bold">Total Enrollment</div>
                    </div>

                </div>
            </div>
            {/* image */}
            <div className='w-full md:w-1/2 h-full'>
                <img className='w-full h-full object-cover' src={statBanner} alt="" />
            </div>
        </div>
    );
};

export default Statistics;