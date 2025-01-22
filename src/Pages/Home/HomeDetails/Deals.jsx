import { NavLink } from "react-router-dom";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar,  } from 'swiper/modules';

const Deals = () => {
    return (
        <div>
           

            {/* Deals Section */}
            <section className="deals-section my-16 px-4 bg-[#F6FCDF] py-10 ">
                <h2 className="text-3xl text-center mb-10 font-semibold text-[#31511E]">Special Offers and Deals</h2>
                <div className="deals-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Deal 1 */}
                    <div className="deal-card bg-white shadow-lg rounded-lg overflow-hidden relative">
                        {/* Discount Badge */}
                        <span className="discount-stamp absolute top-2 left-2 px-4 py-2 text-white bg-[#F6FCDF] font-bold rounded-full">20% OFF</span>
                        <img src="https://via.placeholder.com/400x300?text=Cox's+Bazar+Deal" alt="Cox's Bazar" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-[#31511E]">Cox's Bazar Package 20% OFF</h3>
                            <p className="text-gray-600">Book a 3-night, 4-day package to Cox's Bazar and enjoy a 20% discount. Relax by the world’s longest sea beach!</p>
                            <div className="flex justify-between mt-4 items-center">
                                <NavLink to="/deals/coxs-bazar" className="btn bg-[#F6FCDF] text-black py-2 px-6 rounded-lg">Book Now</NavLink>
                                <div className="sale-time text-sm text-[#31511E]">Limited Time Offer</div>
                            </div>
                        </div>
                    </div>

                    {/* Deal 2 */}
                    <div className="deal-card bg-white shadow-lg rounded-lg overflow-hidden relative">
                        {/* Discount Badge */}
                        <span className="discount-stamp absolute top-2 left-2 px-4 py-2 text-white bg-[#F6FCDF] font-bold rounded-full">15% OFF</span>
                        <img src="https://via.placeholder.com/400x300?text=Srimangal+Deal" alt="Srimangal" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-[#31511E]">Srimangal Tea Garden 15% OFF</h3>
                            <p className="text-gray-600">A serene 2-night, 3-day getaway in Srimangal’s famous tea gardens with a 15% discount.</p>
                            <div className="flex justify-between mt-4 items-center">
                                <NavLink to="/deals/srimangal" className="btn bg-[#F6FCDF] text-black py-2 px-6 rounded-lg">Book Now</NavLink>
                                <div className="sale-time text-sm text-[#31511E]">Limited Time Offer</div>
                            </div>
                        </div>
                    </div>

                    {/* Deal 3 */}
                    <div className="deal-card bg-white shadow-lg rounded-lg overflow-hidden relative">
                        {/* Discount Badge */}
                        <span className="discount-stamp absolute top-2 left-2 px-4 py-2 text-white bg-[#F6FCDF] font-bold rounded-full">25% OFF</span>
                        <img src="https://via.placeholder.com/400x300?text=Bandarbans+Deal" alt="Bandarbans" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-[#31511E]">Bandarbans 25% OFF</h3>
                            <p className="text-gray-600">Get a 25% discount for a 3-night, 4-day adventure to Bandarbans. Experience breathtaking hilltop views!</p>
                            <div className="flex justify-between mt-4 items-center">
                                <NavLink to="/deals/bandarban" className="btn bg-[#F6FCDF] text-black py-2 px-6 rounded-lg">Book Now</NavLink>
                                <div className="sale-time text-sm text-[#31511E]">Limited Time Offer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Deals;
