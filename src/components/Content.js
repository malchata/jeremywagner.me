import { h, render, Component } from "preact";
import H1 from "./H1";

export default class Content extends Component{
	render(){
		return (
			<article>
				<H1 Content="Using WebP Images"/>
			</article>
		);
	}
}
