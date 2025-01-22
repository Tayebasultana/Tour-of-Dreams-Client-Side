import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RandomPackage = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    // Fetch random packages when the component mounts
    useEffect(() => {
        const fetchRandomPackages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/packages');
                setPackages(response.data); 
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
            <h2 className="text-3xl">Random Travel Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
                {packages.length > 0 ? (
                    packages.map((packageData) => (
                        <div key={packageData._id} className="bg-[#F6FCDF] rounded-xl">
                            <img
                                src={ packageData.images[0]}
                                alt='Package image'
                                className="h-[250px] w-full rounded-t-xl"
                            />
                            <h3 className="text-lg my-2">{packageData.tripTitle}</h3>
                            <p><strong>Tour Type:</strong> {packageData.tourType}</p>
                            <p className="my-1"><strong>Price:</strong> {packageData.price}</p>
                            <button onClick={() => handlePackageDetails(packageData._id)} className="btn my-2 bg-[#859F3D]">
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
