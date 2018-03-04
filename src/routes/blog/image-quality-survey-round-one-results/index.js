import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SubHeading from "../../../components/SubHeading";
import Image from "../../../components/Image";
import CodeBlock from "../../../components/CodeBlock";
import SignOff from "../../../components/SignOff";
import ReadMore from "../../../components/ReadMore";

export const Metadata = {
	title: "Image Quality Survey: Round One Results",
	date: "28 February, 2018",
	description: "I ran a survey on how people perceive images. This is a loose analysis of the results from the first round.",
	slug: "/blog/image-quality-survey-round-one-results/"
};

export const BlogExcerpt = <Excerpt>
	<h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
	<p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
	<p>Some time ago, I decided I wanted to take a shot at assessing how people perceive lossy image quality, so I ran <a href="https://imagesurvey.site" rel="noopener">a survey</a> asking people to tell me what they thought of a set of images shown to them. <a href="https://medium.com/research-things/on-surveys-5a73dda5e9a0" rel="noopener">Though the survey as a tool tends to be fraught with pitfalls</a>, it was really the only practical tool for gathering this information from a large group of people. In this post, I'll share some of my findings!</p>
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
				<SubHeading>A little background</SubHeading>
				<p>Before I get too far into any of this, I want to offer a little disclaimer: I am <strong>not</strong> a research scientist. I think I did an OK job of putting this project together (despite some technical flaws), but it ultimately relies two fundamental assumptions:</p>
				<ol type="1">
					<li>The person taking the survey understands what's being asked of them.</li>
					<li>They're answering truthfully.</li>
				</ol>
				<p>Make of these assumptions what you will. For many years, I've been working in a field where designers and developers have been offering subjective opinions on image quality. I assume you're a developer (or developer-adjacent professional) who has had a project stakeholder approach you at least once in your career to offer an opinion on the quality of an image. Something like &quot;this JPEG looks like it's been rubbed in bacon grease&quot; or some such sentiment.</p>
				<p>After years of hearing people's opinions on image quality, I started wondering about how image quality is subjectively perceived. Particularly lossy image quality like you see with JPEGs. At its core, lossy image quality is about achieving smaller file sizes through cheating the eye out of some measure of fidelity in hopes that such degradation goes beyond notice. When it comes to performant user experiences, sacrificing some level of quality can be a good thing. So, I conducted this experiment because (perhaps in vain) I wanted to see if research would give me a rule of thumb for just how much I could stretch a JPEG before someone would cry foul.</p>
				<p>So in that spirit, it bears repeating that <em>I am not a research scientist</em>. I'm no expert, but I understand <em>some</em> stuff about web development, the perception of imagery, and performance. That last bit is what interests me the most. I really wanted to see how performance figured into the perception of image quality. So as you read through these results, add salt to taste.</p>
				<SubHeading>How the survey works</SubHeading>
				<p>Before I get into the results proper, let's talk about how the survey was put together. The way I put this thing together went something like this:</p>
				<ol type="1">
					<li>I sourced 25 uncompressed and minimally processed photos in 4:3 ratio from <a href="http://www.wolftownmedia.com/" rel="noopener">a local photographer</a>. Mostly photos of animals and people, as well as some outdoorsy stuff in all seasons. A reasonable spread of what you might consider typical photography you might see on the web.</li>
					<li>To account for the variation of screen sizes and resolutions, I created four versions of each image at widths of 1,560, 1,280, 1,024, and 768 pixels wide to be used in an <code>{`srcset`}</code> within an <code>{`<img>`}</code> tag.</li>
					<li>Each uncompressed image was converted to baseline JPEG format with mozjpeg at each quality setting from 5 to 100. I also generated a pool of lossy WebP images in the same quality range.</li>
					<li>Before participants begin telling me what they think of images they see, they get to read some short explanation copy on how the survey works. I'm assuming they read it. The idea is to make sure they know to express their opinion about a given image's <em>quality</em>, not its <em>content</em>.</li>
					<li>Participants begin taking the survey. They can rate up to 25 images, or leave anytime prior. Images of a random quality setting are chosen. If a user happens by using a browser that supports WebP, it's up to chance whether they get a WebP or JPEG sample. Otherwise, everyone else gets JPEGs. When participants rate an image, they use a slider input that's numerically aligned to the lossy quality range of the images in the pool.</li>
					<li>As participants submit their ratings, various data points are collected and stored in a database with them: Screen size, which image in the <code>{`srcset`}</code> is displayed, performance and resource timings, all kinds of stuff.</li>
				</ol>
				<p>If you want to know any more about how it works, <a href="https://imagesurvey.site" rel="noopener">check out the survey for yourself</a>. It's currently in round two (which I'll talk about later). But for now, let's dig into the makeup of participants, and the results.</p>
				<SubHeading>Results</SubHeading>
				<p>Before I go any further, let's look at some high level statistics really quick:</p>
				<ul>
					<li>Roughly <strong>2,500</strong> people participated.</li>
					<li>Approximately <strong>25%</strong> of those participants were on mobile devices. Not surprising, since most of those participants came in from <a href="https://alistapart.com" rel="noopener">A List Apart</a> and similar outlets.</li>
					<li>Most participants were developers or designers.</li>
					<li>Roughly <strong>59,000</strong> ratings were given.</li>
				</ul>
				<p>One of the first things I wanted to observe was how people's ratings of images aligned with actual image quality. Since images were exported to a quality range of 5 to 100 <em>and</em> the slider input used to rate images used the same range, actual image quality and participant assessments were on the same scale. Here's how that looked:</p>
				<Image
					lazy={true}
					placeholder={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/actual-vs-perceived-placeholder_ibgpfi.jpg"}
					src={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/actual-vs-perceived-1x_toedb0.png"}
					srcset={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/actual-vs-perceived-1x_toedb0.png 1x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/actual-vs-perceived-2x_jv83nq.png 2x"}
					caption={"Actual vs. perceived image quality, both JPEG and WebP"}
					width={552}
					height={353}
					saveData={props.saveData}
				/>
				<p>At the lower end of the quality spectrum, participants on average tended to perceive images as being of higher quality than they really were. In the case of WebP, this perception seems way higher than it ought to be (though for what reason, I can't say). In any case, quality perceptions of WebP and JPEG both reach a similar converging point (around 75) where perception is on par with actual quality. As quality creeps higher, however, people are assesing image quality  <em>lower</em> on average than actual quality.</p>
				<p>Now, let's have a look at how perceived quality fares against actual quality over download time of JPEG image samples:</p>
				<Image
					lazy={true}
					placeholder={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/jpeg-actual-vs-perceived-download-time-placeholder_xar6ib.jpg"}
					src={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/jpeg-actual-vs-perceived-download-time-1x_gezb7e.png"}
					srcset={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/jpeg-actual-vs-perceived-download-time-1x_gezb7e.png 1x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/jpeg-actual-vs-perceived-download-time-2x_ciibja.png 2x"}
					caption={"Actual vs. perceived image quality over download time (JPEG)"}
					width={878}
					height={442}
					saveData={props.saveData}
				/>
				<p>This is interesting. Even though I had to use a trend line to see, well, trends, it seems that as JPEGs take less time to download, the average participant's perception of that image is higher than its actual quality. As time goes on, this is less and less the case. When participants hit super long image download times, we start to see perceived quality dipping beneath actual quality. Now let's see how this looks for WebP images:</p>
				<Image
					lazy={true}
					placeholder={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/webp-actual-vs-perceived-download-time-placeholder_bfiznq.jpg"}
					src={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/webp-actual-vs-perceived-download-time-1x_m1y1wf.png"}
					srcset={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/webp-actual-vs-perceived-download-time-1x_m1y1wf.png 1x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1519798696/webp-actual-vs-perceived-download-time-2x_jdv96d.png 2x"}
					caption={"Actual vs. perceived image quality over download time (WebP)"}
					width={878}
					height={442}
					saveData={props.saveData}
				/>
				<p>This is somewhat less clear. It seems that users perceived WebP images at a higher quality than they were encoded at, no matter how long they took to download (unless they took a <em>very</em> long time to download). I'm not tempted to put much faith in the WebP result,s because only 25% of all ratings were for WebP images. There just wasn't as much data for WebP as there was for JPEG in the end.</p>
				<p>Plus, the first round of the survey suffered from a technical flaw that made results more inconclusive on this front. As stated previously, the survey was <em>supposed</em> to choose images randomly between a quality range of 5 to 100. As it did so, however, it wasn't really as random as I would have liked. More accurately, perhaps what I wanted wasn't so much <em>randomness</em>, but an <em>even distribution</em> along the quality spectrum. In fact, most images served to participants were at the lower end of the quality range.</p>
				<p>When you examine the faded lines (which represent the actual data, as opposed to the trends), you can see that there is less of a pattern as quality increases. This is because there's less data gathered at the higher end of the quality range, so trends aren't as clear there as they are at the lower end. To address this in round 2, I &quot;prerolled&quot; and shuffled a sequence of quality values to ensure a more even distribution of what participants are rating.</p>
				<p>That said, I think the results still show a glimmer of something interesting, and I don't think the effort was a complete waste. But make no mistake: Further research is necessary to say anything definitively, if anything definitively could ever be said. Part of research is improving and tweaking data gathering methods, and conducting new rounds to get better data.</p>
				<p><strong>The bottom line:</strong> The data had just enough uncertainty due to the distribution of ratings that a second round is necessary before I can make any concrete observations. If you'd like to participate in the second round, <a href="https://imagesurvey.site" rel="noopener">please do</a>. I'd love to have your input. Until we finish up the second round, however, I'm going to have to say that one round just wasn't enough.</p>
				<SignOff/>
			</article>
		);
	}
}
