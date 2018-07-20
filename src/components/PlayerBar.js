import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">

        <section className="buttons">
          <button className="previous"
            onClick={ this.props.handlePrevClick }>
            <span className="icon ion-ios-skip-backward"></span>
          </button>
          <button className="play-pause"
            onClick={ this.props.handleSongClick }>
            <span className={
              this.props.isPlaying ? "icon ion-ios-pause" : "icon ion-ios-play"
            }></span>
          </button>
          <button className="next"
            onClick={ this.props.handleNextClick }>
            <span className="icon ion-ios-skip-forward"></span>
          </button>
        </section>

        <section className="time-control">
          <div className="current-time">{ this.props.currentTime }</div>
          <input
            type="range"
            className="seek-bar"
            value={ this.props.position }
            min="0"
            max="1"
            step="0.01"
            onChange={ this.props.handleTimeChange }
          />
          <div className="total-time">{ this.props.duration }</div>
        </section>

        <section className="volume-control">
          <div className="icon ion-ios-volume-low"></div>
          <input
            type="range"
            className="seek-bar"
            value={ this.props.volume }
            min="0"
            max="1"
            step="0.01"
            onChange={ this.props.handleVolumeChange }
          />
          <div className="icon ion-ios-volume-high"></div>
        </section>

      </section>
    );
  }
}

export default PlayerBar;
