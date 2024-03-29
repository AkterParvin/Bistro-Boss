import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../Hooks/useCart";

const NavBar = () => {
    const { logOut, user } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => {
                console.log(error);
            });
    }
    const [cart] = useCart();


    const navLinks = <>
        <li><Link className="hover:text-yellow-950 hover:bg-white px-2  rounded-lg" to={'/'}>Home</Link></li>
        <li><Link className="hover:text-yellow-950 hover:bg-white px-2  rounded-lg" to={'/menu'}>Menu</Link></li>
        <li><Link className="hover:text-yellow-950 hover:bg-white px-2  rounded-lg"  to={'/order/salads'}>Order Food</Link></li>
        <li><Link className="hover:text-yellow-950 hover:bg-white px-2  rounded-lg" to={'/secret'}>Secret</Link></li>
        <li><Link className="hover:text-yellow-950 hover:bg-white px-2  rounded-lg" to={'/signup'}>Signup</Link></li>
        {
            user ?
                <>
                    <li>
                        <button className="hover:text-yellow-950 hover:bg-white px-2  rounded-lg"
                            onClick={handleLogOut}>
                            Log Out
                        </button>
                    </li>
                    <li>
                        {/* {user?.displayName} */}
                        <Link to="/dashboard/cart">
                        <button className="flex items-center justify-center gap-1 bg-white text-gray-900 px-2 py-1 rounded-md">
                          <FaCartPlus/>
                            <div className="badge badge-warning">+{cart.length}</div>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <h2 className="text-xs bg-gray-900 px-1 rounded-md ">{user?.displayName}</h2>
                    </li>
                </> :
                <li><Link to={'/login'}>Login</Link></li>
        }

    </>

    return (
        <>
            <div className="navbar  bg-black/70 text-white fixed top-0 z-30 max-w-screen-xl mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <span className="ml-2">

                        <h1 className="text-7xl font-black ">Bistro-Boss</h1>
                        <p className="tracking-[7.5px] uppercase">Restaurent</p>
                    </span>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="gap-5 text-base  menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                
            </div>
        </>
    );
};

export default NavBar;