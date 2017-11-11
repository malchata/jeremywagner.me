import { h, render, Component } from "preact";
import { ContentMap } from "./ContentMap";

export default class Sitemap extends Component{
	constructor(props){
		super(props);
		this.urlPrefix = "https://jeremywagner.me";
		this.sitemapEntries = [];
	}

	lastmod(dateString){
		let date = new Date(Date.parse(dateString));
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	}

	populateSitemapEntries(contentTree, parentSlug){
		for(var entry in contentTree){
			if(typeof contentTree[entry].metadata === "undefined"){
				this.populateSitemapEntries(contentTree[entry], entry);
				return;
			}

			let slug = typeof parentSlug === "undefined" ? entry : `${parentSlug}${entry}`;

			this.sitemapEntries.push(<url>
				<loc>{this.urlPrefix}{slug}</loc>
				<priority>{typeof contentTree[entry].metadata.sitemapPriority === "undefined" ? 1.0 : contentTree[entry].metadata.sitemapPriority}</priority>
				<lastmod>{typeof contentTree[entry].metadata.updateDate === "undefined" ? this.lastmod(contentTree[entry].metadata.date) : this.lastmod(contentTree[entry].metadata.updateDate)}</lastmod>
			</url>);
		}
	}

	render(props){
		this.populateSitemapEntries(ContentMap);

		return (
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				{this.sitemapEntries}
			</urlset>
		);
	}
}
