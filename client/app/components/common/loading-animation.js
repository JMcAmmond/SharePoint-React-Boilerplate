import React from 'react';
import './styles/loading-animation.scss';

export default class LoadingAnimation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="LoadingAnimation">
        <div className="cube-wrapper">
          <div className="cube-folding">
            <span className="leaf1"></span>
            <span className="leaf2"></span>
            <span className="leaf3"></span>
            <span className="leaf4"></span>
          </div>
          <span className="loading" data-name="Loading">Loading...</span>
        </div>
      </div>
    )
  }
}