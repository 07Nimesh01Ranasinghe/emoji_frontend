import React, { useState } from 'react';
import axios from 'axios';
import { Picker } from 'emoji-mart';



const StoryCreator = () => {
    const [story, setStory] = useState('');
    const [translation, setTranslation] = useState('');
    const addEmoji = (emoji) => setStory( story + emoji.native);

    const tranlateStory = async ()=> {
        try{
            const {data} = await axios.post('http://localhost:5000/api/translate', {story});
            setTranslation(data.translation);
        }
        catch(err){
            console.error(err);
        }
    }

    const submitStory = async ()=> {
        try{
            await axios.post('http://localhost:5000/api/stories', {story});
            alert('Story created');
            setStory('');
            setTranslation('');
        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div>
        <h1>Emoji Story Creator</h1>
        <Picker onSelect = {addEmoji}/>
        <textarea value={story} onChange={(e) => setStory(e.target.value)} />
        <button onClick={tranlateStory}>Translate</button>
        <button onClick={submitStory}>Submit</button>
        {translation && <p>Translation: {translation}</p>}
    </div>
  )
}

export default StoryCreator;
