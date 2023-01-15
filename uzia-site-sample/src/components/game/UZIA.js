import React from 'react';
import { replaceURLPublicPath } from '../../common';

export default class UZIA extends React.Component {

  calcNavbarHeight = () => {
    const navbar = document.querySelector('.main-navbar');
    return navbar? navbar.clientHeight : 0;
  }
  render() {
    const navbarHeight = this.calcNavbarHeight();
    console.log({navbarHeight})
    return(
      <React.Fragment>
        <div>
          <div style={{
            backgroundImage: `url(${replaceURLPublicPath('/img/sample_1920x1080.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: `calc(100vh - ${navbarHeight}px)`
          }}></div>
          {/* <img src={replaceURLPublicPath('/img/sample_1920x1080.png')}/> */}
          <div>
            <h1>UZIA</h1>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}