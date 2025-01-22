import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const TourGuideDetails = () => {
    const { id } = useParams(); 
    const [guide, setGuide] = useState(null);

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tourGuides/${id}`);
                setGuide(response.data);
            } catch (error) {
                console.error('Error fetching the guide details:', error);
            }
        };

        fetchGuide();
    }, [id]);

    if (!guide) {
        return <div>Loading...</div>;
    }


    return (
        <div className='text center min-h-screen flex flex-col justify-center items-center bg-[#F6FCDF]'>
            <h2 className='text-4xl font-bold text-center mb-4'>Tour Guide</h2>
            <p className="text-2xl mb-2">{guide.name}</p>
            <p>{guide.email}</p>
        
        </div>
    );
};

export default TourGuideDetails;