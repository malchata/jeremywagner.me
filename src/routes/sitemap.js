import ContentMap from "../components/ContentMap";

const urlPrefix = "https://jeremywagner.me";
let sitemap = [];

const lastmod = (dateString) => {
  let date = new Date(Date.parse(dateString));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const populateSitemap = (contentTree, parentSlug) => {
  for (var entry in contentTree) {
    if (typeof contentTree[entry].metadata === "undefined") {
      populateSitemap(contentTree[entry], entry);
      return;
    }

    let slug = typeof parentSlug === "undefined" ? entry : `${parentSlug}${entry}`;

    sitemap.push({
      loc: `${urlPrefix}${slug}`,
      priority: typeof contentTree[entry].metadata.sitemapPriority === "undefined" ? 1.0 : contentTree[entry].metadata.sitemapPriority,
      lastmod: typeof contentTree[entry].metadata.updateDate === "undefined" ? lastmod(contentTree[entry].metadata.date) : lastmod(contentTree[entry].metadata.updateDate)
    });
  }
}

populateSitemap(ContentMap);

export default sitemap;
