import React from 'react';
import StoryCard from '../../../../components/Shared/StoryCard';


const UserAddedStory = () => {
    return (
        <div className='text-center'>
            <h1 className='text-4xl text-center mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>My Added Stories</h1>
            <StoryCard />
        </div>
    );
};

export default UserAddedStory;