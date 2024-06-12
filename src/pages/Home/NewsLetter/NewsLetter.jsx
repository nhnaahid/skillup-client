import { FaRegEnvelope } from "react-icons/fa";

const NewsLetter = () => {
    return (
        <div className="bg-blue-400 mt-24 px-3 md:px-24 py-7 -mb-20 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <FaRegEnvelope className="text-4xl"></FaRegEnvelope>
                    <h1 className="font-oswald text-3xl tracking-wide text-center md:text-start">SIGN UP FOR NEWSLETTER</h1>
                </div>
                <div className="join">
                    <input className="input-sm md:input input-bordered join-item w-4/5 md:w-full text-black" placeholder="Email" />
                    <button className="btn-sm md:btn md:btn-neutral join-item rounded-r-full bg-black text-white">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;