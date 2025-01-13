import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";
import tour from "../../assets/travel.png"
import { authContext } from "../AuthProvider/AuthProvider";


const Navbar = () => {
    const {user, handleLogout} = useContext(authContext);
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart();

    return (
        <div className=" navbar flex fixed z-10 bg-opacity-30 items-center justify-between bg-black text-white px-2 md:px-7 lg:px-16 py-3">
            {/* Logo Section */}
            <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <img src={tour} alt="" className="w-10"/>
                <h3 className="text-2xl font-bold">TOUR OF DREAMS</h3>
                </div>

                {/* for sm i want to show hamburger */}
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
                    <li><NavLink to="/" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Home</NavLink></li>
                    <li><NavLink to="/Community" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Community</NavLink></li>
                    {/* {
                        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                    }
                    {
                        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                    } */}
                    <li><NavLink to="/About-Us" className={({ isActive }) => isActive? "text-yellow-500" : ""}>About Us</NavLink></li>
                    <li><NavLink to="/our-shop" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Trips</NavLink></li>
                    {/* <li><NavLink to="/dashboard/cart" className={({ isActive }) => isActive? "text-yellow-500" : ""}>
                    <button className="btn">
                    <FaCartShopping />
                      <div className="badge badge-secondary">+{cart.length}</div>
                    </button>
                    </NavLink></li> */}
              </ul>
            </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex">
                <ul className="flex gap-4">
                <li><NavLink to="/" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Home</NavLink></li>
                    <li><NavLink to="/Community" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Community</NavLink></li>
                    {/* {
                        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                    }
                    {
                        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                    } */}
                    <li><NavLink to="/About-Us" className={({ isActive }) => isActive? "text-yellow-500" : ""}>About Us</NavLink></li>
                    <li><NavLink to="/our-shop" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Trips</NavLink></li>
                    {/* <li><NavLink to="/dashboard/cart" className={({ isActive }) => isActive? "text-yellow-500" : ""}>
                    <button className="btn">
                    <FaCartShopping />
                      <div className="badge badge-secondary">+{cart.length}</div>
                    </button>
                    </NavLink></li> */}
                </ul>
            </div>

            <div className="navbar-end">
              
                {user?.email ? (
                  // Show dropdown with avatar and options if the user is logged in
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="User Avatar"
                          src={user.photoURL}
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-[#c5e1e8] dark:bg-[#1d232a] rounded-box z-[100] mt-3 w-52 p-2 shadow">
                        {/* <h3>{user.name}</h3> */}
              
                        {/* pages */}
                        <li>
                        <NavLink
                        to="/Dashboard"
                        className={({ isActive }) =>
                          isActive
                            ? "text-black dark:text-blue-300"
                            : "text-white dark:text-gray-300"
                          }>
                         Dashboard
                       </NavLink>
                        </li>
              
                       <li>
                       <NavLink
                        to="/liked-artifacts"
                        className={({ isActive }) =>
                          isActive
                            ? "text-black dark:text-blue-300"
                            : "text-white dark:text-gray-300"
                          }>
                        Liked Artifacts
                       </NavLink>
                       </li>
              
                      {/* <li>
                        <NavLink to="/update-profile" className="justify-between">
                          Update Profile
                        </NavLink>
                      </li> */}
                      <li>
                        <button onClick={handleLogout} className="mt-3 w-full p-2 bg-[#3d8396e0]  rounded-md hover:bg-[#357283e0] text-black">Logout</button>
                      </li>
                    </ul>
                    </div>
                  ) : (
                    // Show login button if the user is not logged in
                    <NavLink to="/login" className="btn px-7 font-bold bg-transparent">
                      Log In
                    </NavLink>
                  )}
            </div>
      </div>
    );
};

export default Navbar;
