import { useContext, useEffect } from "react";
import { authContext } from "../AuthProvider/AuthProvider"; 
import useRole from "../../hooks/useRole"; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 

const Profile = () => {
    const { user, setUser } = useContext(authContext);
    const [role, isLoading] = useRole();
    const navigate = useNavigate();

    const checkToken = () => {
        const token = localStorage.getItem("access-token");
        if (!token) {
            toast.error("Your session has expired. Please log in again.");
        }
    };

    useEffect(() => {
        checkToken();
    }, [setUser]);

    const handleApplyForTourGuide = () => {
        navigate("/dashboard/joinAsTourGuide");
    };

    const handleEditProfile = () => {
        navigate("/dashboard/updateProfile");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6FCDF] p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
                {/* Welcome Message */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, {user.displayName || "User"}!</h2>
                
                {/* User Image */}
                <img
                    src={user.photoURL || "default-profile-pic.jpg"}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                
                {/* User Role */}
                <p className="uppercase text-gray-600">{role}</p>

                {/* User Name */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {user.displayName || "No Name Provided"}
                </h3>

                {/* User Email */}
                <p className="text-gray-600 text-sm mb-4">{user.email || "No email provided"}</p>

                {/* Edit Button */}
                <button
                    onClick={handleEditProfile}
                    className="btn bg-[#F6FCDF] text-black px-4 py-2 mr-2 rounded-lg shadow-lg mb-4"
                >
                    Edit Profile
                </button>

                {/* Conditionally Render Apply for Tour Guide Button */}
                {role !== "tourGuide" && (
                    <button
                        onClick={handleApplyForTourGuide}
                        className="btn bg-[#F6FCDF] text-black px-4 py-2 rounded-lg shadow-lg"
                    >
                        Apply for Tour Guide
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default Profile;
