import React, { Component } from 'react';
import './App.css';
// import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {CustomNavbar as Navbar } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    );
  }
}

export default App;
