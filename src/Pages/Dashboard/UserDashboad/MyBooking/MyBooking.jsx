import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Confetti from 'react-confetti'; 
import { motion } from 'framer-motion'; 
import { useState, useEffect } from "react";

const MyBooking = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [timeout, setTimeout] = useState(false);

    const { data: bookings, error, isLoading, refetch } = useQuery(
        ["bookings", user?.email], 
        async () => {
            const res = await axiosSecure.get(`/dashboard/bookings/${user.email}`);
            return res.data;
        },
        {
            enabled: !!user?.email, 
        }
    );

    if (isLoading) {
        return <div>Loading bookings...</div>;
    }

    if (error) {
        return <div>Error fetching bookings.</div>;
    }

    const handleDeleteBooking = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/booking/${id}`);
                    refetch();
                    Swal.fire("Canceled!", "The booking has been canceled.", "success");
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong while canceling the booking.", "error");
                }
            }
        });
    };

    const handlePayment = (bookingId, price) => {
        navigate(`/dashboard/payment/${bookingId}/${price}`);
    };

    const hasMoreThanThreeBookings = bookings?.length >= 3;

    // Use useEffect to handle animation completion after 5 seconds
    // const [animationComplete, setAnimationComplete] = useState(false);

    // useEffect(() => {
    //     if (hasMoreThanThreeBookings) {
    //         const timer = setTimeout(() => {
    //             setAnimationComplete(true);  
    //         }, 5000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [hasMoreThanThreeBookings]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">My Bookings</h1>

            {/* Show Confetti if more than 3 bookings */}
            {hasMoreThanThreeBookings && (
                <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                    <Confetti />
                </div>
            )}

            {/* Congratulatory Message with Animation */}
            {hasMoreThanThreeBookings && (
                <motion.div
                    className="bg-green-300 p-6 mb-6 rounded-md shadow-lg"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 25, }}
                >
                    <h2 className="text-2xl font-semibold text-center text-white">
                        Congratulations! You have earned a discount for your 3 bookings!
                    </h2>
                    <button
                        className="bg-yellow-500 text-white p-2 rounded mt-4 mx-auto block"
                        onClick={() => alert("Apply Discount")}
                    >
                        Apply Discount
                    </button>
                </motion.div>
            )}

            {/* Bookings Table */}
            <div className="overflow-x-auto w-full max-w-5xl">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 border-b">Package Name</th>
                            <th className="p-4 border-b">Tour Guide</th>
                            <th className="p-4 border-b">Tour Date</th>
                            <th className="p-4 border-b">Price</th>
                            <th className="p-4 border-b">Status</th>
                            <th className="p-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking) => (
                            <tr key={booking._id} className="text-center">
                                <td className="p-4 border-b">{booking.packageName}</td>
                                <td className="p-4 border-b">{booking.tourGuide}</td>
                                <td className="p-4 border-b">{new Date(booking.tourDate).toLocaleDateString()}</td>
                                <td className="p-4 border-b">${booking.price}</td>
                                <td className="p-4 border-b">
                                    <span
                                        className={`p-2 rounded ${booking.status === "In Review" ? "bg-yellow-300" : booking.status === "Rejected" ? "bg-red-300" : booking.status === "Accepted" ? "bg-green-300" : "bg-gray-300"}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-4 border-b">
                                    {booking.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handlePayment(booking._id, booking.price)}
                                                className="bg-blue-500 text-white p-2 rounded mr-4"
                                            >
                                                Pay
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBooking(booking._id)}
                                                className="bg-red-500 text-white p-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;
