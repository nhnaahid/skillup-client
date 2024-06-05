
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


const Footer = () => {
    return (
        <div className='bg-black text-white mt-20'>
            <div className="w-1/2 text-center mx-auto py-8">
                <div className="border-b border-dotted py-10 space-y-5">
                    <div className="space-y-2">
                        <h1 className="text-3xl font font-extrabold font-merri">SkillUp</h1>
                        <h3 className='font-bold font-inter'>Unlock Your Potential</h3>
                    </div>

                    <p className="text-zinc-400 font-inter">SkillUp is committed to providing high-quality online education to learners around the globe. Whether you are looking to advance your career, learn a new skill, or explore new interests, our comprehensive course offerings are designed to help you achieve your goals.</p>
                    <p className="text-zinc-400 font-inter">Connect with us:</p>
                    <div className="flex flex-wrap justify-center gap-8 text-2xl">
                        <a href="https://x.com/?lang=en"><FaXTwitter></FaXTwitter></a>
                        <a href="https://www.facebook.com/"><FaFacebook></FaFacebook></a>
                        <a href="https://www.instagram.com/"><FaInstagram></FaInstagram></a>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="text-sm font-inter">Copyright © 2024, SkillUp. All rights reserved | Designed by SkillUp Academy | Terms of Use | Privacy Policy | Sitemap</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;