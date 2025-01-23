import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth"; 
import toast from "react-hot-toast";
import Swal from "sweetalert2"; 

const MyAssignedTour = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 

    const { data: tours = [], error, isLoading, refetch } = useQuery(
        ["assignedTours", user?.email], 
        async () => {
            const res = await axiosSecure.get(`/assigned-tours?tourGuide=${user?.email}`);
            return res.data;
        },
        {
            enabled: !!user?.email, 
        }
    );

    if (isLoading) {
        return <div>Loading tours...</div>;
    }

    if (error) {
        return <div>Error fetching assigned tours.</div>;
    }

    const handleAccept = async (tourId) => {
        try {
            const res = await axiosSecure.put(`/assigned-tours/${tourId}`, { status: 'accepted' });
            toast.success("Tour status updated to accepted!");
            refetch();
        } catch (error) {
            console.error("Error updating tour status:", error);
            alert("Failed to update the tour status.");
        }
    };

    const handleReject = async (tourId) => {     
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then(async (result) => {  // Ensure async function for await
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.put(`/assigned-tours/rejected/${tourId}`, { status: 'rejected' });
                    toast.success("Tour status updated to rejected!");
                    refetch();
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong while rejecting the tour.",
                        icon: "error"
                    });
                    console.error('Error rejecting the tour:', error);
                }
            }
        });
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl text-center mb-10">My Assigned Tours</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="p-4 border-b">Package Name</th>
                        <th className="p-4 border-b">Tourist Name</th>
                        <th className="p-4 border-b">Tour Date</th>
                        <th className="p-4 border-b">Tour Price</th>
                        <th className="p-4 border-b">Status</th>
                        <th className="p-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour._id}>
                            <td className="p-4 border-b ">{tour.packageName}</td>
                            <td className="p-4 border-b ">{tour.touristName}</td>
                            <td className="p-4 border-b ">{new Date(tour.tourDate).toLocaleDateString()}</td>
                            <td className="p-4 border-b ">${tour.price}</td>
                            <td
                              className={`p-4 border-b 
                                ${tour.status === 'pending' ? 'text-gray-500' : ''}
                                ${tour.status === 'in-review' ? 'text-yellow-500' : ''}
                                ${tour.status === 'accepted' ? 'text-green-500' : ''}
                                ${tour.status === 'rejected' ? 'text-red-500' : ''}
                              `}
                            >
                              {tour.status}
                            </td>
                            <td className="p-4 border-b grid grid-cols-2 justify-items-center">
                               <div>
                                   {tour.status === "in-review" && (
                                       <button onClick={() => handleAccept(tour._id)} className="btn bg-green-500 text-white">
                                           Accept
                                       </button>
                                   )}
                                   {tour.status === "pending" && (
                                       <button className="btn bg-gray-500 text-white" disabled>
                                           Accept (Pending)
                                       </button>
                                   )}
                               </div>
                               {tour.status === 'accepted' || tour.status === 'rejected' || tour.status === 'in-review' ? (
                                    <div>
                                        <button className="btn bg-red-500 text-white" disabled>
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => handleReject(tour._id)} className="btn bg-red-500 text-white">
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyAssignedTour;
