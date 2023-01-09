import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

class PageHeaderImage extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    backgroundImageSource: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      imageSource: props.backgroundImageSource,
      pageTitle: props.pageTitle
    };
  }

  render() {
    const { imageSource, pageTitle } = this.state;
    return (
      <div className="page-header-container">
        <div className="page-header" style={{backgroundImage: `url(${imageSource})`}}></div>
        <h1 className="page-title">{pageTitle}</h1>
      </div>
    );
  }
}

export default PageHeaderImage;
