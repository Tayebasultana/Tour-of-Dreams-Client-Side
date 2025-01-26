import { FaEnvelope, FaHistory, FaHome, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
import { MdManageAccounts, MdOutlinePostAdd } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { RiAddLargeLine } from "react-icons/ri";
import { SiAwssecretsmanager } from "react-icons/si";
import { BiTrip } from "react-icons/bi";
import { FaCalendar, FaList, FaRegObjectUngroup, FaUser } from "react-icons/fa6";
import { TbBrandBooking, TbBrandStorybook } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [role, isLoading] = useRole();

    return (
        <div className="flex">
          {/* Sidebar for large screens (left side) */}
          <div className="lg:block hidden w-80 bg-[#859f3d] p-4">
                <ul className="menu text-base-content min-h-full">
                    {/* Sidebar content based on user role */}
                    {role === 'tourist' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/userProfile">
                                    <FaUser />
                                    Manage profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/bookings/${user?.email}`}>
                                    <TbBrandBooking />
                                    My Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/payments/${user.email}`}>
                                    <FaHistory />
                                    My Payment History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/stories/${user?.email}`}>
                                    <TbBrandStorybook />
                                    Manage Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addStory">
                                    <RiAddLargeLine />
                                    Add Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/joinAsTourGuide">
                                    Join As Tour Guide
                                </NavLink>
                            </li>
                        </>
                    )}
                    {role === 'tourGuide' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/tourGuideProfile">
                                    <FaUser />
                                    Manage profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-assigned-tour">
                                    <FaCalendar />
                                    My Assigned Tours
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addStory">
                                    <RiAddLargeLine />
                                    Add Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/stories/${user?.email}`}>
                                    <TbBrandStorybook />
                                    Manage Stories
                                </NavLink>
                            </li>
                        </>
                    )}
                    {role === 'admin' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <FaUser />
                                    Manage profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addStory">
                                    <RiAddLargeLine />
                                    Add Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/stories/${user?.email}`}>
                                    <SiStorybook />
                                    Manage Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/packageForm">
                                    <MdOutlinePostAdd />
                                    Add Package
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <MdManageAccounts />
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageCandidates">
                                    <SiAwssecretsmanager />
                                    Manage Candidates
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-package">
                            <BiTrip />
                            Trips
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/community">
                            <FaRegObjectUngroup />
                            Community
                        </NavLink>
                    </li>
                </ul>
          </div>

            {/* Drawer for small and medium screens */}
            <div className="drawer drawer-mobile">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Button to open the drawer for small and medium screens */}
                    <label htmlFor="my-drawer" className="btn bg-[#859f3d] drawer-button lg:hidden fixed top-0 left-0 z-5">
                        Open Sidebar
                    </label>

                    {/* Main dashboard content */}
                    <div className="flex-1 p-8">
                        <Outlet></Outlet>
                    </div>
                </div>

                {/* Sidebar content (this will be shown for mobile and tablet) */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content based on user role */}
                        {role === 'tourist' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/userProfile">
                                        <FaUser />
                                        Manage profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/dashboard/bookings/${user?.email}`}>
                                        <TbBrandBooking />
                                        My Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/dashboard/payments/${user.email}`}>
                                        <FaHistory />
                                        My Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/dashboard/stories/${user?.email}`}>
                                        <TbBrandStorybook />
                                        Manage Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addStory">
                                        <RiAddLargeLine />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/joinAsTourGuide">
                                        Join As Tour Guide
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {role === 'tourGuide' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/tourGuideProfile">
                                        <FaUser />
                                        Manage profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-assigned-tour">
                                        <FaCalendar />
                                        My Assigned Tours
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addStory">
                                        <RiAddLargeLine />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/dashboard/stories/${user?.email}`}>
                                        <TbBrandStorybook />
                                        Manage Stories
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                        <FaUser />
                                        Manage profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addStory">
                                        <RiAddLargeLine />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/dashboard/stories/${user?.email}`}>
                                        <SiStorybook />
                                        Manage Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/packageForm">
                                        <MdOutlinePostAdd />
                                        Add Package
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <MdManageAccounts />
                                        Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageCandidates">
                                        <SiAwssecretsmanager />
                                        Manage Candidates
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Shared nav links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-package">
                                <BiTrip />
                                Trips
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/community">
                                <FaRegObjectUngroup />
                                Community
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
