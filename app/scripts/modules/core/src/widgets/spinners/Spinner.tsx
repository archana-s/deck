import React, { Component } from 'react';

class Spinner extends Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['small', 'medium', 'large', 'page']),
    message: React.PropTypes.string,
    postnote: React.PropTypes.string
  }

  renderSmall = () => {
    return (
      <div className="load-bar small">
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
      </div>
    )
  }

  renderMediumOrLarge = () => {
    return (
      <div className={`load-bar ${this.props.size.toLowerCase()}`}>
        <div className="message color-text-accent">{this.props.message}</div>
        <div className="bars">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          {this.props.size.toLowerCase() === 'large' && <div className="bar" />}
          {this.props.size.toLowerCase() === 'large' && <div className="bar" />}
        </div>
      </div>
    )
  }

  renderPageLoader = () => {
    return (
      <div className={`load-bar ${this.props.size.toLowerCase()}`}>
        <div className="message color-text-accent">{this.props.message}</div>
        <div className="bars">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          {this.props.size.toLowerCase() === 'large' && <div className="bar" />}
          {this.props.size.toLowerCase() === 'large' && <div className="bar" />}
        </div>
        <div className="postnote"></div>
      </div>
    )
  }

  render() {
    switch(this.props.size.toLowerCase()) {
      case 'small':
        this.renderSmall();
        return;
      case 'medium':
        this.renderMediumOrLarge();
        return;
      case 'large':
        this.renderMediumOrLarge();
        return;
      case 'page':
        this.renderPageLoader();
        return;
    }
  }
}

export default Spinner;
