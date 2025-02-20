import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from 'react-share';


const AllStories = () => {
    const axiosPublic = useAxiosPublic();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);  
    const [storiesPerPage] = useState(6);  

    useEffect(() => {
            axiosPublic.get('/stories')
                .then(response => {
                    setStories(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching stories:', error);
                    setLoading(false);
                });
    }, [axiosPublic]);

    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

    // Pagination Controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="w-11/12 mx-auto py-20 text-center min-h-screen">
            <h3 className="text-3xl mb-4 text-center">All Tour Packages</h3>
            {/* Loading Spinner */}
            {loading && (
              <div id="loadingSpinner" className="loading">
                <div className="spinner"></div> 
              </div>
            )}
           <div className="stories-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stories Mapping */}
                {currentStories.map((story) => (
                    <div key={story._id} className="card bg-base-100  shadow-xl">
                        <figure>
                            <img
                                src={story.imageURL || "default-image-url"}  
                                alt={story.name || "Story Image"}  
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{story.name || "No Name"}</h2>
                            <p>{story.category || "No category available."}</p>
                            <p>{story.activities || "No activities available."}</p>
                            <div className="card-actions flex justify-between">
                                <div>
                                <NavLink to={`/story/${story._id}`} className="btn bg-[#F6FCDF] text-black">
                                    Read More
                                </NavLink>
                                </div>
                                <div className="share-buttons flex justify-end mt-4">
                            <FacebookShareButton url={story.url}>
                                <FacebookIcon size={32} round={true} />
                            </FacebookShareButton>
                        </div>
                            </div>
                        </div>
                    </div>
                ))}
           </div>

           {/* Pagination Controls */}
           <div className="pagination mt-6 flex justify-center">
                {Array.from({ length: Math.ceil(stories.length / storiesPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-2 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>


        </div>
    );
};

export default AllStories;