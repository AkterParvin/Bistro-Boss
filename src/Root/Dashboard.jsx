/* eslint-disable no-unused-vars */
import { FaAd, FaBars, FaBook, FaCalendar, FaHome, FaList, FaMoneyBill, FaMoneyCheck, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Pages/Shared/Hooks/useCart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../Pages/Shared/Hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();


    // TODO: get isAdmin value from the database 
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard sidebar  */}
            <div className="w-64 min-h-screen bg-[#D1A054] pt-5">
                <ul className="menu uppercase p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensils />
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <FaList />
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageBookings">
                                        <FaBook />
                                        manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers />
                                        all users
                                    </NavLink>
                                </li>

                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar />
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaMoneyBill />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart />
                                        MyCart ({cart.length}+)
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList />
                                        My Bookings
                                    </NavLink>
                                </li>
                            </>
                    }

                    <div className="divider divider-neutral"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/menu'>
                            <FaBars />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order">
                            <FaShoppingBag />
                            Order
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            <FaMoneyCheck />
                            Contact
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className="flex-1 ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;