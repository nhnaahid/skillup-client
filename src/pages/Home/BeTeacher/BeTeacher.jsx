import { Link } from 'react-router-dom';
import teacher from '../../../assets/teacher-banner.jpg'
import SmallButton from '../../../components/SmallButton/SmallButton';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const BeTeacher = () => {
    return (
        <div data-aos="zoom-in-up" data-aos-duration="1000" className='flex flex-col md:flex-row items-center justify-between gap-7 font-inter mt-20 px-5'>
            {/* image */}
            <div className='w-full md:w-1/2'>
                <img src={teacher} alt="Teacher" />
            </div>
            {/* text */}
            <div className='w-full md:w-1/2 space-y-2'>
                <h1 className='text-2xl md:text-3xl font-merri font-bold'>Become a Teacher</h1>
                <p className='text-gray-700 text-sm md:text-base'>Are you passionate about shaping the future? Take the first step towards a rewarding career in education. Join as a SkillUp Teacher today and start making a difference in the lives of students.</p>
                <div className='w-1/2 lg:w-2/5'>
                    <Link to="/teach"><SmallButton name="Start Teaching Today"></SmallButton></Link>
                </div>
            </div>
        </div>
    );
};

export default BeTeacher;