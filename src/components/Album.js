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
    const defaultVolume = 0.8;

    this.state = {
      album: album,
      currentSong: defaultSong,
      currentTime: 0,
      duration: defaultSong.duration,
      volume: defaultVolume,
      isPlaying: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = defaultSong.audioSrc;
    this.audioElement.volume = defaultVolume;
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

  handleVolumeChange(e) {
    const audio = this.audioElement;
    const volume = e.target.value;
    audio.volume = volume;
    this.setState({ volume: volume });
  }

  formatTime(sec) {
    if ( (typeof sec !== "number") || !(sec >= 0) ) {
      return "-:--";
    }
    const s = Math.round(sec);
    const m = Math.floor(s / 60);
    const ss = ("00" + (s % 60)).slice(-2);
    return (m + ":" + ss);
  }

  render() {
    const album = this.state.album;
    const currentSong = this.state.currentSong;
    const currentTime = this.state.currentTime;
    const duration = this.state.duration;
    const isPlaying = this.state.isPlaying;

    return (
      <section className="album">

        <section className="album-info">
          <img className="album-cover-art"
            src={ album.albumCover } alt={ album.title } />
          <div className="album-details">
            <h1 className="album-title">{ album.title }</h1>
            <h2 className="artist">{ album.artist }</h2>
            <div className="release-info">{ album.releaseInfo }</div>
          </div>
        </section>

        <table className="song-list">
          <colgroup>
            <col className="song-number-column" />
            <col className="song-title-column" />
            <col className="song-duration-column" />
          </colgroup>
          <tbody>
            { album.songs.map( (song, index) => {
              let isCurrent = (song === currentSong);
              return (
                <Song key={ index }
                  index={ index }
                  title={ song.title }
                  duration={ this.formatTime(Number(song.duration)) }
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
          currentTime={ this.formatTime(currentTime) }
          duration={ this.formatTime(duration) }
          position={ (currentTime / duration) || 0 }
          volume={ this.state.volume }
          isPlaying={ isPlaying }
          handleSongClick={ () => this.handleSongClick(currentSong) }
          handlePrevClick={ () => this.handlePrevClick() }
          handleNextClick={ () => this.handleNextClick() }
          handleTimeChange={ (e) => this.handleTimeChange(e) }
          handleVolumeChange={ (e) => this.handleVolumeChange(e) }
        />

      </section>
    );
  }
}

export default Album;
