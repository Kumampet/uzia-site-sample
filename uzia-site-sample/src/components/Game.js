import React from 'react';
import { Container } from 'react-bootstrap';
import { GameGallery, PageHeaderImage } from '../components';
import { replaceURLPublicPath } from '../common';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Game'
    };
  }

  render() {
    const { pageTitle } = this.state;
    return (
      <React.Fragment>
        <PageHeaderImage pageTitle={pageTitle} backgroundImageSource={replaceURLPublicPath(`/img/page_header/kawa.png`)} />
        <Container>
          <div className="mt-5">
            {/* <h1>工事中</h1> */}
            <GameGallery allViewPath={replaceURLPublicPath(`/game`)} />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Game;