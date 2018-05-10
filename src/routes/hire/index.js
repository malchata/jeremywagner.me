import { h, render, Component } from "preact";
import SubHeading from "../../components/SubHeading";
import SignOff from "../../components/SignOff";

export const Metadata = {
  title: "Let's Work Together",
  description: "I do freelance work. Maybe you need someone to work on your next web project. I might be the person you need. Let's talk!",
  date: "4 November, 2016",
  sitemapPriority: 0.75,
  slug: "/hire/"
};

export default class Content extends Component{
  constructor(props){
    super(props);
  }

  render(props){
    return (
      <article>
        <h1>{Metadata.title}</h1>
        <p>I've been known to work on websites for people from time to time. If you've come here and you're thinking about hiring me for a project you have in mind, first let me say to you that I'm flattered you would consider me. Your project is very important to you, and I respect that.</p>
        <p>First, let's talk about what I do so we can be sure that I'm a good fit.</p>
        <SubHeading>Web performance consulting</SubHeading>
        <p>Maybe your website has been kind of dogging it lately. This is my favorite kind of problem to work on (<a href="https://manning.com/books/web-performance-in-action?a_aid=webopt&amp;a_bid=63c31090" rel="noopener">I did write a book on it</a>, after all). If you're interested in talking about what I can do to make your site faster for your visitors, <a href="mailto:jeremy.wagner@gmail.com">please do get in touch</a>.</p>
        <SubHeading>Building WordPress sites</SubHeading>
        <p>WordPress is my CMS of choice, and I'm pretty good at it. I build authoring experiences that make sense and are easy to use. Best of all, the sites I build in WordPress are <em>fast</em>.</p>
        <SubHeading>Building static sites</SubHeading>
        <p>You might have some design mockups you need built into fully functional HTML templates without needing a CMS back end. I love doing this kind of work. I do it quickly, with great accuracy, and with performance in mind.</p>
        <SubHeading>On-site consulting</SubHeading>
        <p>Do you need me to come to your place? I might be able to do that, but let's talk about the particulars first to see if an on-site consultation is a proper fit for both of us.</p>
        <SubHeading>Contacting me</SubHeading>
        <p>Contacting me is really easy. <a href="mailto:jeremy.wagner@gmail.com">Just bug me by email</a>. I'll get back to you shortly!</p>
        <SignOff/>
      </article>
    );
  }
}
