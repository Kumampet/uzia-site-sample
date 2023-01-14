import React from 'react';
import AppContext from '../AppContext';
import { Container } from 'react-bootstrap';

class _404 extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <div className="mt-5">
            <h1>Page is Not Found...(404)</h1>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default _404;