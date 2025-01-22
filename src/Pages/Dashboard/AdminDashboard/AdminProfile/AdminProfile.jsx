import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetching admin statistics using React Query
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header Section */}
            <div className="p-6 bg-blue-500 text-white">
                <h2 className="text-3xl">
                    <span>Hi, Welcome </span>
                    {user?.displayName ? user.displayName : 'Back'}
                </h2>
            </div>

            {/* Admin Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
                {/* Revenue */}
                <div className="stat bg-white shadow-md rounded-md p-6">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className='text-3xl' />
                    </div>
                    <div className="stat-title text-xl font-semibold">Revenue</div>
                    <div className="stat-value text-3xl">${stats.revenue || 0}</div>
                    <div className="stat-desc text-sm text-gray-500">Jan 1st - Feb 1st</div>
                </div>

                {/* Users */}
                <div className="stat bg-white shadow-md rounded-md p-6">
                    <div className="stat-figure text-secondary">
                        <FaUsers className='text-3xl' />
                    </div>
                    <div className="stat-title text-xl font-semibold">Users</div>
                    <div className="stat-value text-3xl">{stats.users || 0}</div>
                    <div className="stat-desc text-sm text-gray-500">↗︎ 400 (22%)</div>
                </div>

                {/* Tourist */}
                <div className="stat bg-white shadow-md rounded-md p-6">
                    <div className="stat-figure text-secondary">
                        <FaUsers className='text-3xl' />
                    </div>
                    <div className="stat-title text-xl font-semibold">Tourist</div>
                    <div className="stat-value text-3xl">{stats.touristCount || 0}</div>
                    <div className="stat-desc text-sm text-gray-500">↗︎ 400 (22%)</div>
                </div>

                {/* Tour Guide */}
                <div className="stat bg-white shadow-md rounded-md p-6">
                    <div className="stat-figure text-secondary">
                        <FaUsers className='text-3xl' />
                    </div>
                    <div className="stat-title text-xl font-semibold">Tour Guide</div>
                    <div className="stat-value text-3xl">{stats.tourGuideCount || 0}</div>
                    <div className="stat-desc text-sm text-gray-500">↗︎ 400 (22%)</div>
                </div>

                {/* Stories */}
                <div className="stat bg-white shadow-md rounded-md p-6">
                    <div className="stat-figure text-secondary">
                        <FaBook className='text-3xl' />
                    </div>
                    <div className="stat-title text-xl font-semibold">Stories</div>
                    <div className="stat-value text-3xl">{stats.stories || 0}</div>
                    <div className="stat-desc text-sm text-gray-500">↗︎ 400 (22%)</div>
                </div>

                {/* Packages */}
                <div className="stat bg-white shadow-md rounded-md p-6">
                    <div className="stat-figure text-secondary">
                        <FaBook className='text-3xl' />
                    </div>
                    <div className="stat-title text-xl font-semibold">Packages</div>
                    <div className="stat-value text-3xl">{stats.packages || 0}</div>
                    <div className="stat-desc text-sm text-gray-500">↗︎ 400 (22%)</div>
                </div>

                {/* Booking */}
                <div className="stat bg-white shadow-md rounded-md p-6">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                    </div>
                    <div className="stat-title text-xl font-semibold">Booking</div>
                    <div className="stat-value text-3xl">{stats.bookings || 0}</div>
                    <div className="stat-desc text-sm text-gray-500">↘︎ 90 (14%)</div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="py-20 flex flex-col items-center justify-center bg-[#F6FCDF] p-4">
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
                    <p className="uppercase text-gray-600">{user.role || "Admin"}</p>

                    {/* User Name */}
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {user.displayName || "No Name Provided"}
                    </h3>

                    {/* User Email */}
                    <p className="text-gray-600 text-sm mb-4">{user.email || "No email provided"}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
