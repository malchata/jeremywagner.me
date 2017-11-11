import { h, render, Component } from "preact";
import SubHeading from "../../components/SubHeading";
import Image from "../../components/Image";
import SignOff from "../../components/SignOff";

export const Metadata = {
	title: "About",
	description: "A little biography of web developer, author, and speaker Jeremy Wagner.",
	date: "4 November, 2017",
	sitemapPriority: 0.5,
	slug: "/about/"
};

export default class Content extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<article>
				<h1>{Metadata.title}</h1>
				<p>Hello! I'm Jeremy. I'm a web developer from Saint Paul, Minnesota. I've worked for many agencies and outfits across the metro.</p>
				<Image
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509298941/jeremywagner.me/about/st-paul-1x.jpg"}
					srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509298941/jeremywagner.me/about/st-paul-1x.jpg 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509298941/jeremywagner.me/about/st-paul-2x.jpg 2x"}
					caption={"Yes, it\'s cold here. No, we don\'t all talk like the cast in Fargo."}
					width={400}
					height={267}
					critical={false}
					saveData={props.saveData}
				/>
				<SubHeading deepLink={"writing"}>Writing</SubHeading>
				<p>I'm the author of the Manning Publications book <a href="https://manning.com/books/web-performance-in-action?a_aid=webopt&amp;a_bid=63c31090" rel="noopener"><em>Web Performance in Action</em></a>. This title is available for preorder and early preview through <a href="https://www.manning.com/meap-program" rel="noopener">Manning's MEAP Program</a>. The book centers on the importance of web performance, and teaches the many aspects of improving this vital aspect of your websites using plain and approachable language.</p>
				<p>Beyond writing a book, I've also written for some popular online outlets. <a href="/writing">Check out the full list of articles I've written here</a>.</p>
				<SubHeading deepLink={"speaking"}>Speaking</SubHeading>
				<p>I also speak on technical topics that I feel are of use and importance to the web development community. I'm always interested in speaking engagements at conferences, particularly on the topic of web performance. If you have a conf that you think I'd be a good fit for, <a href="mailto:jeremy.wagner@gmail.com">let's talk</a>. I currently have a few of my slide decks over at <a href="https://speakerdex.co/malchata" rel="noopener">Speakerdex</a>.</p>
				<SubHeading deepLink={"other-stuff"}>Other stuff</SubHeading>
				<p>In my spare time, I enjoy writing and recording music. In 2015, I finished a record for my solo hard rock project <a href="http://astridetheline.bandcamp.com" rel="noopener">Astride the Line</a>. I'm currently assembling riffs for my next project, but the going is a bit slow.</p>
				<p>I used to draw a lot, but I haven't really done much lately. I drew the self portrait image in the page header in Illustrator. I'd love to get back into drawing again, and intend to at some point.</p>
				<p>If you're curious about anything else, or want to <a href="/lets-work-together">hire me for a project of yours</a>, then just <a href="mailto:jeremy.wagner@gmail.com">bug me via email</a>!</p>
				<SignOff/>
			</article>
		);
	}
}
