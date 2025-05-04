import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Rating from "react-rating";
import { AiOutlineSignature } from "react-icons/ai";
import { FaStar, FaRegStar } from "react-icons/fa";

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("https://tour-of-dreams-server-side.vercel.app/review");
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
        <div className="max-w-6xl mx-auto my-16 px-4">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
                What Our Customers Say
            </h2>

            {loading ? (
                <div className="text-center text-gray-500 mt-10 animate-pulse">
                    Loading reviews...
                </div>
            ) : (
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide
                            key={review._id}
                            className="p-6 flex flex-col items-center bg-gray-50 rounded-xl shadow-lg transition transform hover:scale-105 duration-300 ease-in-out text-center"
                        >
                            <Rating
                                initialRating={review.rating}
                                readonly
                                emptySymbol={<FaRegStar className="text-yellow-400 text-xl" />}
                                fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
                            />
                            <AiOutlineSignature className="w-16 h-16 text-yellow-500 mt-4 mb-2 mx-auto" />
                            <p className="mt-2 text-gray-700 italic max-w-lg mx-auto">
                                “{review.details}”
                            </p>
                            <h4 className="font-semibold text-xl text-gray-800 mt-4">
                                {review.name}
                            </h4>
                            <span className="text-sm text-gray-500">
                                Happy Traveler
                            </span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Testimonial;
