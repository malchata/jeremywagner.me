import { h, render, Component } from "preact";
import Image from "../../components/Image";

export const Metadata = {
	title: "Using WebP Images"
};

export default class UsingWebPImages extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<article>
				<h1>{Metadata.title}</h1>
				<p><em>This article has been updated to reflect changes in the <code>imagemin</code> API.</em></p>
				<p>We've all been there before: You're browsing a website that has a ton of huge and beautiful images of delicious food, or maybe that new gadget you've been eyeballing. These images tug at your senses, and for content authors, they're essential in moving people to do things.</p>
				<p>Except that these images are downright huge. Like really huge. On a doddering mobile connection, you can even see these images unfurl before you like a descending window shade. You're suddenly reminded of the bad old days of dial-up connections.</p>
			</article>
		);
	}
}
