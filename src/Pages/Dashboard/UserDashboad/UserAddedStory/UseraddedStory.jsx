import React from 'react';
import StoryCard from '../../../../components/Shared/StoryCard';


const UserAddedStory = () => {
    return (
        <div className='text-center '>
            <h1 className='text-4xl text-center mb-10 '>My Added Stories</h1>
            <StoryCard />
        </div>
    );
};

export default UserAddedStory;