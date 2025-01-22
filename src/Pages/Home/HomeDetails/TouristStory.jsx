import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, FacebookShareCount } from 'react-share';
import StoryCard from '../../../components/Shared/StoryCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const TouristStory = () => {
    const axiosPublic = useAxiosPublic();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const {id} = useParams();

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

    if (loading) {
        return <div>Loading stories...</div>;
    }

    const handleAllStoriesClick = () => {
        navigate('/community');
    };

    const handleAddStoryClick = () => {
        navigate('/dashboard/addStory');
    };

    // Handle share click, but ensure the user is logged in
    const handleShareClick = (storyId) => {
        if (!user) {
            alert('You need to be logged in to share this story!');
            navigate('/login');
        }
    };
    console.log(stories.url)

    return (
        <div className='w-11/12 mx-auto text-center py-10'>
            <h2 className='text-3xl mb-4'>Random Stories</h2>
            <div className="stories-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stories Mapping */}
                {stories.map((story) => (
                    <div key={story._id} className="card bg-base-100 w-96 shadow-xl">
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
                                <div className="share-buttons flex justify-start">
                                    {/* If user is logged in, show share button */}
                                    {user ? (
                                        <FacebookShareButton 
                                            url={`http://localhost:5000/story/${story._id}`}  
                                            quote={story.title}
                                        >
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                    ) : (
                                        <button 
                                            onClick={() => handleShareClick(story._id)}  
                                            className="btn bg-[#F6FCDF] text-black"
                                        >
                                            Share
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="navigation-buttons flex justify-between py-4">
                <button className='btn bg-[#F6FCDF] text-[#31511E]' onClick={handleAllStoriesClick}>All Stories</button>
                <button className='btn bg-[#F6FCDF] text-[#31511E]' onClick={handleAddStoryClick}>Add Story</button>
            </div>
        </div>
    );
};

export default TouristStory;
