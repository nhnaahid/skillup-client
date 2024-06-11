import { FaUsers } from "react-icons/fa";
import SmallButton from "../../../components/SmallButton/SmallButton";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
AOS.init();

const SharedCard = ({ data, btnText, url }) => {
    // console.log('I am shared card');
    // console.log(data._id);
    const axiosPublic = useAxiosPublic();
    const { data: totalEnrolls = [], refetch: totalEnrollsRefetch } = useQuery({
        queryKey: ['totalEnroll', data._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/enrolls/${data._id}`);
            return res.data;
        }
    })
    console.log("From shared card: ", totalEnrolls);
    return (
        <div data-aos="zoom-in-up" data-aos-duration="700">
            <div className="card w-full h-full bg-base-100 border rounded-none space-y-2 font-inter hover:shadow-2xl duration-500">
                <figure><img src={data.courseImage} alt="Shoes" /></figure>
                <div className="p-7">
                    {
                        data.title && <h2 className=" text-xl font-bold font-merri">{data.title}</h2>
                    }
                    {
                        data.courseTitle && <h2 className=" text-xl font-bold font-merri">{data.courseTitle}</h2>
                    }
                    {
                        data.name && <p className="">{data.name}</p>
                    }
                    {
                        data.teacherName && <p className="">{data.teacherName}</p>
                    }
                    {
                        data.price && <div className=" flex justify-between items-center my-2">
                            <p className="font-semibold text-xl">$ {data.price}</p>
                            <div className="flex items-center justify-center gap-1">
                                <div className="text-xl">
                                    <FaUsers />
                                </div>
                                <p>{totalEnrolls.length}</p>
                            </div>
                        </div>
                    }
                    <div className="card-actions justify-center">
                        <Link to={url} className="w-full"><SmallButton name={btnText}></SmallButton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedCard;