// import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import './NavBar.css'
import { useState } from "react";
import logo from '../../../assets/logo.gif'
import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import { toast } from "react-toastify";

const NavBar = ({ isHome }) => {

    const [close, setClose] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // const { user, logOut } = useContext(AuthContext);
    // console.log(user);
    // const handleLogout = () => {
    //     logOut()
    //         .then(result => {
    //             console.log(result);
    //             toast.success('User Successfully Logged Out.');
    //         })
    //         .catch(error => {
    //             toast.error(error.message);
    //         })
    // }
    const navLink = <>
        <NavLink to="/"><p>Home</p></NavLink>
        <NavLink to="/all-courses"><p>All Courses</p></NavLink>
        <NavLink to="/teach"><p>Teach On Skillup</p></NavLink>
    </>
    document.addEventListener('scroll', () => {
        // const nav=document.getElementsByTagName('nav');
        if (window.scrollY <= 0) {
            setIsScrolled(false);
        }
        else {
            setIsScrolled(true);
        }
    })
    return (
        <nav className={`flex items-center justify-between py-2 px-3 font-merri fixed z-20 w-full max-w-screen-2xl ${isHome ? isScrolled ? 'transition-colors bg-white text-black duration-500' : 'bg-transparent text-white' : 'bg-white text-black'}`}>
            <div onClick={() => setClose(!close)} className="text-xl block md:hidden ">
                {
                    close ? <AiOutlineClose></AiOutlineClose> : <AiOutlineMenu></AiOutlineMenu>
                }
                <div className={`${close ? 'top-[58px]' : '-top-60'} duration-700 flex flex-col items-start text-start md:hidden absolute text-sm p-4 gap-1 bg-white text-black`}>
                    {navLink}
                </div>
            </div>
            <Link to="/">
                <div className="flex items-center">
                    <figure className="h-full bg-cover">
                        <img className="w-10 md:w-16 h-full" src={logo} alt="" />
                    </figure>
                    <h1 className={`text-xl md:text-3xl font-bold ${isHome ? isScrolled ? 'bg-white text-[#0B68CD]' : 'bg-transparent text-white' : 'bg-white text-[#0B68CD]'}`}>SkillUp</h1>
                </div>
            </Link>
            <div className="hidden md:flex items-center gap-7 text-sm">
                {navLink}
            </div>
            <div className="flex items-center gap-2">

                <div>
                    {
                        // user ?
                        //     <div className="dropdown dropdown-end">
                        //         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
                        //             <div className="w-10 rounded-full">
                        //                 <img alt="User Profile Picture" src={user?.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} />
                        //             </div>
                        //         </div>
                        //         <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        //             <li className="text-center"><Link >{user.displayName}</Link></li>
                        //             <li className="text-center"><Link onClick={handleLogout}>Logout</Link></li>
                        //         </ul>
                        //     </div>
                        //     :
                        <Link to="/login"><button className={`btn btn-sm md:btn-md text-xs md:text-sm bg-transparent rounded-none ${isHome ? isScrolled ? 'border-[#0B68CD] text-[#0B68CD] hover:bg-gray-200 hover:border-[#0B68CD]' : 'text-white hover:text-blue-300 hover:bg-transparent' : ' border-[#0B68CD] text-[#0B68CD] hover:border-[#0B68CD]'}`}>Sign In</button></Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;