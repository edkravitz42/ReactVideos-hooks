import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyCs1XdZqwNC8FA5q6Ruis7qC4nsND1BxVk';

class App extends React.Component {
    state = { videos: [], selectedVideo: null }

    componentDidMount(){
        this.onTermSubmit('news');
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get('/search',{
            params: {
                part: 'snippet',
                type: 'video',
                maxResults: 7,
                key : KEY,
                q: term
            }
        });

        this.setState({ 
            videos : response.data.items,
            selectedVideo : response.data.items[0]
        });
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video});
    }
    
    render(){
        return (
        <div className="ui container">
            <SearchBar onTermSubmit={this.onTermSubmit} />
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column"><VideoDetail video={this.state.selectedVideo} /></div>
                    <div className="five wide column"><VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} /></div>
                </div>
            </div>
        </div>
        )
    }
}

export default App;