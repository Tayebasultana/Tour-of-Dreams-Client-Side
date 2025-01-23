import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { authContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const StoryUpdate = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [updatedStory, setUpdatedStory] = useState({});
    const { user } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching story details by id
        const fetchStory = async () => {
            try {
                const response = await axios.get(`https://tour-of-dreams-server-side.vercel.app/dashboard/story/${id}`);
                setStory(response.data);
                setUpdatedStory(response.data); 
            } catch (error) {
                console.error('Error fetching story details:', error);
            }
        };
        fetchStory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`https://tour-of-dreams-server-side.vercel.app/dashboard/story-update/${id}`, updatedStory);
            if (response.status === 200) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your story has been updatedd.",
                    icon: "success"
                });
                navigate(`/dashboard/stories/${user?.email}`);
            }
        } catch (error) {
            console.error('Error updating the story:', error);
        }
    };

    if (!story) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Update Story</h2>
            <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-7">
                {/* Category */}
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-lg font-medium text-gray-700 mb-2">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={updatedStory.category || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Destination */}
                <div className="flex flex-col">
                    <label htmlFor="destination" className="text-lg font-medium text-gray-700 mb-2">Destination</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={updatedStory.destination || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Travel Start Date */}
                <div className="flex flex-col">
                    <label htmlFor="travelStartDate" className="text-lg font-medium text-gray-700 mb-2">Travel Start Date</label>
                    <input
                        type="date"
                        id="travelStartDate"
                        name="travelStartDate"
                        value={updatedStory.travelStartDate || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Travel End Date */}
                <div className="flex flex-col">
                    <label htmlFor="travelEndDate" className="text-lg font-medium text-gray-700 mb-2">Travel End Date</label>
                    <input
                        type="date"
                        id="travelEndDate"
                        name="travelEndDate"
                        value={updatedStory.travelEndDate || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Mode of Transportation */}
                <div className="flex flex-col">
                    <label htmlFor="modeOfTransportation" className="text-lg font-medium text-gray-700 mb-2">Mode of Transportation</label>
                    <input
                        type="text"
                        id="modeOfTransportation"
                        name="modeOfTransportation"
                        value={updatedStory.modeOfTransportation || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Accommodation */}
                <div className="flex flex-col">
                    <label htmlFor="accommodation" className="text-lg font-medium text-gray-700 mb-2">Accommodation</label>
                    <input
                        type="text"
                        id="accommodation"
                        name="accommodation"
                        value={updatedStory.accommodation || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Purpose of Travel */}
                <div className="flex flex-col">
                    <label htmlFor="purposeOfTravel" className="text-lg font-medium text-gray-700 mb-2">Purpose of Travel</label>
                    <input
                        type="text"
                        id="purposeOfTravel"
                        name="purposeOfTravel"
                        value={updatedStory.purposeOfTravel || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Budget */}
                <div className="flex flex-col">
                    <label htmlFor="budget" className="text-lg font-medium text-gray-700 mb-2">Budget</label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={updatedStory.budget || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Expense */}
                <div className="flex flex-col">
                    <label htmlFor="expense" className="text-lg font-medium text-gray-700 mb-2">Expense</label>
                    <input
                        type="number"
                        id="expense"
                        name="expense"
                        value={updatedStory.expense || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                {/* Activities */}
                <div className="flex flex-col">
                    <label htmlFor="activities" className="text-lg font-medium text-gray-700 mb-2">Activities</label>
                    <input
                        type="text"
                        id="activities"
                        name="activities"
                        value={updatedStory.activities || ''}
                        onChange={handleChange}
                        required
                        className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
                    />
                </div>

                <div className="md:col-span-2">
                    {/* Submit Button */}
                <button type="submit" className="btn text-black bg-[#F6FCDF] px-7 py-3 rounded-lg shadow-lg hover:bg-[#859F3D] mt-6 w-full ">
                    Update Story
                </button>
                </div>
            </form>
        </div>
    );
};

export default StoryUpdate;
