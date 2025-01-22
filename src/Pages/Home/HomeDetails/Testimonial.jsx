import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Rating from "react-rating";
import { AiOutlineSignature } from "react-icons/ai";



const Testimonial = () => {
    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState(true); 

    // Fetch reviews from the backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost:5000/review");
                const data = await response.json();
                setReviews(data); 
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setLoading(false); 
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
            

            {/* Show loading spinner */}
            {loading ? (
                <div className="text-center text-gray-500 mt-10">
                    Loading reviews...
                </div>
            ) : (
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper text-center">
                    {reviews.map((review) => (
                        <SwiperSlide
                            key={review._id}
                            className="p-6 "
                        >
                            <Rating
                              initialRating={review.rating}
                              readonly
                            />
                            <div className="text-center">
                            <AiOutlineSignature className="w-52 mx-auto"/>
                            </div>
                            <p className="mt-2">{review.details}</p>
                            <h4 className="font-semibold text-lg text-yellow-500">{review.name}</h4>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Testimonial;
