import { ContentMap } from "./ContentMap";

const urlPrefix = "https://jeremywagner.me";
let feedMarkup = `<rss version="2.0">
	<channel>
		<title>Jeremy Wagner's Web Development Blog</title>
		<description>${ContentMap["/"].description}</description>
		<link>${urlPrefix}/</link>`;

const pubDate = (dateString)=>{
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
};

const populateFeed = (contentTree, parentSlug)=>{
	for(var entry in contentTree){
		if(entry !== "/"){
			if(typeof contentTree[entry].metadata === "undefined"){
				populateFeed(contentTree[entry], entry);
				return;
			}

			let slug = typeof parentSlug === "undefined" ? entry : `${parentSlug}${entry}`;

			feedMarkup += `<item>
					<title>${contentTree[entry].metadata.title}</title>
					<description>${contentTree[entry].metadata.description}</description>
					<link>${urlPrefix}${slug}</link>
					<pubDate>${typeof contentTree[entry].metadata.updateDate === "undefined" ? pubDate(contentTree[entry].metadata.date) : pubDate(contentTree[entry].metadata.updateDate)}</pubDate>
				</item>`;
		}
	}
};

populateFeed(ContentMap);

export const RSSFeed = `${feedMarkup}</channel></rss>`;
