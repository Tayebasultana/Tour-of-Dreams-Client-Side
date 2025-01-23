import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { authContext } from '../AuthProvider/AuthProvider';

const StoryDetails = () => {
    const { id } = useParams(); 
    const [story, setStory] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(authContext);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get(`https://tour-of-dreams-server-side.vercel.app/dashboard/story/${id}`);
                setStory(response.data);
            } catch (error) {
                console.error('Error fetching the story details:', error);
            }
        };

        fetchStory();
    }, [id]);

    if (!story) {
        return <div>Loading...</div>;
    }

    const handleDelete = (_id) => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://tour-of-dreams-server-side.vercel.app/story/${_id}`, {
                    method: 'DELETE'
                })
                
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to delete the story");
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your story has been deleted.",
                            icon: "success"
                        });
                        navigate(`/dashboard/stories/${user?.email}`)
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong while deleting the story.",
                        icon: "error"
                    });
                    console.error('Error deleting the story:', error);
                });
                
            }
          });
    }

    const handleUpdate = (_id) => {
        navigate(`/dashboard/story-update/${id}`)
    }

    return (
        <div className="max-w-4xl mx-auto ">
            {/* <h1>{story.name}</h1> */}
            <img src={story.imageURL || "default-image-url"} alt={story.name} className="rounded-lg" />

            <div className="story-info">
                <p><strong>Category:</strong> {story.category}</p>
                <p><strong>Destination:</strong> {story.destination}</p>
                <p><strong>Travel Start Date:</strong> {new Date(story.travelStartDate).toLocaleDateString()}</p>
                <p><strong>Travel End Date:</strong> {new Date(story.travelEndDate).toLocaleDateString()}</p>
                <p><strong>Mode of Transportation:</strong> {story.modeOfTransportation}</p>
                <p><strong>Accommodation:</strong> {story.accommodation}</p>
                <p><strong>Purpose of Travel:</strong> {story.purposeOfTravel}</p>
                <p><strong>Budget:</strong> {story.budget}</p>
                <p><strong>Expense:</strong> {story.expense}</p>
                <p><strong>Activities:</strong> {story.activities}</p>
            </div>

            <div className='flex gap-4 md:gap-10 mt-4'>
                <div><button className='btn bg-[#F6FCDF] px-7 ' onClick={() => handleUpdate(story._id)}>Update</button></div>
                <div><button className='btn bg-[#F6FCDF] px-7 ' onClick={ () => handleDelete(story._id) }>Delete</button></div>
            </div>

            {/* Optional: If you want to show an image for the tour guide */}
            {/* {story.tourGuide && (
                <div className="tour-guide-info">
                    <h2>Tour Guide: {story.tourGuide.name}
                    <img src={story.tourGuide.image || "default-image-url"} alt={story.tourGuide.name} className="tour-guide-image" />
                    <p><strong>Email:</strong> {story.tourGuide.email}</p>
                </div>
            )} */}
        </div>
    );
};

export default StoryDetails;
