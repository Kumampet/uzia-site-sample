import React, { Component } from 'react';
import { CustomTwitterDMButton } from '../components';
import AppContext from '../AppContext';

class HomeContact extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const twitter_id = this.context.circleInfoData.sns.twitter.user_id;
    return (
      <div className="text-center">
        <p>当サークルへのお問い合わせはTwitter DMもしくはメールにお寄せください。</p>
        <div>
          <h3>Twitter DM</h3>
          <CustomTwitterDMButton recipientId={twitter_id} />
        </div>
        <div className="mail">
          <h3>Mail</h3>
          <p>mail@example.com</p>
        </div>
      </div>
    )
  }
}

export default HomeContact;
