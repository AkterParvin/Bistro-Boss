import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Nav from '../Pages/Shared/Nav/Nav';



const Root = () => {
    const location = useLocation();
    // console.log(location);
    // const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup");

    return (
        <div>
            <div className=" max-w-screen-xl mx-auto ">
                {
                    location.pathname === "/login" || location.pathname === "/signup" ? <> </> : <><Nav/></>
                }
               

                {/* <Nav></Nav> */}
            </div>

            <div className="max-w-screen-xl mx-auto">
                <Outlet />
            </div>
            {
                location.pathname === "/login" || location.pathname === "/signup" ? <> </> : <><Footer /></>
            }
            
           
        </div>
    );
};

export default Root;