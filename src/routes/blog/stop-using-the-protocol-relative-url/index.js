import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SubHeading from "../../../components/SubHeading";
import Image from "../../../components/Image";
import CodeBlock from "../../../components/CodeBlock";
import SignOff from "../../../components/SignOff";
import ReadMore from "../../../components/ReadMore";

export const Metadata = {
  title: "Stop Using the Protocol-relative URL",
  date: "22 July, 2016",
  updateDate: "5 March, 2017",
  description: "Using the protocol-relative URL has long been touted as a best practice, but its continued use can be detrimental to performance. Read on to find out more.",
  slug: "/blog/stop-using-the-protocol-relative-url/"
};

export const BlogExcerpt = <Excerpt>
  <h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
  <p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
  <p>Paul Irish <a href="http://www.paulirish.com/2010/the-protocol-relative-url" rel="noopener">wrote about the protocol-relative URL</a> way back in 2010. It was a convenient little post that advised developers to abandon absolute protocol URL schemes using <code>{`http://`}</code> or <code>{`https://`}</code> in favor of a protocol-relative variant that looks something like this:</p>
  <CodeBlock>{`<script src="//code.jquery.com/jquery-2.2.3.min.js"></script>`}</CodeBlock>
  <p>This convenient syntax eliminates the need for developers to construct URLs based on the user's current security context. If this syntax was used on an HTTP page to include something from a CDN, it retrieved the HTTP version. If the user used it on an HTTPS page, it retrieved the HTTPS version. Seems like a hell of an idea, right?</p>
  <ReadMore link={Metadata.slug}/>
</Excerpt>;

export default class Content extends Component{
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <article>
        {BlogExcerpt}
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294660/jeremywagner.me/stop-using-the-protocol-relative-url/gomer-pyle-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294442/jeremywagner.me/stop-using-the-protocol-relative-url/gomer-pyle-1x.jpg"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294442/jeremywagner.me/stop-using-the-protocol-relative-url/gomer-pyle-1x.jpg 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294442/jeremywagner.me/stop-using-the-protocol-relative-url/gomer-pyle-2x.jpg 2x"}
          caption={"What could possibly go wrong?"}
          width={384}
          height={216}
          critical={false}
          saveData={props.saveData}
        />
        <p>When Paul Irish wrote about this in 2010, it was a great piece of advice. We were living in a time when sites only adopted HTTPS when absolutely necessary. The web is a different place now, though. We're rapidly moving toward a "secure by default" mindset, even for content that may not be considered especially sensitive. This is a <em>good thing</em>.</p>
        <p>Paul Irish has since changed his stance, and now advises against using this URL scheme to reference cross-origin resources. His rationale is that while using the scheme on HTTPS pages is safe, the reverse is not true. Using the scheme on a non-secure page will retrieve cross-origin assets in a non-secure fashion. This isn't good, and it's rather easy to just slap an <code>{`https://`}</code> protocol on your URLs to ensure that your site is completely secure.</p>
        <p>The problem isn't just with security, however. This URL scheme has the potential to hurt performance. Many of the new and shiny features that are starting to come into prominence will only work if SSL is enabled, and if you're using CDN-hosted resources over HTTP, you're missing out.</p>
        <SubHeading>HTTP/2</SubHeading>
        <p>The biggest thing you're missing out on if you use the protocol-relative URL scheme on non-secure pages is HTTP/2. HTTP/2 solves a number of performance problems for us. The big problem it solves is head of line blocking. In HTTP/1, requests are batched together and executed in small batches (usually six at a time). The next batch of requests, however, can't begin to download until <em>all</em> of the requests in the previous batch have completed.</p>
        <p>If you have a website that grabs a lot of resources from a single CDN over an insecure connection, this could be problematic if you use the protocol-relative URL scheme on a non-secure page. You could be forcing a <em>downgrade</em> to HTTP/1, thus incurring a performance penalty. Below, you can see a request for <code>{`jquery.min.js`}</code> on <a href="https://cdnjs.com" rel="noopener">Cloudflare's CDN</a> on both HTTP and HTTPS:</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294660/jeremywagner.me/stop-using-the-protocol-relative-url/https-vs-http-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294442/jeremywagner.me/stop-using-the-protocol-relative-url/https-vs-http-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294442/jeremywagner.me/stop-using-the-protocol-relative-url/https-vs-http-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509294442/jeremywagner.me/stop-using-the-protocol-relative-url/https-vs-http-2x.png 2x"}
          caption={"Note the values of the protocol and scheme columns."}
          width={359}
          height={98}
          saveData={props.saveData}
        />
        <p>When the resource is requested over HTTPS, the value of the protocol column is "h2", which signifies that the resource is being transmitted using HTTP/2. However, when the same resource is requested on the same domain over an insecure HTTP connection, the connection downgrades to HTTP/1.1.</p>
        <p>Avoiding head of line blocking isn't the only reason to embrace HTTP/2. This new protocol compresses headers that are transmitted with requests and responses, something that HTTP/1 doesn't do. If you want to shave a few more bytes off of those requests, then slap that <code>{`https://`}</code> on your CDN references.</p>
        <p><strong>Side note:</strong> HTTP/2 isn't the only protocol you could be missing out on. Google Fonts uses the QUIC protocol, which uses UDP instead of TCP. Like HTTP/2, this protocol requires an HTTPS connection.</p>
        <SubHeading>Brotli</SubHeading>
        <p>Google's been hard at work on <a href="https://github.com/google/brotli">Brotli</a>, its contender to the venerable gzip. Brotli support now ships with Chrome as of version 50, and Firefox has supported it since version 44. Other Chromium-based browsers such as Opera 38+ are throwing in support for it as well.</p>
        <p><a href="http://google-opensource.blogspot.com/2015/09/introducing-brotli-new-compression.html" rel="noopener">Google has sung the praises of Brotli</a>, and is even used for offline compression of WOFF2 font files, yielding additional savings over its WOFF predecessor. When used on web servers, it can be a mixed blessing. I'm currently using a build of <a href="https://github.com/kjdev/apache-mod-brotli" rel="noopener">mod_brotli</a> for this site, and it yields a modest performance gain of only around 3-5% at the default settings when compared to gzip's defaults.</p>
        <p>In my book <a href="https://www.manning.com/books/web-performance-in-action?a_aid=webopt&a_bid=63c31090" rel="noopener"><em>Web Performance in Action</em></a>, I noted that the gains are relatively modest unless you're using very high compression settings. The problem with this, though, is that the compression takes so long that it actually performs <em>worse</em> than gzip when you factor in latency. There are some ways around this, particularly if you cache the compressed result on disk, and serve that content on subsequent requests. This approach is called static compression. With it, we can realize some serious performance gains using Brotli without suffering from its current performance problems at high compression settings.</p>
        <p>The thing about Brotli is that, like HTTP/2, you <em>must</em> be using HTTPS in order to benefit from it. Currently, Google Fonts serves CSS using Brotli (and HTTP/2!) over HTTPS, and gzip over HTTP. This may not sound like a big deal, but there are two things to remember about Brotli:</p>
        <ol>
          <li>Not all CDNs have adopted Brotli, but they likely will at some point. When they eventually do, they have tremendous resources to statically compress content and serve it to the client without performance penalties.</li>
          <li>Brotli is a nascent technology compared to gzip, which has been around for quite a long time. As Brotli is further developed, it could improve.</li>
        </ol>
        <p>In short, if you persist in using the protocol-relative URL from an insecure origin, you might be cheating yourself of a new compression technology when referencing CDN assets. If you can squeeze a little more performance out of a page with little effort, wouldn't you want to?</p>
        <SubHeading>Isn't HTTPS Slow?</SubHeading>
        <p>The short answer is no.</p>
        <p>The (somewhat) longer answer: On HTTP/1.1? Potentially, since more than one connection is opened per origin, and the overhead of setting up a secure connection occurs more often. On HTTP/2, there is only one connection per origin, so this process only occurs once. Furthermore, modern hardware renders the impact of HTTPS overhead to be far less significant than it may have been mere years ago. If you want to know more, visit <a href="https://istlsfastyet.com" rel="noopener">IsTLSFastYet.com</a>.</p>
        <p>The last thing you should be worried about with your references to CDN assets is HTTPS performance. If anything can mitigate whatever performance issues exist, it's the deep pockets of companies like Google that can invest in more resources to lessen the impact. Furthermore, if your CDN is running HTTP/2, HTTPS performance is a non-issue when you consider the performance benefits that it provides.</p>
        <SubHeading>Redirects</SubHeading>
        <p>As time goes on, CDNs may stop serving content over HTTP altogether in favor of HTTPS. This will mean that requests made over HTTP to these servers will have to redirect to HTTPS. Redirects add to load times, as the hop from HTTP to HTTPS takes longer to resolve than if the request was made directly to an HTTPS URL. If none of the other reasons for abandoning the protocol-relative URL scheme are appealing to you, this one ought to be reason enough. Minimizing redirects just makes sense.</p>
        <SubHeading>Conclusion</SubHeading>
        <p>If you've been referencing cross-origin resources with the protocol-relative URL scheme, it's time to stop. Especially if you're doing so from an insecure origin. You're likely missing out on the performance benefits of HTTP/2, and maybe missing out on Brotli compressed content. If CDNs decide to stop using HTTP altogether, your requests will be burdened by higher latency as redirects to secure resources occur. There may even be more performance benefits that you're missing out on that I haven't listed here. If you know of any, pipe up in the comments!</p>
        <p>Hopefully this little post has proved useful to you. We all have a part in making the web faster for everyone, which is usually no small task. Except for the advice prescribed in this post. It's a small task. If we all embark on it, it can inch us a little bit closer to a faster and more secure web for everybody. It's incremental change we can all get behind.</p>
        <SignOff/>
      </article>
    );
  }
}
