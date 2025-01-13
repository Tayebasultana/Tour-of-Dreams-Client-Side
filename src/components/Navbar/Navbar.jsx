import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
// import { authContext } from "./AuthProvider/AuthProvider";
import { useContext } from "react";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";


const Navbar = () => {
    // const {user, handleLogout} = useContext(authContext);
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart();

    return (
        <div className=" navbar flex fixed z-10 bg-opacity-30 items-center justify-between bg-black text-white px-2 md:px-7 lg:px-16 py-3">
            {/* Logo Section */}
            <div className="flex gap-4">

                <div>
                <h3 className="text-2xl font-bold">BISTRO BOSS</h3>
                <p className="text-sm">Restaurant</p>
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
                    <li><NavLink to="/contact" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Contact us</NavLink></li>
                    {/* {
                        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                    }
                    {
                        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                    } */}
                    <li><NavLink to="/our-menu" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Our Menu</NavLink></li>
                    <li><NavLink to="/our-shop" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Our Shop</NavLink></li>
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
                    <li><NavLink to="/contact" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Contact us</NavLink></li>
                    {/* {
                        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                    }
                    {
                        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                    } */}
                    <li><NavLink to="/our-menu" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Our Menu</NavLink></li>
                    <li><NavLink to="/our-shop" className={({ isActive }) => isActive? "text-yellow-500" : ""}>Our Shop</NavLink></li>
                    {/* <li><NavLink to="/dashboard/cart" className={({ isActive }) => isActive? "text-yellow-500" : ""}>
                    <button className="btn">
                    <FaCartShopping />
                      <div className="badge badge-secondary">+{cart.length}</div>
                    </button>
                    </NavLink></li> */}
                </ul>
            </div>
            {/* <div className="">
            {
              user?.email ? 
              (<div className="flex gap-2 items-center">
                <img src={user.photoURL} alt="" className="rounded-full w-10 h-10"/>
                <button onClick={handleLogout} className="btn px-7 font-bold text-blue-950">log out</button>
              </div>) : 
              (<div>
                <NavLink to="/login"
                 className="btn px-7 font-bold text-blue-950">log-in
                </NavLink>
              </div>)
            }
            </div> */}
        </div>
    );
};

export default Navbar;
