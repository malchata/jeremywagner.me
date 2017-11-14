import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SubHeading from "../../../components/SubHeading";
import Image from "../../../components/Image";
import CodeBlock from "../../../components/CodeBlock";
import SignOff from "../../../components/SignOff";
import ReadMore from "../../../components/ReadMore";

export const Metadata = {
	title: "Cutting Cruft with an SVG Media Query",
	date: "25 May, 2016",
	description: "Sometimes you need to optimize a whole lot of images at once. Learn how to do it offline with bash!",
	slug: "/blog/svg-media-query/"
};

export const BlogExcerpt = <Excerpt>
	<h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
	<p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
	<p>This isn't a huge success story, but I thought it was sufficiently spiffy to warrant a short post about an SVG media query that helped me to cut an unnecessary image from a client's website while still accommodating their design. Who knows? This short post may help you some day.</p>
	<p>Not too long ago, I developed a static site for <a href="http://weeklytimber.com" rel="noopener">Weekly Timber &amp; Pulp</a>, a logging business in Central Wisconsin. The designer on the project whipped up some comps with two breakpoints: One for phones and tablets in portrait view, and another for tablets in landscape view and larger. The designer is a good friend of mine, and loves to throw me a curve ball every now and again. So he gave the site's logo a different treatment for each breakpoint.</p>
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
					lazy={true}
					placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076518/jeremywagner.me/svg-media-query/weekly-timber-placeholder.jpg"}
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076518/jeremywagner.me/svg-media-query/weekly-timber-1x.png"}
					srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076518/jeremywagner.me/svg-media-query/weekly-timber-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076518/jeremywagner.me/svg-media-query/weekly-timber-2x.png 2x"}
					caption={"The site logo appears on mobile in the upper left hand corner in white, and on desktop just above the navigation in green."}
					width={960}
					height={403}
					saveData={props.saveData}
				/>
				<p>As it tends to happen, I overlooked this detail until after the client approved the designs, so I was on the hook. Being borderline obsessive about website optimization, I knew I couldn't slap this together without thinking things over. I had two options. I could use two different images, which brought on slight discomfort.</p>
				<Image
					lazy={true}
					placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076518/jeremywagner.me/svg-media-query/i-am-dead-inside-placeholder.jpg"}
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076253/jeremywagner.me/svg-media-query/i-am-dead-inside.jpg"}
					caption={"I concur."}
					width={500}
					height={281}
					critical={false}
					saveData={props.saveData}
				/>
				<p><em>Or</em> I could do the sensible thing and find a way to get by with a single SVG image. The optimized and compressed version of the SVG is only about 17.3 KB, but duplicating an image is something you'd like to prevent if you can, right? What if you're still on an HTTP/1 server where requests aren't as cheap as they are on HTTP/2? What if your target audience is on a slower connection? It behooves us all to walk with care in situations such as these.</p>
				<p>Thankfully, it dawned on me to use CSS in this SVG image. Because CSS is valid in SVG, that also means you can use media queries!</p>
				<SubHeading>Wait, media queries in SVG?</SubHeading>
				<p>SVG is XML, and while HTML isn't strictly XML, XML-derived schemas and HTML are all part of that soup. Hell, you can even inline SVG right into your HTML <a href="http://caniuse.com/#feat=svg-html5" rel="noopener">in most browsers</a>.</p>
				<p>Like HTML, SVG supports CSS. So unsurprisingly, media query support is a part of SVG. I learned this bit of trivia when I attended a conference some years ago. Of course, this nugget of information was filed away in the back of my brain, forgotten until such a scenario came where I could put it to use.</p>
				<p>Thankfully, the only difference between the two logo treatments are that the colors are inverted. I opened the SVG in my text editor (and ran it through a pretty printer to restore the formatting lost to minification) and observed the following code near the top:</p>
				<CodeBlock>{`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 824.7 318.9">
<style type="text/css">
  .st0\{
    fill: #fff;
  \}

  .st1\{
    fill: #197f21;
  \}
</style>`}</CodeBlock>
				<p>The relevant piece of code here is within the <code>{`<style>`}</code> tags. We have objects in the SVG that use one of two classes: Some that use the <code>{`.st0`}</code>, and some that use <code>{`.st1`}</code>. Those using <code>{`.st0`}</code> are given a fill color of white (<code>{`#fff`}</code>), and those using <code>{`.st1`}</code> are given a <code>{`fill`}</code> color of a sort of pine green (<code>{`#197f21`}</code>). This treatment looks like so:</p>
				<Image
					lazy={true}
					placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076518/jeremywagner.me/svg-media-query/weekly-logo-placeholder.jpg"}
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076253/jeremywagner.me/svg-media-query/weekly-logo-1x.png"}
					caption={"The mobile logo treatment."}
					width={363}
					height={153}
					saveData={props.saveData}
				/>
				<p>So what we're grappling with here is a logo that's mostly white, but the tree on the right has a green stroke behind it to prevent it from bleeding into the rest of the logo. This is all well and good until you realize that this same logo has to exist on a white background when it hits the larger breakpoint. White on white just isn't going to work, so we need to use a media query to help us out.</p>
				<SubHeading>How media queries work in SVG</SubHeading>
				<p>How media queries work in HTML documents is an easy concept to grasp: The browser window is a certain amount of pixels in width, and we specify some styles that take at and above (or below) a certain screen width.</p>
				<p>CSS media queries in SVG work in the same way, but the threshold is determined differently than within an HTML document. When you specify a <code>{`min-width`}</code> or <code>{`max-width`}</code> media query for an SVG, it doesn't query the width of the browser, but rather the width of the element that contains the SVG. If you have an SVG referenced by an <code>{`<img>`}</code> tag and you want new styles to kick in when that <code>{`<img>`}</code> element is <code>{`300px`}</code> or wider, you'd use this media query:</p>
				<CodeBlock>{`@media screen and (min-width: 300px)\{
  /* Your fancy new styles go here. */
\}`}</CodeBlock>
				<p>The Weekly Timber logo grows to a maximum size of a little over <code>{`100px`}</code> on the small breakpoint. Then it jumps to a fixed width of <code>{`340px`}</code> on the large breakpoint. With this information, we can pick a reasonable middle point between the two, something like <code>{`300px`}</code>. At this defined threshold, we then flip the fill colors with this code:</p>
				<CodeBlock>{`<style type="text/css">
  .st0\{
    fill: #fff;
  \}

  .st1\{
    fill: #197f21;
  \}

  @media screen and (min-width: 300px)\{
    .st0\{
      fill: #197f21;
    \}

    .st1\{
      fill: #fff;
    \}
  \}
</style>`}</CodeBlock>
				<p>The new media query works in a mobile first fashion, since the site itself uses a mobile-first responsive design approach. For mobile devices, we have the white logo treatment. Then, when the logo width hits a width of <code>{`300px`}</code>, we invert the color scheme for desktop devices.</p>
				<p>To see the logo in action, head over to <a href="http://weeklytimber.com" rel="noopener">http://weeklytimber.com</a> and resize the browser window. The logo treatment is the same image source (<code>{`logo.svg`}</code>) but the media query allows us to invert the fill colors, thus eliminating the need for a second image file. If you pull the logo up directly at <a href="http://weeklytimber.com/img/logo.svg" rel="noopener">http://weeklytimber.com/img/logo.svg</a>, you can resize the browser window to see the color scheme flip at the <code>{`300px`}</code> threshold.</p>
				<Image
					lazy={true}
					placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076518/jeremywagner.me/svg-media-query/new-treatment-placeholder.jpg"}
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076253/jeremywagner.me/svg-media-query/new-treatment-1x.png"}
					srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076253/jeremywagner.me/svg-media-query/new-treatment-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509076253/jeremywagner.me/svg-media-query/new-treatment-2x.png 2x"}
					caption={"Our single SVG image accommodating both logo treatments."}
					width={937}
					height={260}
					saveData={props.saveData}
				/>
				<p>That's it! Of course, this use case is very simple, and there's more capability in using media queries in your SVGs than just inverting fill colors. Experiment with CSS properties you know. See what works, see what doesn't, and <em>always</em> test across browsers.</p>
				<p>For a deeper dive on CSS in your SVGs, check out this <a href="http://www.smashingmagazine.com/2014/11/styling-and-animating-svgs-with-css/" rel="noopener">great article by Sara Soueidan</a> on Smashing Magazine about styling and animating SVGs. There's a lot more under the hood than the example shown in this post.</p>
				<SignOff/>
			</article>
		);
	}
}
