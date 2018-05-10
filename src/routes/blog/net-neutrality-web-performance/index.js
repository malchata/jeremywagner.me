import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SignOff from "../../../components/SignOff";
import ReadMore from "../../../components/ReadMore";

export const Metadata = {
  title: "Without Net Neutrality, Performance Will Matter More Than Ever",
  date: "18 May, 2017",
  updateDate: "19 May, 2017",
  description: "If net neutrality falls, web performance best practices may be all we've got to stem the tide of abuses on the part of internet service providers.",
  slug: "/blog/net-neutrality-web-performance/"
};

export const BlogExcerpt = <Excerpt>
  <h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
  <p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
  <p>I read and write often about web performance. As time has gone on, I've found myself less drawn to the technical aspects of the issue — the human side of web performance proves far more intriguing. I'm interested in how our actions as designers and developers makes life easier for users. Performance is a vital part of the user experience. Those who appreciate its importance aren't simply improving performance metrics, they're improving users' lives. I find my work most rewarding when I know I've built a site that's fast, or if I've remedied performance problems on ailing sites. To me, that's the good fight, and I sleep best when I've fought it.</p>
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
        <p>In that fight, the adversary of performance is the lay of the land between the server and the browser. It's an adversary we can't vanquish. We can only diminish its effects through sound design and architectural decisions. Unlike villains in familiar stories, the journey of data between the server and the browser is not often a sentient adversary. It's a coldly neutral foe. At least, that's generally how it's been for web designers and developers in The United States.</p>
        <p>Until recently.</p>
        <p>We went through one of the most bizarre election seasons last year, the outcome of which became a harbinger for many harsh realities that may yet come to pass —one of which is that net neutrality may very well cease to exist. No matter where your beliefs fall in the political spectrum, the death of net neutrality will impact you as a practitioner of the web, and not for the better.</p>
        <p>As a content platform, the web is as small-d democratic as it gets. If you have an idea for something, you can build it and put it on the web, no matter how gravely serious or silly it may be. The only barriers to entry are time and money. Most importantly, the speed at which users access content is unencumbered by anything other than the lay of the land between them and whatever server that content is hosted on. For all of the problems in this country, we have at least treated the internet as an essential vehicle for free expression. Abuses have certainly occurred, but without net neutrality, those abuses will no longer be considered unlawful. They'll become a common feature of the landscape that we'll have to cope with.</p>
        <p><a href="https://arstechnica.com/tech-policy/2017/05/net-neutrality-goes-down-in-flames-as-fcc-votes-to-kill-title-ii-rules/" rel="noopener">This administration's FCC has already begun dismantling Title II rules that protect net neutrality</a>. They want to make the web a platform where internet service providers hold unilateral authority to decide which content providers should be prioritized over others. This move will undoubtedly be framed by net neutrality opponents as a massive new opportunity for investors to further profit from industry deregulation. Investor opportunity does not necessarily translate to a benefit for users at large.</p>
        <p>When we discuss performance in developer circles, we often use the phrase "performance matters!" Performance matters because users matter. Performance matters because fast sites are better conveyances for ideas than sluggish ones. If net neutrality is watered down or killed off altogether, performance will matter more than ever. Performance best practices may well be the only tools you'll have to overcome capricious network throttling on the part of service providers, particularly if you can't afford to have your content prioritized over competitors with deeper pockets.</p>
        <p>If you're a performance-minded developer, you're likely already well-equipped, and continuing education is your plan going forward. But what if you don't know much about this vital topic? You've got some catching up to do:</p>
        <p>
          <a href="http://stevesouders.com/hpws/" rel="noopener">High Performance Web Sites</a><br/>
          This is a seminal text by <a href="http://stevesouders.com/" rel="noopener">Steve Souders</a>, one of the foremost experts on the topic. If you know nothing about web performance, consider this book your starting point. Despite being almost ten years old, it's still largely relevant today.
        </p>
        <p>
          <a href="http://designingforperformance.com/" rel="noopener">Designing for Performance</a><br/>
          Authored by <a href="http://larahogan.me/" rel="noopener">Lara Hogan</a>, <em>Designing for Performance</em> is clearly written in approachable language that not only covers technical topics, but also cultural and soft skills-related challenges as they relate to the problem of performance. It is, above all, a pragmatic guide for performance-focused web developers, and richly deserves space on your shelf.
        </p>
        <p>
          <a href="https://hpbn.co/" rel="noopener">High Performance Browser Networking</a><br/>
          Few in this industry can boast of <a href="https://www.igvita.com/" rel="noopener">Ilya Grigorik's</a> technical acumen, and <em>High Performance Browser Networking</em> proves it. This book doesn't just give you tips for improving performance, it goes deep into its technical underpinnings. If you've ever wanted to understand how network architecture affects site speed, this is your book.
        </p>
        <p>Beyond the titans, there are also <a href="https://timkadlec.com/" rel="noopener">a wealth</a> <a href="http://www.standardista.com/" rel="noopener">of bloggers</a> <a href="http://www.perfplanet.com/" rel="noopener">out there</a> who fight the good fight for users every day. Compared to these people, I'm a Johnny-come-lately to the topic, but I've written <a href="https://www.manning.com/books/web-performance-in-action?a_aid=webopt&a_bid=63c31090" rel="noopener">a book of my own</a>. It's up to all of us to get educated on this subject, because if net neutrality falls, the day will come where performance isn't a matter of optimization, but a survival strategy.</p>
        <p>Net neutrality's fate is uncertain, but not sealed. <a href="https://consumercomplaints.fcc.gov/hc/en-us/requests/new?ticket_form_id=38824" rel="noopener">Voice your opposition to the FCC</a>. <a href="http://www.house.gov/representatives/" rel="noopener">Contact your representatives</a> and <a href="https://www.senate.gov/general/contact_information/senators_cfm.cfm" rel="noopener">senators</a>. Keep the pressure on. It could pay off. If it doesn't?</p>
        <p>Then you better knuckle down and focus on speed.</p>
        <p><em>Thanks to Susanna Kline for editing this piece.</em></p>
        <SignOff/>
      </article>
    );
  }
}
