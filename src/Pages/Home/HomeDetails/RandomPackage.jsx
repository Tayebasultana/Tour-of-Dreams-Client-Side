import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RandomPackage = () => {
    const [randomPackages, setRandomPackages] = useState([]);
    const navigate = useNavigate();

    // Fetch all packages when the component mounts
    useEffect(() => {
        const fetchRandomPackages = async () => {
            try {
                const response = await axios.get('https://tour-of-dreams-server-side.vercel.app/packages');
                const allPackages = response.data;

                // Function to select 3 random packages
                const getRandomPackages = () => {
                    const shuffled = [...allPackages].sort(() => 0.5 - Math.random()); // Shuffle the array
                    return shuffled.slice(0, 3); // Take first 3 items after shuffle
                };

                setRandomPackages(getRandomPackages()); // Set the random 3 packages
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchRandomPackages();
    }, []);

    const handlePackageDetails = (id) => {
        navigate(`/package/${id}`);
    };

    return (
        <div className="text-center py-10 w-11/12 mx-auto">
            <h2 className="text-4xl mb-7">Travel Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
                {randomPackages.length > 0 ? (
                    randomPackages.map((packageData) => (
                        <div key={packageData._id} className="bg-[#F6FCDF] rounded-xl">
                            <img
                                src={packageData.images[0]}
                                alt="Package image"
                                className="h-[250px] w-full rounded-t-xl"
                            />
                            <h3 className="text-lg my-2">{packageData.tripTitle}</h3>
                            <p><strong>Tour Type:</strong> {packageData.tourType}</p>
                            <p className="my-1"><strong>Price:</strong> {packageData.price}</p>
                            <button 
                                onClick={() => handlePackageDetails(packageData._id)} 
                                className="btn my-2 bg-[#859F3D]"
                            >
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading packages...</p>
                )}
            </div>
        </div>
    );
};

export default RandomPackage;
