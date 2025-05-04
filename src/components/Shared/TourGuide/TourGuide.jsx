import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TourGuide = () => {
    const [tourGuides, setTourGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  useEffect(() => {
    // Fetch the tour guides from the backend
    axios.get('https://tour-of-dreams-server-side.vercel.app/tourGuides')
      .then((response) => {
        setTourGuides(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tour guides:', error);
        setLoading(false);
      });
  }, []);

  const handleGoToGuideProfile = (id) => {
    navigate(`/tourGuides/${id}`)
  }

    return (
        <div className='text-center py-10 w-11/12 mx-auto'>
            <h2 className='text-4xl text-center mb-7'>Tour Guides</h2>
            {/* Loading Spinner */}
            {loading && (
              <div id="loadingSpinner" className="loading">
                <div className="spinner"></div> 
              </div>
            )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tourGuides.map((guide) => (
            <div key={guide._id} className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
              <div className="">
                <h3 className='text-2xl font-semibold text-gray-800 mb-2'>{guide.name}</h3>
                <p>{guide.role}</p>
              </div>
              <div className="text-gray-600 text-sm my-4">
                <p>Email: {guide.email}</p>
              </div>
              <div className="card-footer">
                <button onClick={ () => handleGoToGuideProfile(guide._id) } className="btn">
                   {guide.name}'s profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default TourGuide;