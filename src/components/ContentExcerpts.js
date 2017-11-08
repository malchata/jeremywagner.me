import { h, render, Component } from "preact";
import SignOff from "./SignOff";

export const blogExcerpts = [
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

export const contentMetadata = {
	"/blog": {
		"/net-neutrality-web-performance": require("../routes/blog/net-neutrality-web-performance/index.js").Metadata,
		"/faster-bulk-image-optimization-in-bash": require("../routes/blog/faster-bulk-image-optimization-in-bash/index.js").Metadata,
		"/css-is-broken-my-dime-a-dozen-opinion": require("../routes/blog/css-is-broken-my-dime-a-dozen-opinion/index.js").Metadata,
		"/bulk-image-optimization-in-bash": require("../routes/blog/bulk-image-optimization-in-bash/index.js").Metadata,
		"/tips-for-writing-a-technical-book": require("../routes/blog/tips-for-writing-a-technical-book/index.js").Metadata,
		"/http2-in-developing-nations": require("../routes/blog/http2-in-developing-nations/index.js").Metadata,
		"/stop-using-the-protocol-relative-url": require("../routes/blog/stop-using-the-protocol-relative-url/index.js").Metadata,
		"/svg-media-query": require("../routes/blog/svg-media-query/index.js").Metadata,
		"/using-webp-images": require("../routes/blog/using-webp-images/index.js").Metadata
	},
	"/": require("../routes/index.js").Metadata,
	"/writing": require("../routes/writing/index.js").Metadata,
	"/about": require("../routes/about/index.js").Metadata,
	"/hire": require("../routes/hire/index.js").Metadata
};

export default class ContentExcerpts extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<article class="excerpts">
				{blogExcerpts}
				<SignOff/>
			</article>
		);
	}
}
