import React from 'react';
import '@/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/CustomNavbar";

const navMenuData = {
  "mainTitle": "ユーザイア アボカド農園 公式サイト(仮）",
  "menuLists": [
    {
      "type": "link",
      "name": "Home",
      "href": "/"
    },
    {
      "type": "link",
      "name": "About",
      "href": "/about"
    },
    {
      "type": "link",
      "name": "News",
      "href": "/news"
    },
    {
      "type": "link",
      "name": "Game",
      "href": "/game"
    },
    {
      "type": "link",
      "name": "Contact",
      "href": "/contact"
    }
  ]
}

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Navbar flex={true} fixed="top" sticky="top" navMenuData={navMenuData} navlinkMargin="md"/>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
