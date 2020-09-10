import {useState, useEffect} from 'react';
import youtube from '../apis/youtube';

const KEY = 'AIzaSyBrDbENRs137O-KbdakE0uoRUmhlKaeQaU';

const useVideos = (defaultSearchTerm) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        search(defaultSearchTerm);
    }, [defaultSearchTerm]);

    const search = async (term) => {
        const response = await youtube.get('/search',{
            params: {
                part: 'snippet',
                type: 'video',
                maxResults: 7,
                key : KEY,
                q: term
            }
        });

        setVideos(response.data.items);       
    };

    return [videos, search];
};

export default useVideos;