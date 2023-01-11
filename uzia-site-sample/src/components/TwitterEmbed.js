import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  TwitterTimelineEmbed,
  // TwitterShareButton,
  // TwitterFollowButton,
  // TwitterHashtagButton,
  // TwitterMentionButton,
  // TwitterMomentShare,
  // TwitterDMButton,
  // TwitterVideoEmbed,
  // TwitterOnAirButton
} from 'react-twitter-embed';
import { Button } from 'react-bootstrap';

class TwitterEmbed extends React.Component {
  static propTypes = {
    embedType: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { embedType, sourceType, height, lang, url, recipientId } = this.props;
    let embed = null;
    let loading = false;
    let style = {};


    if (embedType === 'timeline') {
      loading = true;
      embed = (
        <TwitterTimelineEmbed
          sourceType={sourceType}
          options={{
            height: height
          }}
          lang={lang}
          url={url}
        />
      )
      style = { height: `${height}px` }
    }
    if (embedType === 'dm_button') {
      embed = (
        <Button href={`https://twitter.com/messages/compose?recipient_id=${recipientId}`} target="_blank" className="twitter-dm-button-custom twitter-color">
          <span>
            <svg>
              <use xlinkHref={`${process.env.PUBLIC_URL}/img/svg/twitter.svg#twitter`}></use>
            </svg>
            Twitter DM
          </span>
        </Button>
      );
    }

    return (
      <div className={classnames("twitter-embed-container", {"timeline" : embedType === 'timeline'})}  style={style}>
        <div className="twitter-embed-body">
          {embed}
        </div>
        {loading && (
          <div className="twitter-embed-loading">
            <h3>Now Loading...</h3>
          </div>
        )}
      </div>
    )

  }
}

export default TwitterEmbed;