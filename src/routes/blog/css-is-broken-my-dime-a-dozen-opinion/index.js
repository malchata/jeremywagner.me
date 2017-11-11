import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SignOff from "../../../components/SignOff";

export const Metadata = {
	title: "CSS is Broken: My Dime a Dozen Opinion",
	date: "3 April, 2017",
	description: "In which I offer an opinion on how CSS is not broken. An opinion nobody asked for.",
	slug: "/blog/css-is-broken-my-dime-a-dozen-opinion/"
};

export const BlogExcerpt = <Excerpt>
	<h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
	<p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
	<p>The latest web development shitstorm on Twitter has been "CSS is broken". To no one's surprise, this has provoked heated discussions on the perceived flaws of CSS, and what can be done to "fix" what's "broken" in the language. Here's my opinion, such as it is.</p>
	<p>Web development is a broad spectrum of varying skills. Any one developer exists in a spot in the spectrum, with skills varying in breadth and depth. On one extreme exists developers that feel JavaScript is their primary tool for solving problems, while CSS is a necessary evil for establishing a look and feel for a page. On the other extreme, there are developers (some identifying as designers) who see CSS as an essential part of the web developer's trinity, but shy away from using JavaScript extensively. Most of us exist somewhere between the extremes, but we tend to lean one way or the other (if you don't count those rare devs who seem magically capable of doing everything).</p>
</Excerpt>;

export default class Content extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<article>
				{BlogExcerpt}
				<p>This assessment is not unique, and I'm certain it's been made in one form or another long before I deigned to write this little screed, but there's value in repainting the picture. We each exist at some point within this incredibly broad spectrum of ability and talent. We're going to feel more or less comfortable about different technologies, libraries and frameworks based on where we exist on the spectrum. Moreover, our experiences influence our development preferences.</p>
				<p>That said, I feel the sentiment that CSS is broken is misguided. It makes no more sense than someone who dismisses reactive programming in JavaScript as "broken". To say something is broken strongly implies that it is useless. I still struggle to put the pieces together when it comes to fully understanding React, but I would be a damn fool to say it's "broken". React is proven. It has incredible utility and power. I could only be speaking out of frustration if I were to deride it.</p>
				<p>So when I hear developers say that "CSS is broken", I only hear frustration. These people are asking for features to make CSS seem less broken to them. Encapsulation and scope are the usual gripes I read about, that CSS is inherently flawed because everything exists in the global scope.</p>
				<p>This is flat out <em>wrong</em>. CSS is intentionally global in scope because it is up to <em>you</em> to <em>define</em> the scope that makes the best sense for <em>your</em> site or application. That doesn't make it broken. It means that you don't understand CSS well enough to make it work properly for you. The wide open nature of CSS means that it can be as encapsulated or as global you need it to be.</p>
				<p>This tirade doesn't end with me yelling at JavaScript devs to "get better at CSS". Proponents of CSS also have to keep reaching out to people who are struggling to understand the language. I spent a couple days earlier this year bitching on Twitter incessantly to anyone who would listen about how frustrated I was with Webpack, only to have core contributor Sean Larkin reach out to me in an effort to help me understand it. I have yet to take him up on his generous offer (ease up, I have a big backlog). When the time comes, I will reach out to Sean for his help. That kind of fellowship made me stop and realize that the problem wasn't Webpack. It was <em>me</em>. <em>I</em> was frustrated. I felt stupid and worthless. Sometimes when we feel stupid, we cast aspersions on the source of our frustration.</p>
				<p>CSS isn't the problem. The problem is that it's a difficult and nuanced language that's changing more rapidly now than it ever has. That causes frustration. Frustration instills all sorts of negative feelings from aversion to self-loathing. <em>Frustration</em> is the problem.</p>
				<p>Please, if you don't understand something about CSS, ask a dev who's familiar with it. Many aspects of web development come and go, but CSS is here to stay. So is JavaScript. You need to know how to use these tools, and most importantly, you need to know when to ask for help. You will improve the web development community for your trouble.</p>
				<p className="editors-note">Thank you to Keith Grant for looking over this post and giving his feedback. Check out what he has to say on this topic, too.</p>
				<SignOff/>
			</article>
		);
	}
}
