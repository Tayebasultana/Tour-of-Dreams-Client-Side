import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const TouristStoryDetails = () => {
    const { id } = useParams(); 
    const [story, setStory] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/story/${id}`);
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

    return (
        <div className='py-20 bg-purple-200 px-4 md:px-32 lg:px-60'>
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

{/* <div className='flex gap-4 md:gap-10 mt-4'>
    <div><button className='btn bg-[#F6FCDF] px-7 '>Update</button></div>
    <div><button className='btn bg-[#F6FCDF] px-7 '>Delete</button></div>
</div> */}
        </div>
    );
};

export default TouristStoryDetails;