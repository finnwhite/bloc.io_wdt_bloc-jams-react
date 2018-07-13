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
    const defaultSong = album.songs[0];

    this.state = {
      album: album,
      currentSong: defaultSong,
      currentTime: 0,
      duration: defaultSong.duration,
      isPlaying: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = defaultSong.audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: (e) => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: (e) => {
        this.setState({ duration: this.audioElement.duration });
      }
    }
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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
    const currentSong = this.state.currentSong;
    const currentIndex = songs.findIndex(
      (song) => (song === currentSong)
    );
    const prevIndex = Math.max(0, currentIndex - 1);
    const prevSong = songs[prevIndex];

    //if ( (prevSong === currentSong) ) { return false; }
    this.setSong(prevSong);
    this.play();
    //if ( this.state.isPlaying ) { this.play(); }
  }
  handleNextClick() {
    const songs = this.state.album.songs;
    const currentSong = this.state.currentSong;
    const currentIndex = songs.findIndex(
      (song) => (song === currentSong)
    );
    const nextIndex = Math.min(songs.length - 1, currentIndex + 1);
    const nextSong = songs[nextIndex];

    if ( (nextSong === currentSong) ) { return false; }
    this.setSong(nextSong);
    this.play();
    //if ( this.state.isPlaying ) { this.play(); }
  }

  handleTimeChange(e) {
    const audio = this.audioElement;
    const newTime = audio.duration * e.target.value;
    audio.currentTime = newTime;
    this.setState({ currentTime: newTime });
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
          currentTime={ this.audioElement.currentTime }
          duration={ this.audioElement.duration }
          //currentTime={ this.state.currentTime }
          //duration={ this.state.duration }
          isPlaying={ isPlaying }
          handleSongClick={ () => this.handleSongClick(currentSong) }
          handlePrevClick={ () => this.handlePrevClick() }
          handleNextClick={ () => this.handleNextClick() }
          handleTimeChange={ (e) => this.handleTimeChange(e) }
        />

      </section>
    );
  }
}

export default Album;
