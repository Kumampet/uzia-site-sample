import React from 'react';
import { Container } from 'react-bootstrap';
import { PageHeaderImage } from '../components';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Contact',
    };
  }

  render() {
    const { pageTitle } = this.state;

    return (
      <React.Fragment>
        <PageHeaderImage pageTitle={pageTitle} backgroundImageSource={`${process.env.PUBLIC_URL}/img/page_header/mori.png`}/>
        <Container>
        </Container>
      </React.Fragment>
    );
  }
}

export default Contact;