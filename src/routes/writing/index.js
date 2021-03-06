import { h, render, Component } from "preact";
import SubHeading from "../../components/SubHeading";
import SignOff from "../../components/SignOff";

export const Metadata = {
  title: "Stuff I Wrote",
  description: "A list of my published articles.",
  date: "4 November, 2016",
  sitemapPriority: 0.75,
  slug: "/writing/"
};

export default class Content extends Component{
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <article>
        <h1>{Metadata.title}</h1>
        <p>While I have a blog, I spend most of my time writing for other outlets. Below is a comprehensive list of the articles I've had published in places other than here.</p>
        <p><em>*Indicates that I was not the sole author of the article, but received a byline as a contributor.</em></p>
        <SubHeading>A List Apart</SubHeading>
        <ul>
          <li><a href="https://alistapart.com/article/designing-for-research" rel="noopener">Designing for Research</a></li>
          <li><a href="https://alistapart.com/article/considering-how-we-use-http2/" rel="noopener">Considering How We Use HTTP/2</a></li>
          <li><a href="https://alistapart.com/article/using-http-2-responsibly-adapting-for-users/" rel="noopener">Using HTTP/2 Responsibly: Adapting for Users</a></li>
        </ul>
        <SubHeading>CSS Tricks</SubHeading>
        <ul>
          <li><a href="https://css-tricks.com/help-users-save-data/" rel="noopener">Help Your Users <code>Save-Data</code></a></li>
          <li><a href="https://css-tricks.com/paint-timing-api/" rel="noopener">Using the Paint Timing API</a></li>
          <li><a href="https://css-tricks.com/musings-on-http2-and-bundling/" rel="noopener">Musings on HTTP/2 and Bundling</a></li>
          <li><a href="https://css-tricks.com/brotli-static-compression/" rel="noopener">Brotli and Static Compression</a></li>
          <li><a href="https://css-tricks.com/cache-aware-server-push/" rel="noopener">Creating a Cache-aware HTTP/2 Server Push Mechanism</a></li>
          <li><a href="https://css-tricks.com/using-webp-images/" rel="noopener">Using WebP Images</a> (mirrored from <a href="/blog/using-webp-images">this post</a>)</li>
          <li><a href="https://css-tricks.com/font-display-masses/" rel="noopener"><code>font-display</code> for the Masses</a></li>
        </ul>
        <SubHeading>David Walsh Blog</SubHeading>
        <ul>
          <li><a href="https://davidwalsh.name/jpeg-compression-guetzli/" rel="noopener">JPEG Compression with Guetzli</a></li>
        </ul>
        <SubHeading>Google Web Fundamentals</SubHeading>
        <ul>
          <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/" rel="noopener">Reduce JavaScript Payloads with Tree Shaking</a></li>
          <li><a href="https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing/" rel="noopener">Assessing Loading Performance in Real Life with Navigation and Resource Timing</a></li>
          <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/" rel="noopener">Replace Animated GIFs with Video</a></li>
          <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/save-data/" rel="noopener">Delivering Fast and Light Applications with <code>Save-Data</code></a><em>*</em></li>
          <li><a href="https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/" rel="noopener">Lazy Loading Images and Video</a></li>
          <li><a href="https://developers.google.com/web/fundamentals/performance/why-performance-matters/" rel="noopener">Why Performance Matters</a></li>
        </ul>
        <SubHeading>Manning Publications</SubHeading>
        <ul>
          <li><a href="https://manning.com/books/web-performance-in-action?a_aid=webopt&a_bid=63c31090" rel="noopener">Web Performance in Action</a></li>
        </ul>
        <SubHeading>Net Magazine</SubHeading>
        <ul>
          <li><a href="https://www.creativebloq.com/how-to/4-essential-image-optimisation-tips" rel="noopener">4 Quick Image Optimization Tips</a> (<a href="https://www.myfavouritemagazines.co.uk/design/net-magazine-back-issues/net-january-2018-issue-301/" rel="noopener">Issue 301</a>)</li>
          <li><a href="http://www.creativebloq.com/how-to/5-tips-for-super-fast-css" rel="noopener">5 Tips for Super-fast CSS</a> (<a href="https://www.myfavouritemagazines.co.uk/design/net-magazine-back-issues/net-may-2017-issue-292/" rel="noopener">Issue 292</a>)</li>
        </ul>
        <SubHeading>Planet Performance</SubHeading>
        <ul>
          <li><a href="https://calendar.perfplanet.com/2017/3-tips-for-faster-font-loading/" rel="noopener">3 Tips for Faster Font Loading</a></li>
          <li><a href="https://calendar.perfplanet.com/2016/speed-versus-speed-to-market/" rel="noopener">Speed Versus Speed to Market</a></li>
        </ul>
        <SubHeading>Smashing Magazine</SubHeading>
        <ul>
          <li><a href="https://www.smashingmagazine.com/ebooks/the-webp-manual/" rel="noopener">The WebP Manual</a> (<a href="https://www.smashingmagazine.com/2018/07/converting-images-to-webp/" rel="noopener">Excerpt</a>)</li>
          <li><a href="https://www.smashingmagazine.com/2017/04/guide-http2-server-push/" rel="noopener">A Comprehensive Guide To HTTP/2 Server Push</a></li>
          <li><a href="https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/" rel="noopener">Next Generation Server Compression With Brotli</a></li>
        </ul>
        <SignOff/>
      </article>
    );
  }
}
