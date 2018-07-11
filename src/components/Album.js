import React, { Component } from 'react';
import albumData from './../data/albums';
import Song from './Song';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const slug = this.props.match.params.slug;
    const album = albumData.find( (album) => {
      return (album.slug === slug);
    });
    //const defaultSong = album.songs[0];

    this.state = {
      album: album,
      //currentSong: defaultSong,
      currentSong: null,
      isPlaying: false
    };

    this.audioElement = document.createElement("audio");
    //this.audioElement.src = defaultSong.audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = (this.state.currentSong === song);
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const songs = this.state.album.songs;
    const currentIndex = songs.findIndex(
      (song) => (this.state.currentSong === song)
    );
    const newIndex = Math.max(0, currentIndex-1);
    const newSong = songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  render() {
    const album = this.state.album;
    const currentSong = this.state.currentSong;
    const isPlaying = this.state.isPlaying;

    return (
      <section className="album">

        <section id="album-info">
          <img id="album-cover-art"
            src={ album.albumCover } alt={ album.title } />
          <div className="album-details">
            <h1 id="album-title">{ album.title }</h1>
            <h2 className="artist">{ album.artist }</h2>
            <div id="release-info">{ album.releaseInfo }</div>
          </div>
        </section>

        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            { album.songs.map( (song, index) => {
              let isCurrent = (song === currentSong);
              return (
                <Song key={ index }
                  index={ index }
                  song={ song }
                  isCurrent={ isCurrent }
                  isPlaying={ (isCurrent && isPlaying) }
                  handleClick={ () => this.handleSongClick(song) }
                /> );
              }
            ) }
          </tbody>
        </table>

        <PlayerBar
          currentSong={ currentSong }
          isPlaying={ isPlaying }
          handleSongClick={ () => this.handleSongClick(currentSong) }
          handlePrevClick={ () => this.handlePrevClick() }
        />

      </section>
    );
  }
}

export default Album;
