import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from './AuthProvider/AuthProvider';

const BookingForm = () => {
  const { id } = useParams();
  const { user } = useContext(authContext); // Get user from context
  const [tourPackage, setTourPackage] = useState({});
  const [tourDate, setTourDate] = useState(null);
  const [tourGuide, setTourGuide] = useState('');
  const [tourGuides, setTourGuides] = useState([]);
  const [price, setPrice] = useState(0);
  const [tourists, setTourists] = useState({
    name: '', 
    email: '', 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // To control modal visibility
  const navigate = useNavigate();

  // If no user, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setTourists({ name: user.displayName, email: user.email });
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fetch tour guides
    axios.get('https://tour-of-dreams-server-side.vercel.app/tourGuides')
      .then((response) => {
        setTourGuides(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tour guides:', error);
        setError('There was an error fetching tour guides.');
      });

    // Fetch tour package data
    axios.get(`https://tour-of-dreams-server-side.vercel.app/package/${id}`)
      .then((response) => {
        setTourPackage(response.data);
        setPrice(response.data.price);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching package data:', error);
        setError('There was an error fetching package data.');
        setLoading(false);
      });
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      touristName: tourists.name,
      touristEmail: tourists.email,
      price,
      tourDate,
      tourGuide,
      packageName: tourPackage.packageName,
      status: 'pending'  
    };

    // Submit the booking to backend
    axios.post('https://tour-of-dreams-server-side.vercel.app/bookings', bookingData)
      .then((response) => {
        console.log('Booking successful:', response);
        setModalOpen(true); // Open the confirmation modal
      })
      .catch((error) => {
        console.error('Error booking tour:', error);
        alert('There was an error booking the tour.');
      });
  };

  return (
    <div className="bg-gradient-to-r from-pink-400 to-yellow-400 p-8 rounded-xl shadow-lg max-w-xl mx-auto mb-10">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Book Your Dream Tour</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Name */}
        <div className="space-y-2">
          <label className="block text-white font-semibold">Package Name:</label>
          <input
            type="text"
            value={tourPackage.packageName || ''}
            readOnly
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Tourist Name */}
        <div className="space-y-2">
          <label className="block text-white font-semibold">Tourist Name:</label>
          <input
            type="text"
            value={tourists.name || ''}
            readOnly
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Tourist Email */}
        <div className="space-y-2">
          <label className="block text-white font-semibold">Tourist Email:</label>
          <input
            type="email"
            value={tourists.email || ''}
            readOnly
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block text-white font-semibold">Price:</label>
          <input
            type="number"
            value={price || ''}
            readOnly
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Tour Date */}
        <div className="space-y-2">
          <label className="block text-white font-semibold">Tour Date:</label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            dateFormat="MMMM d, yyyy"
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Tour Guide Selection */}
        <div className="space-y-2">
          <label className="block text-white font-semibold">Tour Guide:</label>
          <select
            value={tourGuide}
            onChange={(e) => setTourGuide(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="">Select Tour Guide</option>
            {tourGuides.map((guide) => (
              <option key={guide.email} value={guide.email}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="space-y-2">
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Book Now
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold">Confirm Your Booking</h2>
            <p>Your booking is pending. Please confirm your booking.</p>
            <div className="mt-4">
              <button
                onClick={() => navigate(`/dashboard/bookings/${user?.email}`)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg"
              >
                Go to My Bookings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
