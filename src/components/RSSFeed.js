import { h, render, Component } from "preact";
import { contentMetadata } from "./ContentExcerpts";

export default class RSSFeed extends Component{
	constructor(props){
		super(props);
		this.urlPrefix = "https://jeremywagner.me";
	}

	pubDate(dateString){
		let date = new Date(Date.parse(dateString));
		let pieces = date.toString().split(" ");
		let offsetTime = pieces[5].match(/[-+]\d{4}/);
		let offset = (offsetTime) ? offsetTime : pieces[5];
		let parts = [
			pieces[0] + ",",
			pieces[2],
			pieces[1],
			pieces[3],
			pieces[4],
			offset
		];

		return parts.join(" ");
	}

	render(props){
		let feed = [];

		Object.keys(contentMetadata["/blog"]).forEach((entry)=>{
			feed.push(<item>
				<title>{contentMetadata["/blog"][entry].title}</title>
				<description>{contentMetadata["/blog"][entry].description}</description>
				<link>{`${this.urlPrefix}/blog${contentMetadata["/blog"][entry].slug}/`}</link>
				<pubDate>{typeof contentMetadata["/blog"][entry].updateDate === "undefined" ? this.pubDate(contentMetadata["/blog"][entry].date) : this.pubDate(contentMetadata["/blog"][entry].updateDate)}</pubDate>
			</item>);
		});

		return (
			<rss version="2.0">
				<channel>
					<title>Jeremy Wagner's Web Development Blog</title>
					<description>{contentMetadata["/"].description}</description>
					<link>{`${this.urlPrefix}/`}</link>
					{feed}
				</channel>
			</rss>
		);
	}
}
