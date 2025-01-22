import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';

const ManageCandidates = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch users list and filter out admin
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            // Filter out admin users
            return res.data.filter(user => user.role !== 'admin');
        }
    });

    // Handle accepting the user and updating their role to 'tourGuide'
    const handleAccept = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to accept this application and make this user a Tour Guide?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log('Updating user:', email); 
                    await axiosSecure.patch(`/users/role/${email}`, { role: 'tourGuide' });
                    refetch();
                    Swal.fire({
                        title: 'Accepted!',
                        text: 'The user has been made a Tour Guide.',
                        icon: 'success'
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong while accepting the user.',
                        icon: 'error'
                    });
                    console.error('Error accepting user:', error);
                }
            }
        });
    };
    

    // Handle rejecting the user by deleting the application
    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Delete the user's application using id
                    await axiosSecure.delete(`/user/${id}`);

                    // Refresh the user list after deletion
                    refetch();

                    Swal.fire({
                        title: 'Rejected!',
                        text: 'The application has been rejected.',
                        icon: 'success'
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong while rejecting the application.',
                        icon: 'error'
                    });
                    console.error('Error rejecting user:', error);
                }
            }
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl text-center my-6">Manage Applications</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td
                                    className="p-4 border-b"
                                    style={{
                                        color: user.status === 'requested' ? 'green' : '',
                                        color: user.status === 'verified' ? 'blue' : '',
                                    }}
                                >
                                    {user.status ? user.status : 'unAvailable'}
                                </td>
                                <td className="text-center">
                                    {/* Accept button */}
                                    <button
                                        onClick={() => handleAccept(user.email)}
                                        className="btn btn-success mr-2"
                                        disabled={user.status !== 'requested'} 
                                    >
                                        <FaCheckCircle />
                                    </button>

                                    {/* Reject button */}
                                    <button
                                        onClick={() => handleReject(user._id)} 
                                        className="btn bg-red-600"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCandidates;
