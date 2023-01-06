import React, { Component } from 'react';
import './App.css';
// import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { CustomNavbar } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <CustomNavbar />
      </React.Fragment>
    );
  }
}

export default App;
