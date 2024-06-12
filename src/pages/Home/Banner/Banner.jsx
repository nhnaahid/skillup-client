import { Slide } from 'react-awesome-reveal';
import banner from '../../../assets/banner.mp4'
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='w-full h-screen relative'>
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
            <video className='w-full h-full object-cover' src={banner} autoPlay loop muted></video>
            <div className='absolute w-full h-full top-0 flex flex-col justify-center items-center text-white space-y-2 md:space-y-3 text-center'>
                <Slide direction={'left'} duration={1500}>
                    <h3 className='text-2xl lg:text-4xl font-extrabold font-dancing text-blue-300'>Online Courses To Learn</h3>
                    <h1 className='text-3xl lg:text-5xl font-extrabold uppercase font-merri'>Welcome To SkillUp</h1>
                    <p className='font-semibold lg:text-xl font-inter'>Own Your Future By Learning New Skills Online</p>
                    <div className='mt-3'>
                        <Link to="/all-courses"><button className="btn btn-sm md:btn-md bg-transparent rounded-none text-white uppercase hover:text-blue-300 hover:bg-transparent font-inter text-xs md:text-sm">Get Started</button></Link>
                    </div>
                </Slide>

            </div>
        </div>
    );
};

export default Banner;