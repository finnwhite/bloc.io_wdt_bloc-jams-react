import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  handleMouseEnter() {
    this.setState({ isActive: true });
  }
  handleMouseLeave() {
    this.setState({ isActive: false });
  }

  renderIcon() {
    if (this.props.isPlaying) {
      return (<span className="icon ion-ios-pause"></span>);
    } else if (this.props.isCurrent || this.state.isActive) {
      return (<span className="icon ion-ios-play"></span>);
    } else {
      return (<span>{ this.props.index+1 }</span>);
    }
  }

  render() {
    return (
      <tr className="song" key={ this.props.index }
        onClick={ this.props.handleClick }
        onMouseEnter={ () => this.handleMouseEnter() }
        onMouseLeave={ () => this.handleMouseLeave() }
      >
        <td>{ this.renderIcon() }</td>
        <td>{ this.props.title }</td>
        <td>{ this.props.duration }</td>
      </tr>
    );
  }
}

export default Song;
