import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './packageDetails.css';
import TourGuide from '../../../components/Shared/TourGuide/TourGuide';
import BookingForm from '../../../components/BookingForm';

const PackageDetails = () => {
    const { id } = useParams(); 
    const [packages, setPackage] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`https://tour-of-dreams-server-side.vercel.app/package/${id}`);
                setPackage(response.data);
            } catch (error) {
                console.error('Error fetching the story details:', error);
            }
        };

        fetchPackages();
    }, [id]);

    if (!packages) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-10/12 mx-auto py-16'>

           <div className='image-gallery'>
                {packages.images && packages.images.length > 0 ? (
                    packages.images.map((image, index) => (
                        <div key={index} className='image-item'>
                            <img src={image} alt={`Package image ${index + 1}`} className='image' />
                        </div>
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>

            <div className="my-4 text-xl">
                <h3 className='text-4xl font-bold text-[#31511E] mb-7'>Important information about this package</h3>
                <p className=''><strong>The Package name is : </strong>{packages.packageName}</p>
                <p className='my-2'><strong>Type: </strong>{packages.tourType} tour</p>
                <p className=''><strong>Title: </strong>{packages.tripTitle}</p>
                <p className='my-2'><strong>Price: </strong>{packages.price}</p>
                <p className=''><strong>We will go there by :</strong>{packages.howWeGoThere}</p>
                <p className='my-2'><strong>You will stay in top-rated accommodations at: </strong>{packages.whereWeStay}</p>
                <p className=''><strong>You'll enjoy delightful meals at: </strong>{packages.whereWeEat}</p>
            </div>

            {/* FAQ Section - Dynamic Itinerary */}
            <div className="faq-section">
              <h2 className="faq-title">Trip Itinerary</h2>
            
              {packages.itinerary && packages.itinerary.map((item, index) => (
                item.day && item.destination && item.activity ? ( 
                  <div key={index} className="faq-item">
                    <h3 className="faq-question">Day {item.day}: {item.destination}</h3>
                    <p className="faq-answer">{item.activity}</p>
                  </div>
                ) : null 
              ))}
            </div>


             <div>
                <TourGuide></TourGuide>
             </div>

             <div>
                <BookingForm></BookingForm>
             </div>
            </div>
    );
};

export default PackageDetails;