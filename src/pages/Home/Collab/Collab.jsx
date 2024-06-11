import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import google from '../../../assets/collab/google.png'
import ibm from '../../../assets/collab/ibm.png'
import mu from '../../../assets/collab/mu.png'
import duke from '../../../assets/collab/duke.png'
import illinois from '../../../assets/collab/illinois.png'
import jhu from '../../../assets/collab/jhu.png'

const Collab = () => {
    return (
        <div data-aos="zoom-in-up" data-aos-duration="1000" className='w-full md:w-4/5 mx-auto space-y-5 mt-16 px-2'>
            <div className='text-center'>
                <h1 className='text-xl md:text-3xl'>Learn from <span className='font-bold'>200+</span> leading universities and companies with SkillUp</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 items-center  gap-4'>
                <img className='mx-auto' src={google} alt="" />
                <img className='mx-auto' src={ibm} alt="" />
                <img className='mx-auto' src={duke} alt="" />
                <img className='mx-auto' src={illinois} alt="" />
                <img className='mx-auto' src={mu} alt="" />
                <img className='mx-auto' src={jhu} alt="" />
            </div>
        </div>
    );
};

export default Collab;