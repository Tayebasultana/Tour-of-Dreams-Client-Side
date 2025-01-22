import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const auth = getAuth();
    const user = auth.currentUser; 
    const navigate = useNavigate();

    const [name, setName] = useState(user.displayName || "");  
    const [photoURL, setPhotoURL] = useState(user.photoURL || "");  

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL,
            });
            toast.success("Profile successfully updated!");
            navigate('/dashboard/userProfile')
        } catch (error) {
            console.error("Error caught during updated profile:", error);
            alert("Error caught during updated profile.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Update Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="photoURL" className="font-medium">Profile Picture URL</label>
                    <input
                        type="text"
                        id="photoURL"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
