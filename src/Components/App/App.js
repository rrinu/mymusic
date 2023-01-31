import logo from './logo.jpg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults}  from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {searchResults : [],
  playlistName:"My Favourite",
  playlistTracks:[]
    };
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }
  addTrack(track){
    const tracks=this.state.playlistTracks;
    if(tracks.find(value => value.id===track.id))
    {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks:tracks});
    };
    removeTrack(track){
      const tracks=this.state.playlistTracks;
      const newTrack=tracks.filter(value => value.id!==track.id)
      this.setState({playlistTracks:newTrack});
      };
      updatePlaylistName(name){
        this.setState({playlistName:name});
      }
      savePlaylist(){
        const trackUris=this.state.playlistTracks.map(track=>track.uri);
        Spotify.savePlayList(this.state.playlistName,trackUris).then(()=>{
          this.setState({
            playlistName:'New Playlist',
            playlistTracks:[]
          })
        })

      }
      search(term){
          Spotify.search(term).then(searchResults =>{
            this.setState({searchResults:searchResults})
          })
      }
  render(){
  return (
    <div>
    <h1>my<span className="highlight">music</span></h1>
    <div className="App">
      <SearchBar onSearch={this.search} />
      <div className="App-playlist">
         <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
      </div>
    </div>
  </div>
  );
  }
}

export default App;
