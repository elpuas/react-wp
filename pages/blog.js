import { Component } from 'react';
import fetch from 'isomorphic-fetch';

import Main from '../layouts/main';

class Blog extends Component {
	static getInitialProps = async ({ query }) => {
		const host = 'https://public-api.wordpress.com/rest/';
		const version = 'v1.1';
		// For public Rest API use this:
		//const endpoint = '/sites/es.blog.wordpress.com';
		const endpoint = `/sites/${ query.slug }`;

		const response = await fetch(`${host}${version}${endpoint}`);
		const site  = await response.json();

		return { site };
	};

	render() {
		const { site } = this.props;

		if( !site ){
			<Main title="loading">
				<div>Loading...</div>
			</Main>;
		}

		return (
			<Main title={ `${site.name} blog`}>
				<div>
					<h1 className="title">{ `${site.name}` }</h1>
					<p className="description">{ `${site.description}` }</p>
				</div>
			</Main>
		);
	}
}

export default Blog;
