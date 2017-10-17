import { h, render, Component } from "preact";
import Image from "../../components/Image";

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
					<p><em>This article has been updated to reflect changes in the <code>imagemin</code> API.</em></p>
					<p>We've all been there before: You're browsing a website that has a ton of huge and beautiful images of delicious food, or maybe that new gadget you've been eyeballing. These images tug at your senses, and for content authors, they're essential in moving people to do things.</p>
					<p>Except that these images are downright huge. Like really huge. On a doddering mobile connection, you can even see these images unfurl before you like a descending window shade. You're suddenly reminded of the bad old days of dial-up connections.</p>
				</div>
				<Image
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-1x.png"}
					srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-2x.png 2x"}
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
			</article>
		);
	}
}
