import { h, render, Component } from "preact";

/* When a new blog gets published, just push it on the top of the array */
const contentExcerpts = [
	require("../routes/blog/net-neutrality-web-performance/index.js").Excerpt,
	require("../routes/blog/faster-bulk-image-optimization-in-bash/index.js").Excerpt,
	require("../routes/blog/css-is-broken-my-dime-a-dozen-opinion/index.js").Excerpt,
	require("../routes/blog/bulk-image-optimization-in-bash/index.js").Excerpt,
	require("../routes/blog/tips-for-writing-a-technical-book/index.js").Excerpt,
	require("../routes/blog/http2-in-developing-nations/index.js").Excerpt,
	require("../routes/blog/stop-using-the-protocol-relative-url/index.js").Excerpt,
	require("../routes/blog/svg-media-query/index.js").Excerpt,
	require("../routes/blog/using-webp-images/index.js").Excerpt
];

export default class ContentExcerpts extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<article class="excerpts">
				{contentExcerpts}
			</article>
		);
	}
}
