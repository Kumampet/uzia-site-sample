import React from 'react';
import { Container } from 'react-bootstrap';
import { PageHeaderImage } from '../components';
import { Button, Card, Row, Col } from 'react-bootstrap';

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
        <PageHeaderImage pageTitle={pageTitle} backgroundImageSource={`${process.env.PUBLIC_URL}/img/page_header/mori.png`} />
        <Container>
          <div className="mt-5">
            <p>弊サークルへのお問い合わせは以下よりお受けいたします。</p>
            <p>また、頂きましたお問い合わせにつきましては全て目を通させていただきますが、返答につきましてはサークル内部で協議の上、必要な場合にのみご回答させていただきます。予めご了承ください。</p>
          </div>

          <div className="mt-5 contact-flex-field">
            <Row xs={1} sm={1} md={1} lg={2}>
              <Col>
                <h2>公式Twitter</h2>
                <Card>
                  <Row xs={1} sm={2}>
                    <Col className="twitter-image-col">
                      <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/img/uzia_icon_sample.png`} />
                    </Col>
                    <Col>
                      <Card.Body className='card-body'>
                        <Card.Text>当サークル公式TwitterのDMよりお問い合わせをお受けしております。</Card.Text>
                        <Button variant="primary" href="/">Twitter DMはこちら</Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col>
                <h2>お問い合わせフォーム</h2>
                <Card>
                  <Card.Body>
                    <Card.Text>当サークルのお問い合わせフォームです。ご連絡可能なメールアドレス必須です。</Card.Text>
                    <h1>工事中</h1>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Contact;