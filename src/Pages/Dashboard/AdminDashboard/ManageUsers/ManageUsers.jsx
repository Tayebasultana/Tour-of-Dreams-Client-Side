import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select"; 

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState(""); 
    const [roleFilter, setRoleFilter] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1); 
    const usersPerPage = 10;  

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const roleOptions = [
        { value: 'tourist', label: 'Tourist' },
        { value: 'tourGuide', label: 'TourGuide' },
        { value: 'admin', label: 'Admin' },
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter ? user.role === roleFilter.value : true;
        return matchesSearchTerm && matchesRole;
    });

    // Paginate filtered users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Total pages
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
                        {currentUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center my-7 ">
                <button 
                    className="btn bg-[#859f3d] mr-2" 
                    disabled={currentPage === 1} 
                    onClick={() => paginate(currentPage - 1)}
                >
                    Previous
                </button>

                <span className="my-auto">{`Page ${currentPage} of ${totalPages}`}</span>

                <button 
                    className="btn bg-[#859f3d] ml-2" 
                    disabled={currentPage === totalPages} 
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageUsers;
