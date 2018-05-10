import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SubHeading from "../../../components/SubHeading";
import Image from "../../../components/Image";
import CodeBlock from "../../../components/CodeBlock";
import SignOff from "../../../components/SignOff";
import ReadMore from "../../../components/ReadMore";

export const Metadata = {
  title: "HTTP/2 in Developing Nations",
  date: "6 October, 2016",
  description: "I did some research on HTTP/2 support in browsers in developed and developing nations. Results within.",
  slug: "/blog/http2-in-developing-nations/"
};

export const BlogExcerpt = <Excerpt>
  <h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
  <p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
  <p className="editors-note">Hey, everyone! I talk about HTTP/2 (and other stuff) in <a href="https://manning.com/books/web-performance-in-action?a_aid=webopt&amp;a_bid=63c31090" rel="noopener">my upcoming book from Manning publications</a> on web performance. Maybe check it out if that's your kind of thing. In any event, I hope you like this post!</p>
  <p>I've been doing some research on HTTP/2 use across the world in preparation for an article on another outlet. In doing so, I've observed some compelling relationships between HTTP/2 support by browser, the developing world, and internet infrastructure quality.</p>
  <p>In developed nations, we see often see that internet infrastructure quality is pretty good in comparison to developing nations. That's not to say that some developed nations couldn't stand to do better, but they're often better by comparison. Let's take a quick look at this graph of average and peak connection speeds in the world's top 8 developing nations by population, courtesy of <a href="https://content.akamai.com/pg7162-q2-soti-connectivity-report.html" rel="noopener">Akamai's second quarter State of the Internet Report for 2016</a>:</p>
  <ReadMore link={Metadata.slug}/>
</Excerpt>;

export default class Content extends Component{
  constructor(props){
    super(props);
  }

  render(props){
    return (
      <article>
        {BlogExcerpt}
        <Image
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509303727/jeremywagner.me/http2-in-developing-nations/internet-speed-developed-nations-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509303727/jeremywagner.me/http2-in-developing-nations/internet-speed-developed-nations-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509303727/jeremywagner.me/http2-in-developing-nations/internet-speed-developed-nations-2x.png 2x"}
          caption={"Average and peak internet speeds in the top 8 developed nations by population."}
          width={416}
          height={361}
          saveData={props.saveData}
        />
        <p>Seems pretty much par for the course. South Korea leads by quite a bit, but beyond that, most other developed nations are pretty comparable. Now let's see what internet infrastructure looks like in the top 8 developing nations by population:</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304253/jeremywagner.me/http2-in-developing-nations/internet-speed-developing-nations-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509303727/jeremywagner.me/http2-in-developing-nations/internet-speed-developing-nations-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509303727/jeremywagner.me/http2-in-developing-nations/internet-speed-developing-nations-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509303727/jeremywagner.me/http2-in-developing-nations/internet-speed-developing-nations-2x.png 2x"}
          caption={"Average and peak internet speeds in the top 8 developing nations by population."}
          width={413}
          height={361}
          saveData={props.saveData}
        />
        <p>Now we're looking at a completely different picture. Forget about peak speeds for a minute, and just look at average speeds. Developing nations have much more fragile internet infrastructure by comparison. Now let's correlate this information to HTTP/2 support. What does browser support for HTTP/2 look like in the same set of developed nations? As always, <a href="http://caniuse.com/#search=http2" rel="noopener">data from caniuse.com</a> gives us an idea:</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304542/jeremywagner.me/http2-in-developing-nations/http2-support-developed-nations-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304253/jeremywagner.me/http2-in-developing-nations/http2-support-developed-nations-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304253/jeremywagner.me/http2-in-developing-nations/http2-support-developed-nations-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304253/jeremywagner.me/http2-in-developing-nations/http2-support-developed-nations-2x.png 2x"}
          caption={"Browser support of HTTP/2 in the top 8 developed nations by population."}
          width={450}
          height={351}
          saveData={props.saveData}
        />
        <p>Not too bad. Support ranges between 65% and 85%. There is a grey area here in the way of what caniuse considers "partial support", which means that some browsers may or may not support the protocol based on any number of conditions. A good example of this concept is IE11. On Windows 10, IE11 supports HTTP/2, but not on earlier versions of Windows.</p>
        <p>Okay, let's get out of the weeds. What does HTTP/2 support in browsers look like in developing nations?</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304626/jeremywagner.me/http2-in-developing-nations/http2-support-developing-nations-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304626/jeremywagner.me/http2-in-developing-nations/http2-support-developing-nations-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304626/jeremywagner.me/http2-in-developing-nations/http2-support-developing-nations-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509304626/jeremywagner.me/http2-in-developing-nations/http2-support-developing-nations-2x.png 2x"}
          caption={"Browser support of HTTP/2 in the top 8 developing nations by population."}
          width={447}
          height={347}
          saveData={props.saveData}
        />
        <p>If you care about web performance, then this correlation should be illuminating for you. What we're seeing is that developing nations with a poorer quality of internet infrastructure don't have the same support for HTTP/2 in the browser that those in the developed world do.</p>
        <p>So what does this mean? Consider for a moment that these people are visiting sites that may be HTTP/2-enabled. Those same sites may also be optimized for HTTP/2, which means they're abandoning HTTP/1 optimization patterns. What happens when someone using a browser incapable of understanding HTTP/2 visits that site? The connection downgrades to HTTP/1. This means that all of your HTTP/2-specific optimizations are now <em>detrimental</em> to those users.</p>
        <p>There are some things you can do to counteract this. You could just carry over your HTTP/1-specific optimizations to an HTTP/2 environment. Those optimizations don't necessarily slow down your site on HTTP/2, it just makes caching less efficient when assets change. Or, if your site's architecture is complex enough, you could change how you deliver assets based on the user's protocol version. I do that on this site on the back end in PHP by storing the protocol version as a boolean variable:</p>
        <CodeBlock>{`$isHttp2 = stristr($_SERVER["SERVER_PROTOCOL"], "HTTP/2") ? true : false;`}</CodeBlock>
        <p>With this simple boolean, I can change how I deliver assets on the front end. I can serve image sprites for HTTP/1 users in lieu of separate images by tagging the <code>{`<html>`}</code> tag with an <code>{`http1`}</code> class that I can target with CSS. I can serve combined CSS and JavaScript files for HTTP/1 users in lieu of more granular ones. I can choose to inline some CSS and scripts for HTTP/1 users, and use <a href="https://blog.cloudflare.com/announcing-support-for-http-2-server-push-2/" rel="noopener">Server Push</a> for HTTP/2 users.</p>
        <p>There's a lot you can do with this information. Analyze the capabilities of your audience, and make critical decisions based on your findings. The capabilities of users is changing constantly, though, so reassess periodically and see what's worth your time. You can plug in your <a href="https://google.com/analytics" rel="noopener">Google Analytics</a> data into <a href="http://caniuse.com" rel="noopener">caniuse.com</a> to see what features your specific audience supports. Hopefully this gives you some perspective on how we need to think about the capabilities of our users.</p>
        <SignOff/>
      </article>
    );
  }
}
