import React, { Component } from 'react';
import albumData from './../data/albums';

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
      isPlaying: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = defaultSong.audioSrc;
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

  render() {
    const album = this.state.album;
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
            { album.songs.map( (song, index) =>
              <tr className="song" key={ index }
                onClick={ () => this.handleSongClick(song) }>
                <td>{ index+1 }</td>
                <td>{ song.title }</td>
                <td>{ song.duration } seconds</td>
              </tr>
            ) }
          </tbody>
        </table>

      </section>
    );
  }
}

export default Album;
