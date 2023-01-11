import React from 'react';
import AppContext from '../AppContext';
import { Container } from 'react-bootstrap';
import { NewsArticle } from '../components';
import _get from 'lodash/get';
import _find from 'lodash/find';

class NewsPage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'News',
    };
  }

  getNewsInfoFromId = (id) => {
    const newsDatas = this.context.newsDataItems;
    if (!newsDatas.length) {
      return null;
    }
    const data = _find(newsDatas, { id });
    return data;
  }
  
  render() {
    const newsId = _get(this.props.match, "params.id");
    return (
      <React.Fragment>
        <Container>
          <div className="mt-5">
            <NewsArticle newsData={this.getNewsInfoFromId(newsId)} />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default NewsPage;