import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StoryList = () => {
    const [stories, setStories] = useState([]);

    useEffect(()=> {
        const fetchStories = async ()=> {
            try{
                const {data} = await axios.get('http://localhost:5000/api/stories');
                setStories(data.stories);
            }
            catch(err){
                console.error(err);
            }
        };

        fetchStories();
    }, []);

    const likesStory = async (id) => {
        try{
            await axios.post(`http://localhost:5000/api/stories/${id}/like`);
            setStories(stories.map(story => story._id === id ? {...story, likes: story.likes +1 }: story));
        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div>
      <h1>Emoji Stories</h1>
      <ul>
         {stories.map (story =>(
            <li key={story._id}>
                <p>{story.story}</p>
                <p>Likes:{story.likes}</p>
                <button onClick={() => likesStory(story._id)}>Like</button>
            </li>
            
         ))}
      </ul>
    </div>
  )
}

export default StoryList
