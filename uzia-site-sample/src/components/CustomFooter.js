import React, { Component } from 'react';
import { CFooter } from '@coreui/react';
import dayjs from 'dayjs';
import commonTextLables from '../static/commonTextLabels.json';

class CustomFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commonTextLables: commonTextLables.common
    }
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
    const { nowYear, commonTextLables } = this.state;
    return (
      <CFooter>
        <div>
          <span>&copy; 2019-{nowYear} {commonTextLables.circle_info.circle_name}</span>
        </div>
      </CFooter>
    );
  }
}

export default CustomFooter;