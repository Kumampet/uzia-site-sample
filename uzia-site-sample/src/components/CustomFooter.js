import React, { Component } from 'react';
import AppContext from '../AppContext';
import { CFooter } from '@coreui/react';
import dayjs from 'dayjs';

class CustomFooter extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this._isMounted = true;
    this.setNowYear();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setNowYear = () => {
    const nowDate = dayjs();
    const _year = nowDate.format('YYYY');
    this.setState({ nowYear: _year });
  }

  render() {
    const { nowYear } = this.state;
    const circleName = this.context.circleInfoData.circle_name;
    return (
      <CFooter>
        <div>
          <span>&copy; 2019-{nowYear} {circleName}</span>
        </div>
      </CFooter>
    );
  }
}

export default CustomFooter;