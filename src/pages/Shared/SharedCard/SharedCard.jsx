import { FaUsers } from "react-icons/fa";
import SmallButton from "../../../components/SmallButton/SmallButton";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
AOS.init();

const SharedCard = ({ data, url }) => {
    return (
        <div data-aos="zoom-in-up" data-aos-duration="700">
            <div className="card w-full h-full bg-base-100 border rounded-none space-y-2 font-inter hover:shadow-2xl duration-500">
                <figure><img src={data.courseImage} alt="Shoes" /></figure>
                <div className="p-7">
                    <h2 className=" text-xl font-bold font-merri">{data.title}</h2>
                    <p className="">{data.name}</p>
                    <div className=" flex justify-between items-center font-semibold my-2">
                        <p>$ {data.price}</p>
                        <div className="flex items-center justify-center gap-1">
                            <div className="text-xl">
                                <FaUsers />
                            </div>
                            <p>(0)</p>
                        </div>
                    </div>
                    <div className="card-actions justify-center">
                        <Link to={url}><SmallButton name="Enroll Now"></SmallButton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedCard;