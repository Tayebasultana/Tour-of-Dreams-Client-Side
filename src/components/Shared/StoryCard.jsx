import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; 
// import useCart from "../../hooks/useCart";

const StoryCard = () => {
    const { user } = useAuth();  
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);  

   
    useEffect(() => {
        if (user && user.email) {
            // console.log("User email: ", user.email); 
            fetch(`http://localhost:5000/dashboard/stories/${user?.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setStories(data); 
                    setLoading(false); 
                })
                .catch((error) => {
                    console.error("Error fetching stories data:", error);
                    setLoading(false); 
                });
        } else {
            console.log("User not logged in or email not available");
            setLoading(false); 
        }
    }, [user]);
   

    // Display loading state if data is being fetched
    if (loading) {
        return <div>Loading stories...</div>;
    }

    // Display message if no stories are found
    if (stories.length === 0) {
        return <div>No stories found.</div>;
    }

    return (
        <div className="flex flex-wrap gap-4">
            
            {stories.map((story, index) => {
                const { name, category, activities, imageURL, _id } = story;  

                return (
                    <div key={index} className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src={imageURL || "default-image-url"}  
                                alt={name || "Story Image"}  
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{name || "No Name"}</h2>
                            <p>{category || "No category available."}</p>
                            <p>{activities || "No activities available."}</p>
                            <div className="card-actions justify-end">
                                <NavLink to={`/dashboard/story/${_id}`} className="btn bg-[#F6FCDF] text-black">
                                    Read More
                                </NavLink>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StoryCard;
