import { useContext, useState } from "react";
// import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { imageUpload } from "../../../api/utils";
import  { authContext } from "../../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AddStory = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useContext(authContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before submitting
        
        const form = e.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const imageURL = await imageUpload(image);
        const category = form.category.value;
        const destination = form.destination.value;
        const travelStartDate = form.travelStartDate.value;
        const travelEndDate = form.travelEndDate.value;
        const modeOfTransportation = form.modeOfTransportation.value;
        const accommodation = form.accommodation.value;
        const purposeOfTravel = form.purposeOfTravel.value;
        const budget = form.budget.value;
        const activities = form.activities.value;
        const expense = form.expense.value;
        const tourGuide = {
              name:user?.displayName,
              image:user?.photoURL,
              email:user?.email
        }
        
        const storyData = {
            name,
            category,
            destination,
            travelStartDate,
            travelEndDate,
            modeOfTransportation,
            accommodation,
            purposeOfTravel,
            budget,
            activities,
            expense,
            imageURL,
            tourGuide 
        };
    // console.log(storyData)

    axiosPublic.post("/stories", storyData)
    .then((res) => {
        if (res.data.insertedId) {
            toast.success('Item successfully added!');
            form.reset();
        } else {
            toast.error('Item could not be added.');
        }
    })
    .catch((err) => {
        toast.error('An error occurred while adding the item.');
        console.error(err); // Log the error for debugging
    });

    };

    

    return (
        <div className="max-w-5xl mx-auto">
            <h3 className="text-4xl mb-10 text-center">Add Story</h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name of the Place */}
                    <div>
                        <label className="block font-bold mb-1">Name of the Place</label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full"
                            placeholder="Name of the place"
                            required
                        />
                    </div>

                    {/* Category (Travel Type) */}
                    <div>
                        <label className="block font-bold mb-1">Category (Travel Type)</label>
                        <select
                            name="category"
                            className="input input-bordered w-full"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Historical">Historical</option>
                            <option value="Nature">Nature</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Adventure">Adventure</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="input input-bordered flex items-center gap-2 mt-7">
                          <span>Upload Image</span>
                          <input type="file" name="image" accept="image/*" required />
                        </label>
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block font-bold mb-1">Destination</label>
                        <input
                            type="text"
                            name="destination"
                            className="input input-bordered w-full"
                            placeholder="Destination"
                            required
                        />
                    </div>

                    {/* Travel Start Date */}
                    <div>
                        <label className="block font-bold mb-1">Travel Start Date</label>
                        <input
                            type="date"
                            name="travelStartDate"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Travel End Date */}
                    <div>
                        <label className="block font-bold mb-1">Travel End Date</label>
                        <input
                            type="date"
                            name="travelEndDate"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Mode of Transportation */}
                    <div>
                        <label className="block font-bold mb-1">Mode of Transportation</label>
                        <select
                            name="modeOfTransportation"
                            className="input input-bordered w-full"
                            required
                        >
                            <option value="">Select Mode of Transportation</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Car">Car</option>
                            <option value="Plane">Plane</option>
                        </select>
                    </div>

                    {/* Accommodation */}
                    <div>
                        <label className="block font-bold mb-1">Accommodation</label>
                        <select
                            name="accommodation"
                            className="input input-bordered w-full"
                            required
                        >
                            <option value="">Select Accommodation</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Hostel">Hostel</option>
                            <option value="Guesthouse">Guesthouse</option>
                            <option value="Homestay">Homestay</option>
                        </select>
                    </div>

                    {/* Purpose of Travel */}
                    <div>
                        <label className="block font-bold mb-1">Purpose of Travel</label>
                        <select
                            name="purposeOfTravel"
                            className="input input-bordered w-full"
                            required
                        >
                            <option value="">Select Purpose</option>
                            <option value="Leisure">Leisure</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Adventure">Adventure</option>
                        </select>
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block font-bold mb-1">Budget</label>
                        <input
                            type="text"
                            name="budget"
                            className="input input-bordered w-full"
                            placeholder="Budget"
                            required
                        />
                    </div>

                    {/* Activities */}
                    <div>
                        <label className="block font-bold mb-1">Activities</label>
                        <textarea
                            name="activities"
                            className="input input-bordered w-full"
                            placeholder="Activities"
                            required
                        ></textarea>
                    </div>

                    {/* Expenses */}
                    <div>
                        <label className="block font-bold mb-1">Expense Breakdown</label>
                        <input
                            type="text"
                            name="expense"
                            className="input input-bordered w-full"
                            placeholder="Expense Breakdown"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn w-full text-black text-bold text-lg bg-[#F6FCDF] hover:bg-[#859F3D] mt-4">
                {loading ? (
                    <ImSpinner9 className="animate-spin mr-2" /> // Show spinner when loading
                  ) : (
                    "Submit Story"
                  )}
                </button>
            </form>

            {/* Display Error */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
    );
};

export default AddStory;
