import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyBooking = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    // useQuery to fetch bookings
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
                    text: "Do you want to cancel this application?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, cancel it!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            // Delete the user's application using id
                            await axiosSecure.delete(`/booking/${id}`);
        
                            // Refresh the user list after deletion
                            refetch();
        
                            Swal.fire({
                                title: 'Canceled!',
                                text: 'The application has been canceled.',
                                icon: 'success'
                            });
                        } catch (error) {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Something went wrong while canceling the application.',
                                icon: 'error'
                            });
                            console.error('Error canceling user:', error);
                        }
                    }
                });
    }

    const handlePayment = (bookingId, price) => {
        navigate(`/dashboard/payment/${bookingId}/${price}`);
    };
    

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
            
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
    );
};

export default MyBooking;
