import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";


const MainLayout = () => {
    const location = useLocation();
    let isHome;
    // const [isHome, setIsHome] = useState(false);
    if (location.pathname === '/') {
        isHome = true;
    }
    else {
        isHome = false;
    }
    console.log(isHome);
    return (
        <div>
            <div className={`${isHome ? '' : 'h-[56px] md:h-[80px]'}`}>
                <NavBar isHome={isHome}></NavBar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;