import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const PackageForm = () => {
    const formRef = useRef(null);
    const axiosPublic = useAxiosPublic();

    const [formData, setFormData] = useState({
        packageName: '',
        tourType: '',
        tripTitle: '',
        price: '',
        howWeGoThere: '',
        whereWeStay: '',
        whereWeEat: '',
        images: [],
        itinerary: [
            { day: 1, destination: '', activity: '' },
            { day: 2, destination: '', activity: '' },
            { day: 3, destination: '', activity: '' },
            { day: 4, destination: '', activity: '' },
            { day: 5, destination: '', activity: '' },
            { day: 6, destination: '', activity: '' },
            { day: 7, destination: '', activity: '' },
            { day: 8, destination: '', activity: '' },
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
        [name]: name === 'price' ? parseFloat(value) || 0 : value,
        });
    };

    const handleItineraryChange = (day, field, value) => {
        const newItinerary = formData.itinerary.map((item) =>
            item.day === day ? { ...item, [field]: value } : item
        );
        setFormData({ ...formData, itinerary: newItinerary });
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFormData({
            ...formData,
            images: Array.from(files),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Price validation to ensure it is a positive number
       if (formData.price <= 0 || isNaN(formData.price)) {
           toast.error('Price must be a positive number');
           return;
       }

        // Cloudinary image upload
        const uploadedImages = [];

        for (const image of formData.images) {
            const formDataToUpload = new FormData();
            formDataToUpload.append('file', image);
            formDataToUpload.append('upload_preset', 'tour_of_dreams'); 
        
            try {
                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,  
                    formDataToUpload
                );
                uploadedImages.push(cloudinaryResponse.data.secure_url);

            } catch (err) {
                toast.error('Failed to upload image to Cloudinary');
                console.error(err);
                return;
            }
        }
        console.log(uploadedImages);
        

        const formDataToSend = {
            packageName: formData.packageName,
            tourType: formData.tourType,
            tripTitle: formData.tripTitle,
            price: formData.price,
            howWeGoThere: formData.howWeGoThere,
            whereWeStay: formData.whereWeStay,
            whereWeEat: formData.whereWeEat,
            itinerary: formData.itinerary,
            images: uploadedImages,
        };

        try {
            const response = await axiosPublic.post('/packages', formDataToSend);

            if (response.data.success) {
                toast.success('Package added successfully');
                formRef.current.reset();
            } else {
                toast.error('Failed to add package');
            }
        } catch (err) {
            toast.error('Error in submitting package');
            console.error(err);
        }
    };

    return (
        <div>
            <h3 className='text-center mb-10 text-4xl'>Add Package</h3>
            <form ref={formRef} onSubmit={handleSubmit} className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* Package Name */}
            <div>
                <label className="block text-lg">Package Name:</label>
                <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {/* Tour Type */}
            <div>
                <label className="block text-lg">Tour Type:</label>
                <select
                    name="tourType"
                    value={formData.tourType}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                >
                    <option value="">Select Tour Type</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Beach">Beach</option>
                    <option value="Historical">Historical</option>
                    <option value="Cultural">Cultural</option>
                </select>
            </div>

            {/* Trip Title */}
            <div>
                <label className="block text-lg">Trip Title:</label>
                <input
                    type="text"
                    name="tripTitle"
                    value={formData.tripTitle}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-lg">Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {/* How We Go There */}
            <div>
                <label className="block text-lg">How We Go There:</label>
                <select
                    name="howWeGoThere"
                    value={formData.howWeGoThere}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                >
                    <option value="">Select Travel Method</option>
                    <option value="Train">Train</option>
                    <option value="Flight">Flight</option>
                    <option value="Bus">Bus</option>
                    <option value="Car">Car</option>
                </select>
            </div>

            {/* Where We Stay */}
            <div>
                <label className="block text-lg">Where We Stay:</label>
                <select
                    name="whereWeStay"
                    value={formData.whereWeStay}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                >
                    <option value="">Select Stay</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Guesthouse">Guesthouse</option>
                    <option value="Villa">Villa</option>
                </select>
            </div>

            {/* Where We Eat */}
            <div>
                <label className="block text-lg mt-10">Where We Eat:</label>
                <select
                    name="whereWeEat"
                    value={formData.whereWeEat}
                    onChange={handleInputChange}
                    className="input input-bordered w-full "
                    required
                >
                    <option value="">Select Eating Option</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Buffet">Buffet</option>
                    <option value="Local Food">Local Food</option>
                    <option value="Café">Café</option>
                </select>
            </div>

            {/* Day-wise Itinerary */}
            {formData.itinerary.map((item) => (
                <div key={item.day} className="day-itinerary">
                    <h3 className="text-lg mt-4">Day {item.day}</h3>
                    <div>
                        <label className="block">Destination:</label>
                        <input
                            type="text"
                            value={item.destination}
                            onChange={(e) =>
                                handleItineraryChange(item.day, 'destination', e.target.value)
                            }
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Activity:</label>
                        <input
                            type="text"
                            value={item.activity}
                            onChange={(e) =>
                                handleItineraryChange(item.day, 'activity', e.target.value)
                            }
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
            ))}

            {/* File Input for Images */}
            <div>
                <label className="block text-lg">Upload Images:</label>
                <input
                    type="file"
                    multiple
                    name="images"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className='mt-auto'>
                <button type="submit" className="btn bg-[#31511E] text-white w-full ">
                    Submit Package
                </button>
            </div>
        </form>
        </div>
    );
};

export default PackageForm;
