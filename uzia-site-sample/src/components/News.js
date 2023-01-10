import React from 'react';
import AppContext from '../AppContext';
import { Container } from 'react-bootstrap';
import { NewsGallery, PageHeaderImage } from '../components';

class News extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'News',
    };
  }

  render() {
    const { pageTitle } = this.state;

    return (
      <React.Fragment>
        <PageHeaderImage pageTitle={pageTitle} backgroundImageSource={`${process.env.PUBLIC_URL}/img/page_header/kawa.png`} />
        <Container>
          <div className="mt-5">
            <NewsGallery />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default News;