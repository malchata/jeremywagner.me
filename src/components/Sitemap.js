import { h, render, Component } from "preact";
import { contentMetadata } from "./ContentExcerpts";

export default class Sitemap extends Component{
	constructor(props){
		super(props);
		this.urlPrefix = "https://jeremywagner.me";
	}

	lastmod(dateString){
		let date = new Date(Date.parse(dateString));
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	}

	render(props){
		let sitemapEntries = [];

		sitemapEntries.push(
			<url>
				<loc>{this.urlPrefix}/</loc>
				<priority>0.875</priority>
				<lastmod>{typeof contentMetadata["/"].updateDate === "undefined" ? this.lastmod(contentMetadata["/"].date) : this.lastmod(contentMetadata["/"].updateDate)}</lastmod>
			</url>,
			<url>
				<loc>{this.urlPrefix}/hire/</loc>
				<priority>0.75</priority>
				<lastmod>{typeof contentMetadata["/hire"].updateDate === "undefined" ? this.lastmod(contentMetadata["/hire"].date) : this.lastmod(contentMetadata["/hire"].updateDate)}</lastmod>
			</url>,
			<url>
				<loc>{this.urlPrefix}/writing/</loc>
				<priority>0.75</priority>
				<lastmod>{typeof contentMetadata["/writing"].updateDate === "undefined" ? this.lastmod(contentMetadata["/writing"].date) : this.lastmod(contentMetadata["/writing"].updateDate)}</lastmod>
			</url>,
			<url>
				<loc>{this.urlPrefix}/about/</loc>
				<priority>0.5</priority>
				<lastmod>{typeof contentMetadata["/about"].updateDate === "undefined" ? this.lastmod(contentMetadata["/about"].date) : this.lastmod(contentMetadata["/about"].updateDate)}</lastmod>
			</url>
		);

		Object.keys(contentMetadata["/blog"]).forEach((entry)=>{
			sitemapEntries.push(<url>
				<loc>{this.urlPrefix}/blog{entry}/</loc>
				<priority>1.0</priority>
				<lastmod>{typeof contentMetadata["/blog"][entry].updateDate === "undefined" ? this.lastmod(contentMetadata["/blog"][entry].date) : this.lastmod(contentMetadata["/blog"][entry].updateDate)}</lastmod>
			</url>);
		});

		return (
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				{sitemapEntries}
			</urlset>
		);
	}
}
