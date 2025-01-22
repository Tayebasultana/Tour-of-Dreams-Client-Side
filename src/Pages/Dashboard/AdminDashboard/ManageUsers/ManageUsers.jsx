import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select"; 

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState(""); 
    const [roleFilter, setRoleFilter] = useState(""); 

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const roleOptions = [
        // { value: '', label: 'All Roles' },
        { value: 'tourist', label: 'Tourist' },
        { value: 'tourGuide', label: 'TourGuide' },
        { value: 'admin', label: 'Admin' },
    ];

    // const handleMakeAdmin = user => {
    //     axiosSecure.patch(`/users/admin/${user._id}`)
    //         .then(res => {
    //             if (res.data.modifiedCount > 0) {
    //                 refetch();
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: `${user.name} is now an Admin!`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })
    // };

    const filteredUsers = users.filter(user => {
        const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter ? user.role === roleFilter.value : true;
        return matchesSearchTerm && matchesRole;
    });

    return (
        <div>
            <div className="flex justify-between items-center my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {filteredUsers.length}</h2>
            </div>

            <div className="flex justify-between mb-4">
                
                <input
                    type="text"
                    placeholder="Search by Name or Email"
                    className="input input-bordered w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                
                <Select
                    options={roleOptions}
                    value={roleFilter}
                    onChange={setRoleFilter}
                    placeholder="Filter by Role"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
