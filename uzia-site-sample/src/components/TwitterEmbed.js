import React from 'react';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from 'react-twitter-embed';

class TwitterEmbed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { embedType, sourceType, height, lang, url } = this.props;
    let embed = null;

    if (embedType === 'timeline') {
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
    }

    return (
      <div className="twitter-embed-container" style={{ height: `${height}px` }}>
        <div className="twitter-embed-body">
          {embed}
        </div>
        <div className="twitter-embed-loading">
          <h3>Now Loading...</h3>
        </div>
      </div>
    )

  }
}

export default TwitterEmbed;