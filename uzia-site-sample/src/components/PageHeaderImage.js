import React from 'react';
import AppContext from '../AppContext';

class PageHeaderImage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      imageSource: props.backgroundImageSource
    };
  }

  render() {
    const { imageSource } = this.state;
    return (
      <div className="page-header-container">
        <h1 className="page-title">Page Title</h1>
        <div className="page-header" style={{backgroundImage: `url(${imageSource})`}}></div>
      </div>
    );
  }
}

export default PageHeaderImage;
