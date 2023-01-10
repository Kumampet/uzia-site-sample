import React from 'react';
import AppContext from '../AppContext';
import { Container } from 'react-bootstrap';
import { PageHeaderImage, AboutDevelopMember } from '../components';


class About extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'About',
    };
  }

  render() {
    const { pageTitle } = this.state;

    return (
      <React.Fragment>
        <PageHeaderImage pageTitle={pageTitle} backgroundImageSource={`${process.env.PUBLIC_URL}/img/page_header/umi.png`}/>
        <Container>
          <div className="mt-5">
            <h2>サークル「ユーザイア アボカド農園」について</h2>
            <p>ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。ここに文章が入ります。</p>
          </div>

          <div className="mt-5">
            <AboutDevelopMember/>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default About;