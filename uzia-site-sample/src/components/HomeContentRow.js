import React from 'react';
import { CardTile } from '../components';

class HomeContentRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: props.title
    }
  }

  render() {
    const { contentItems, contentType } = this.props;
    const { headerTitle } = this.state;
    return (
      <div className="mt-5">
        <h2>{headerTitle}</h2>
        {contentType === 'card' && <CardTile contentItems={contentItems} />}
      </div>
    );
  }
}

export default HomeContentRow;