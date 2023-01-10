import React from 'react';
import { Button } from 'react-bootstrap';

class CustomTwitterDMButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { recipientId } = this.props;
    const url = `https://twitter.com/messages/compose?recipient_id=${recipientId}`
    return (
      <div>
        <Button href={url} target="_blank" className="twitter-dm-button-custom twitter-color">
          <span>
            <svg>
              <use xlinkHref={`${process.env.PUBLIC_URL}/img/svg/twitter.svg#twitter`}></use>
            </svg>
            Twitter DM
          </span>
        </Button>
      </div>
    );
  }

}
export default CustomTwitterDMButton;
