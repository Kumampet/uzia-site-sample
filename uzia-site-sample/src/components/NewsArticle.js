import React from 'react';
import { Image } from 'react-bootstrap';
import AppConntext from '../AppContext';
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
		const { newsData, id } = this.state;
		const title = newsData.title;
		const paragraphs = newsData.paragraphs;

		return (
			<div className="news-article-container">
				<Image className='mt-0 mx-auto d-block' src={`${process.env.PUBLIC_URL}/img/page_header/mori.png`} rounded thumbnail />
				<div className="mt-5 news-article-body">
					<span>ID:{id}</span>
					<h1>{title}</h1>
					<div className="news-article-paragraph">
						{_map(paragraphs, (paragraph, index) => {
							if (paragraph.type === 'text') {
								return <p key={`p-${index}`}>{paragraph.value}</p>
							} else if (paragraph.type === 'image') {
								let imageSrc = "";
								if (_includes(imageSrc, "http") || _includes(imageSrc, "https")) {
									imageSrc = paragraph.value;
								} else {
									imageSrc = process.env.PUBLIC_URL + paragraph.value;
                }
								return <Image key={`img-${index}`} className='mx-auto d-block' src={imageSrc} rounded thumbnail />
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default NewsArticle;