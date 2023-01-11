import React, { Component } from 'react';
import { TwitterEmbed } from '../components';
import { Image } from 'react-bootstrap';
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
      <div className="d-flex flex-column justify-content-evenly align-items-center" style={{ height: "100%"}}>
        <p>当サークルへのお問い合わせはTwitter DMもしくはメールにお寄せください。</p>
        <div className="text-nowrap text-center ">
          <h3>Twitter DM</h3>
          <TwitterEmbed embedType="dm_button" recipientId={twitter_id} />
        </div>
        <div className="mail text-center ">
          <h3>Mail</h3>
          <p>mail@example.com</p>
        </div>
        <Image fluid={true} rounded={true} src={`${process.env.PUBLIC_URL}/img/top_contact_catch.png`} style={{ maxWidth: "250px"}} />
      </div>
    )
  }
}

export default HomeContact;
