import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AllPackage = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Fetch random packages when the component mounts
    useEffect(() => {
        const fetchRandomPackages = async () => {
            try {
                const response = await axios.get('https://tour-of-dreams-server-side.vercel.app/packages');
                setPackages(response.data); 
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching packages:', error);
            }
        };

        fetchRandomPackages();
    }, []);

    const handlePackageDetails = (id) => {
        navigate(`/package/${id}`);
    };

    return (
        <div className="text-center py-20 w-11/12 mx-auto min-h-screen">
            <h2 className="text-3xl">All Travel Packages</h2>
            {/* Loading Spinner */}
            {loading && (
              <div id="loadingSpinner" className="loading mt-7">
                <div className="spinner"></div> 
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
                {packages.map((packageData) => (
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
                    ))}
            </div>
        </div>
    );
};

export default AllPackage;