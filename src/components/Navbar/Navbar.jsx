import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import tour from "../../assets/travel.png"
import { authContext } from "../AuthProvider/AuthProvider";
import useRole from "../../hooks/useRole";

const Navbar = () => {
    const { user, handleLogout } = useContext(authContext);
    const [role, isRoleLoading] = useRole(); 

    // Function to handle profile redirection based on role
    const getDashboardLink = () => {
        if (role === "tourist") {
            return "/dashboard/userProfile";
        } else if (role === "tourGuide") {
            return "/dashboard/tourGuideProfile";
        } else if (role === "admin") {
            return "/dashboard/adminProfile";
        } else {
            return "/dashboard"; 
        }
    };

    return (
        <div className="navbar flex fixed z-10 bg-opacity-30 items-center justify-between bg-black text-white px-2 md:px-7 lg:px-16 py-3">
            {/* Logo Section */}
            <div className="flex gap-4 items-center navbar-start">
                <div className="flex gap-2 items-center">
                    <img src={tour} alt="" className="w-10"/>
                    <h3 className="text-2xl font-bold text-white">TOUR OF DREAMS</h3>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex navbar-center">
                <ul className="flex gap-4">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "text-black" : ""}>Home</NavLink></li>
                    <li><NavLink to="/community" className={({ isActive }) => isActive ? "text-black" : ""}>Community</NavLink></li>
                    <li><NavLink to="/about-us" className={({ isActive }) => isActive ? "text-black" : ""}>About Us</NavLink></li>
                    <li><NavLink to="/all-package" className={({ isActive }) => isActive ? "text-black" : ""}>Trips</NavLink></li>
                </ul>
            </div>
            {/* Hamburger menu for small screens */}
            <div className="dropdown md:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow text-black">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "text-black" : ""}>Home</NavLink></li>
                    <li><NavLink to="/community" className={({ isActive }) => isActive ? "text-black" : ""}>Community</NavLink></li>
                    <li><NavLink to="/about-us" className={({ isActive }) => isActive ? "text-black" : ""}>About Us</NavLink></li>
                    <li><NavLink to="/all-package" className={({ isActive }) => isActive ? "text-black" : ""}>Trips</NavLink></li>
                </ul>
            </div>

            <div className="navbar-end">
                {user?.email ? (
                    <div className="dropdown dropdown-end text-black">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="User Avatar" src={user.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="text-center menu menu-sm dropdown-content bg-[#F6FCDF] rounded-box z-[100] mt-3 w-52 p-2 shadow">
                            <p>{user.email}</p>
                            <h3>{user.displayName ? user.displayName : "No name"}</h3>

                            {/* Conditional redirect to profile based on role */}
                            <li>
                                <NavLink
                                    to={isRoleLoading ? "#" : getDashboardLink()} // Disable link if role is still loading
                                    className={({ isActive }) =>
                                        isActive ? "text-[#859F3D]" : "text-black"
                                    }>
                                    Dashboard
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="mt-3 w-full p-2 bg-[#859F3D] rounded-md hover:bg-[#758c35] text-black">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <NavLink to="/login" className="btn px-7 font-bold bg-[#f6fcdf] rounded-md hover:bg-[#bdcd90] text-black">
                        Log In
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
