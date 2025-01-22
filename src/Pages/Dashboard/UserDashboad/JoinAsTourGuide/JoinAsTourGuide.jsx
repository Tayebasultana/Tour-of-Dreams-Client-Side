import { useContext, useState } from "react";
import toast from "react-hot-toast"; 
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { authContext } from "../../../../components/AuthProvider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const JoinAsTourGuide = () => {
    const [applicationTitle, setApplicationTitle] = useState("");
    const [whyTourGuide, setWhyTourGuide] = useState("");
    const [cvLink, setCvLink] = useState("");
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(authContext);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!applicationTitle || !whyTourGuide || !cvLink) {
            toast.error("Please fill in all the fields.");
            return;
        }
    
        try {
            // Sending the form data to the API endpoint
            const { data } = await axiosPublic.patch(`/users/${user?.email}`, {
                applicationTitle,
                whyTourGuide,
                cvLink,
            });
    
            console.log(data);
    
            // Reset the form after successful submission
            setApplicationTitle("");
            setWhyTourGuide("");
            setCvLink("");
    
            toast.success("Your application has been submitted successfully!");
        } catch (error) {
            console.error('Error in sending request', error);
            toast.error(error?.response?.data?.message || error.message || 'There was an error. Please try again.');
        }
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6FCDF] p-4 ">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Join as a Tour Guide</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Application Title */}
                    <div className="my-4">
                        <label htmlFor="applicationTitle" className="block text-gray-700">Application Title:</label>
                        <input
                            type="text"
                            id="applicationTitle"
                            value={applicationTitle}
                            onChange={(e) => setApplicationTitle(e.target.value)}
                            className="input w-full mt-2 bg-[#F6FCDF]"
                            placeholder="Enter title"
                            required
                        />
                    </div>

                    {/* Why do you want to be a Tour Guide */}
                    <div className="my-4">
                        <label htmlFor="whyTourGuide" className="block text-gray-700">Why do you want to be a Tour Guide?</label>
                        <textarea
                            id="whyTourGuide"
                            value={whyTourGuide}
                            onChange={(e) => setWhyTourGuide(e.target.value)}
                            className="input w-full mt-2 bg-[#F6FCDF] "
                            placeholder="Explain why"
                            required
                        />
                    </div>

                    {/* CV Link */}
                    <div className="my-4">
                        <label htmlFor="cvLink" className="block text-gray-700">CV Link:</label>
                        <input
                            type="url"
                            id="cvLink"
                            value={cvLink}
                            onChange={(e) => setCvLink(e.target.value)}
                            className="input w-full mt-2 bg-[#F6FCDF]"
                            placeholder="Enter your CV link"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn bg-[#F6FCDF] text-black px-4 py-2 rounded-lg shadow-lg"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinAsTourGuide;
