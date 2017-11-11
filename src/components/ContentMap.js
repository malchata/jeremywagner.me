export const ContentMap = {
	"/": {
		metadata: require("../routes/index.js").Metadata
	},
	"/writing/": {
		metadata: require("../routes/writing/index.js").Metadata
	},
	"/about/": {
		metadata: require("../routes/about/index.js").Metadata
	},
	"/hire/": {
		metadata: require("../routes/hire/index.js").Metadata
	},
	"/blog": {
		"/net-neutrality-web-performance/": {
			excerpt: require("../routes/blog/net-neutrality-web-performance/index.js").BlogExcerpt,
			metadata: require("../routes/blog/net-neutrality-web-performance/index.js").Metadata
		},
		"/faster-bulk-image-optimization-in-bash/": {
			excerpt: require("../routes/blog/faster-bulk-image-optimization-in-bash/index.js").BlogExcerpt,
			metadata: require("../routes/blog/faster-bulk-image-optimization-in-bash/index.js").Metadata
		},
		"/css-is-broken-my-dime-a-dozen-opinion/": {
			excerpt: require("../routes/blog/css-is-broken-my-dime-a-dozen-opinion/index.js").BlogExcerpt,
			metadata: require("../routes/blog/css-is-broken-my-dime-a-dozen-opinion/index.js").Metadata
		},
		"/bulk-image-optimization-in-bash/": {
			excerpt: require("../routes/blog/bulk-image-optimization-in-bash/index.js").BlogExcerpt,
			metadata: require("../routes/blog/bulk-image-optimization-in-bash/index.js").Metadata
		},
		"/tips-for-writing-a-technical-book/": {
			excerpt: require("../routes/blog/tips-for-writing-a-technical-book/index.js").BlogExcerpt,
			metadata: require("../routes/blog/tips-for-writing-a-technical-book/index.js").Metadata
		},
		"/http2-in-developing-nations/": {
			excerpt: require("../routes/blog/http2-in-developing-nations/index.js").BlogExcerpt,
			metadata: require("../routes/blog/http2-in-developing-nations/index.js").Metadata
		},
		"/stop-using-the-protocol-relative-url/": {
			excerpt: require("../routes/blog/stop-using-the-protocol-relative-url/index.js").BlogExcerpt,
			metadata: require("../routes/blog/stop-using-the-protocol-relative-url/index.js").Metadata
		},
		"/svg-media-query/": {
			excerpt: require("../routes/blog/svg-media-query/index.js").BlogExcerpt,
			metadata: require("../routes/blog/svg-media-query/index.js").Metadata
		},
		"/using-webp-images/": {
			excerpt: require("../routes/blog/using-webp-images/index.js").BlogExcerpt,
			metadata: require("../routes/blog/using-webp-images/index.js").Metadata
		}
	}
};
