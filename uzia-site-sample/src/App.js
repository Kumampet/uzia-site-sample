import React, { Component } from 'react';
import './stylesheet/App.css';
import {
  CustomNavbar as Navbar,
  CustomFooter as Footer
} from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
