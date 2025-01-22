import {FaEnvelope, FaHistory, FaHome, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
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

    // const handleJoinAsTourGuide = async () => {
    //     Swal.fire({
    //         title: "Are you sure you want to become a tour guide?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, I want to be a tour guide!"
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             // Action if confirmed
    //             Swal.fire({
    //                 title: "Congratulations!",
    //                 text: "Your request is sent successfully.",
    //                 icon: "success"
    //             });
    
    //             try {
    //                 const {data} = await axiosSecure.patch(`/users/${user?.email}`)
    //                 console.log(data)
    //             } catch (error) {
    //                 console.error('Error in sending request', error);
    //                 Swal.fire({
    //                     title: 'Error!',
    //                     text: error?.response?.data?.message || error.message || 'There was an error. Please try again.',
    //                     icon: 'error'
    //                 });
    //             }
    //         }
    //     });
    // };
    


    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#859F3D] ">
                <ul className="menu p-4">
                    
                {
  role === 'tourist' && (
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
        {/* <button onClick={handleJoinAsTourGuide} className="your-button-class">
          <FaUsers /> Join as tour guide
        </button> */}
        <NavLink to="/dashboard/joinAsTourGuide">
        Join As Tour Guide 
        </NavLink>
      </li>
    </>
  )
}

{
  role === 'tourGuide' && (
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
  )
}

{
  role === 'admin' && (
    <>
      <li>
        <NavLink to="/dashboard/adminProfile">
          <FaUser />
          Manage profile
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/dashboard/paymentHistory">
          <FaList />
          My Assigned Tours
        </NavLink>
      </li> */}
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
  )
}

                        
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-package">
                        <BiTrip />
                            Trips</NavLink>
                    </li>
                    <li>
                        <NavLink to="/community">
                        <FaRegObjectUngroup />
                            Community</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className=" p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;