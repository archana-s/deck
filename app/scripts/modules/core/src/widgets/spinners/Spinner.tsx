import * as React from 'react';
import autoBindMethods from 'class-autobind-decorator';

export interface ISpinnerProps {
  size?: string;
  message?: string;
  postnote?: string;
}

@autoBindMethods
export class Spinner extends React.Component<ISpinnerProps, {}> {
  static propTypes = {
    size: React.PropTypes.oneOf(['small', 'medium', 'large', 'page']),
    message: React.PropTypes.string,
    postnote: React.PropTypes.string
  }

  renderSmall = () => {
    return (
      <div className="load small">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    )
  }

  renderMediumOrLarge = () => {
    const { size, message } = this.props;
    return (
      <div className={`load ${size.toLowerCase()}`}>
        <div className="message color-text-accent">{message}</div>
        <div className="bars">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          {size.toLowerCase() === 'large' && <div className="bar" />}
          {size.toLowerCase() === 'large' && <div className="bar" />}
        </div>
      </div>
    )
  }

  renderPageLoader = () => {
    const { size, message } = this.props;
    return (
      <div className="styleguide">
        <div className={`load ${size.toLowerCase()}`}>
          <div className="message color-text-accent">{message}</div>
          <div className="bars">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            {size.toLowerCase() === 'large' && <div className="bar" />}
            {size.toLowerCase() === 'large' && <div className="bar" />}
          </div>
          <div className="postnote"></div>
        </div>
      </div>
    )
  }

  render() {
    switch((this.props.size && this.props.size.toLowerCase()) || null) {
      case 'small':
        return this.renderSmall();
      case 'medium':
        return this.renderMediumOrLarge();
      case 'large':
        return this.renderMediumOrLarge();
      case 'page':
        return this.renderPageLoader();
      default:
        return this.renderSmall();
    }
  }
}
