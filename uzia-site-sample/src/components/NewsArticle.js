import React from 'react';
import { Image } from 'react-bootstrap';

class NewsArticle extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
			newsData: props.newsData
		};
	}

	render() {
		const { newsData } = this.state;
		const title = newsData.title;
		return (
			<React.Fragment>
				<Image className='mt-0 mx-auto d-block' src={`${process.env.PUBLIC_URL}/img/page_header/mori.png`} rounded thumbnail/>
				<div className="mt-5">
					<h1>{title}</h1>
				</div>
			</React.Fragment>
		);
	}
}

export default NewsArticle;