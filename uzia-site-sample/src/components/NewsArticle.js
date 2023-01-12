import React from 'react';
import { Image } from 'react-bootstrap';
import AppConntext from '../AppContext';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _includes from 'lodash/includes';
import _map from 'lodash/map';

class NewsArticle extends React.Component {
	static contextType = AppConntext;
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			newsData: props.newsData
		};
	}

	render() {
		const { newsData } = this.state;
		const title = newsData.title;
		const paragraphs = newsData.paragraphs;

		return (
			<div className="news-article-container">
				<Image className='mt-0 mx-auto d-block' src={`${process.env.PUBLIC_URL}/img/page_header/mori.png`} rounded thumbnail />
				<div className="mt-5 news-article-body">
					<h1>{title}</h1>
					<div className="news-article-paragraph">
						{_map(paragraphs, (paragraph, index) => {
							if (paragraph.type === 'text') {
								return <p key={`p-${index}`}>{paragraph.value}</p>
							} else if (paragraph.type === 'image') {
								return <Image key={`img-${index}`} className='mx-auto d-block' src={paragraph.value} rounded thumbnail />
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default NewsArticle;