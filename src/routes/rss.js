import ContentMap from "../components/ContentMap";

const urlPrefix = "https://jeremywagner.me";
let rss = {
  title: "Jeremy Wagner's Web Development Blog",
  description: ContentMap["/"].description,
  link: `${urlPrefix}/`,
  items: []
};

const pubDate = (dateString) => {
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

const populateFeed = (contentTree, parentSlug) => {
  for (var entry in contentTree) {
    if (entry !== "/") {
      if (typeof contentTree[entry].metadata === "undefined") {
        populateFeed(contentTree[entry], entry);
        return;
      }

      let slug = typeof parentSlug === "undefined" ? entry : `${parentSlug}${entry}`;

      rss.items.push({
        title: contentTree[entry].metadata.title,
        description: contentTree[entry].metadata.description,
        link: `${urlPrefix}${slug}`,
        pubDate: typeof contentTree[entry].metadata.updateDate === "undefined" ? pubDate(contentTree[entry].metadata.date) : pubDate(contentTree[entry].metadata.updateDate)
      });
    }
  }
};

populateFeed(ContentMap);

export default rss;
