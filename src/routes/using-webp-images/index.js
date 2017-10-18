import { h, render, Component } from "preact";
import SubHeading from "../../components/SubHeading";
import Image from "../../components/Image";
import CodeBlock from "../../components/CodeBlock";

export const Metadata = {
	title: "Using WebP Images",
	date: "25 April, 2016",
	updateDate: "26 September, 2016",
	description: "Using WebP images can yield substantially lower file sizes for your images, giving way to quicker page load times. Learn how to use them in this post!"
};

export default class Content extends Component{
	render(){
		return (
			<article>
				<h1>{Metadata.title}</h1>
				<p className="date">{Metadata.date}{Metadata.updateDate !== null ? ` (updated ${Metadata.updateDate})` : null}</p>
				<div className="excerpt">
					<p className="editors-note">This article has been updated to reflect changes in the <code>imagemin</code> API.</p>
					<p>We've all been there before: You're browsing a website that has a ton of huge and beautiful images of delicious food, or maybe that new gadget you've been eyeballing. These images tug at your senses, and for content authors, they're essential in moving people to do things.</p>
					<p>Except that these images are downright huge. Like really huge. On a doddering mobile connection, you can even see these images unfurl before you like a descending window shade. You're suddenly reminded of the bad old days of dial-up connections.</p>
				</div>
				<Image
					src={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-1x.png"}
					srcset={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-1x.png 1x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-2x.png 2x"}
					caption={"I thought we moved past this, already."}
					width={320}
					height={176}
				/>
				<p>This is a problem. You need to make sure that these images aren't causing your audience to become impatient. Impatience begets fidgeting. Once your users are fidgeting, they're thinking about moving on. They will leave. Worse yet, they'll go to someplace else. Someplace that's not your website.</p>
				<p>Images represent a significant part of content on the web, and for good reason. The written word is a powerful form of expression, but nothing evokes those primal feelings like a good visual can. The problem is walking the tightrope between visually rich content and the speedy delivery of it.</p>
				<p>The answer is not a singular one. Many techniques exist for slimming down unruly images, and delivering them according to the capabilities of the devices that request them. Such a topic can easily be its own book, but the focus of this article will be something very specific: Google's WebP image format, and how you can take advantage of it to serve images that have all the visual fidelity your images have now, but at a fraction of the file size. All you need are two things:</p>
				<ol>
					<li>Some images to work with.</li>
					<li>A desire to learn.</li>
				</ol>
				<p>Let's learn about WebP!</p>
				<SubHeading deepLink={"what-is-webp"}>What is WebP, and why should I even care?</SubHeading>
				<p>WebP is an image format developed and first released by Google in 2010. It supports encoding images in both lossless and lossy formats, making it a versatile format for any type of visual content, and an alternative format to both PNG or JPEG. The results are usually comparable.</p>
				<Image
					lazy={true}
					placeholder={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-placeholder.jpg"}
					src={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-1x.jpg"}
					srcset={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-1x.jpg 1x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-2x.jpg 2x"}
					caption={"Can you tell the difference? (Hint: the WebP version is on the right.)"}
					width={385}
					height={108}
				/>
				<p>In the above example, the visual differences are almost imperceptible, yet the differences in file size are substantial. The JPEG version on the left weighs in at 56.7 KB, and the WebP version on the right is nearly one third smaller at 38 KB. Not a bad improvement, especially when you consider that the visual quality between the two are pretty much the same.</p>
				<p>So the next question (of course) is “what's the browser support?” Not as slim as you might think. Since WebP is a Google technology, support for it is fixed to Chromium-based browsers. These browsers make up a significant portion of users worldwide, however, meaning that <a href="http://caniuse.com/#search=webp" rel="noopener">nearly 67% of browsers in use support WebP</a> at the time of this writing. If you had the chance to make your website faster for two thirds of your users, would you pass it up?</p>
				<Image
					lazy={true}
					placeholder={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508295315/jeremywagner.me/using-webp-images/bateman-1-placeholder.jpg"}
					src={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/bateman.gif"}
					caption={"Thought so."}
					width={500}
					height={213}
				/>
				<p>It's important to remember though that WebP is <em>not a replacement</em> for JPEG and PNG images. It's a format you can serve to browsers that can use it, but you should keep your older images on hand for other browsers. This is the nature of developing for the web: Have your Plan A ready for browsers that can handle it, and have your Plan B (and maybe Plan C) ready for those browsers that are less capable.</p>
				<p>Enough with the disclaimers. Let's optimize!</p>
				<SubHeading deepLink={"converting-images-to-webp"}>Converting your images to WebP</SubHeading>
				<p>If you're familiar with Photoshop, the easiest way to get a taste for WebP is to try out the <a href="http://telegraphics.com.au/sw/product/WebPFormat#webpformat" rel="noopener">WebP Photoshop Plugin</a>. After you install it, you'll be able to use the Save As option (not Save For Web!) and select either WebP or WebP Lossless from the format dropdown.</p>
				<p>What's the difference between the two? Think of it as being similar to the differences between JPEG and PNG images. JPEGs are lossy and PNG images are lossless. Use regular old WebP when you want to convert your JPEG images. Use WebP Lossless when you're converting your PNGs.</p>
				<p>When you save images to the WebP Lossless format with the Photoshop plugin, you're given no prompts to tweak settings or anything. It just takes care of everything. When you choose regular old WebP for your lossy images, you'll get something like this:</p>
				<Image
					lazy={true}
					placeholder={"https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-placeholder.jpg"}
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-1x.png"}
					srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-2x.png 2x"}
					caption={"Lots going on here, huh?"}
					width={645}
					height={393}
				/>
				<p>The settings dialogue for lossy WebP gives more flexibility for configuring the output. You can adjust the image quality by using a slider from 0 to 100, set the strength of the filtering profile to get lower file sizes (at the expense of visual quality, of course) and adjust noise filtering and sharpness.</p>
				<p>My big complaint with the WebP Photoshop plugin is two-fold: There isn't a Save for Web interface for it so that I can preview what an image will look like with the settings I've chosen, and I'd have to create a batch process to save out a bunch of images. My second gripe probably isn't a hurdle for you if you like batch processing in Photoshop, but I'm more of a coder, so my preference is to use Node to convert many images at once.</p>
				<SubHeading deepLink={"converting-with-node"}>Converting images to WebP with Node.js</SubHeading>
				<a name="converting-with-node"></a>
				<p><a href="http://nodejs.org/" rel="noopener">Node.js</a> is awesome, as you may or may not be able to agree with, depending on your feelings and experience with it. For jack of all tradesmen such as myself, it's less about the fact that it brings JavaScript to the server and more that it's a productivity tool that I can use while I write code. In this article, we're going to use Node to convert your JPEGs and PNGs to WebP images en masse with the use of a Node package called <code>imagemin</code>.</p>
				<p><code>imagemin</code> is the Swiss Army Knife of image processors in Node, but we'll just focus on using it to convert all of our JPEGs and PNGs to WebPs (whew!) Don't fret, though! Even if you've never used Node before, this article will walk you through everything. If the idea of using Node bugs you, you can use the WebP Photoshop plugin and skip ahead.</p>
				<p>The first thing you'll want to do is <a href="https://nodejs.org/en/download" rel="noopener">download Node.js</a> and install it. This should only take you five minutes. Once installed, open a terminal/command line window and go to your web project's root folder. From there, just use Node Package Manager (<code>npm</code>) to install <code>imagemin</code> and the <code>imagemin-webp</code> plugin:</p>
				<CodeBlock>npm install imagemin imagemin-webp</CodeBlock>
				<p>This install may take up to a minute. When finished, open your text editor and create a new file named <code>webp.js</code> in your web project's root folder. Type the script below into the file:</p>
				<CodeBlock>var imagemin = require(&quot;imagemin&quot;),    // The imagemin module.
  webp = require(&quot;imagemin-webp&quot;),   // imagemin's WebP plugin.
  outputFolder = &quot;./img&quot;,            // Output folder
  PNGImages = &quot;./img/*.png&quot;,         // PNG images
  JPEGImages = &quot;./img/*.jpg&quot;;        // JPEG images

imagemin([PNGImages], outputFolder, {
  plugins: [webp({
    lossless: true // Losslessly encode images
  })]
});

imagemin([JPEGImages], outputFolder, {
  plugins: [webp({
    quality: 65 // Quality setting from 0 to 100
  })]
});</CodeBlock>
			</article>
		);
	}
}
