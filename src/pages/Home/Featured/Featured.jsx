import { Link } from 'react-router-dom';
import student from '../../../assets/student-group.jpg'

const Featured = () => {
    return (
        <div className="hero min-h-screen bg-fixed mt-20 font-inter" style={{ backgroundImage: `url(${student})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="w-full md:w-3/4 mx-auto">
                    <h1 className="mb-5 text-2xl md:text-5xl font-bold font-merri text-white">Trusted by Over <span className='text-blue-300'>5000+</span> Learners</h1>
                    <p className="text-sm md:text-base mb-5 font-semibold w-4/5 mx-auto text-white">We have a fully qualified and very well educated teaching staff, continuous student counseling, and a very effective and enthusiastic student support staff.</p>
                    <Link to='/all-courses'><button className="btn btn-sm md:btn-md bg-transparent rounded-none text-white uppercase hover:text-blue-300 hover:bg-transparent font-inter text-xs md:text-sm">Explore Courses</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Featured;