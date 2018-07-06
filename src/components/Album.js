import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const slug = this.props.match.params.slug;
    const album = albumData.find( (album) => {
      return (album.slug === slug);
    });

    this.state = { album: album };
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
          </tbody>
        </table>

      </section>
    );
  }
}

export default Album;
