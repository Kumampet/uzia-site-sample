import React from 'react';
import { Spinner } from 'react-bootstrap';
import { replaceURLPublicPath } from '../../common';
import _get from 'lodash/get';

const LOADING_ANIMATION_BREAK_DURATION = 1000;

export default class UZIA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarHeight: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const timerId = setTimeout(() => {
      clearTimeout(timerId);
      const navbarHeight = this.calcNavbarHeight();
      console.log({ navbarHeight })
      this.breakLodingBackground();
      this.setState({
        navbarHeight
      });
    }, 1000);
  }

  calcNavbarHeight = () => {
    const navbar = document.getElementsByClassName('main-navbar')[0];
    return navbar ? navbar.clientHeight : 0;
  }

  breakLodingBackground = () => {
    const loadingElement = document.querySelector('.content-loading');
    // アニメーション時間（ミリ秒）
    const duration = LOADING_ANIMATION_BREAK_DURATION;

    // アニメーションの開始時間を格納する変数
    let startTime = Date.now();

    // アニメーションの開始時のスクロール位置を格納する変数
    let opacity = _get(loadingElement, "style.opacity") || 1;
    console.log("default opacity: ", opacity)

    // ローディング背景を消していく
    const handleLoadingOpacity = () => {
      // 現在時間の継続時間に対する進捗度を算出
      const progress = Math.min(1, (Date.now() - startTime) / duration);
      console.log({progress})
      // Opacityは（1 - 進捗度）を掛けたもの
      console.log({opacity})
      const newOpacity = opacity * (1 - progress);
      // 指定した量を再度設定
      loadingElement.style.opacity = newOpacity;
      if (progress < 1) {
        // 進捗度が1未満（=100%ではない）場合、自分自身を呼び出し、繰り返す
        requestAnimationFrame(handleLoadingOpacity);
      } else {
        // 進捗度100%になったらloadingフラグをfalseにする
        this.setState({
          loading: false
        });
      }
    }
    handleLoadingOpacity();
  }

  render() {
    const { loading, navbarHeight } = this.state;
    return (
      <React.Fragment>
        <div>
          {loading ? (
            <div className="content-loading" style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              display: "block",
              zIndex: "999",
              backgroundColor: "rgb(0, 0, 0)"
            }}>
              <div style={{
                position: "absolute",
                display: "block",
                top: "50%",
                left: "50%",
                color: "aliceblue",
                transform: "translate(-50%, -50%)"
              }}>
                <Spinner animation="border" role="status" style={{
                  width: "5rem",
                  height: "5rem",
                }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </div>
          ) : null
          }
          <div style={{
            backgroundImage: `url(${replaceURLPublicPath('/img/sample_1920x1080.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: `calc(100vh - ${navbarHeight}px)`
          }}></div>
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
      </React.Fragment >
    );
  }
}