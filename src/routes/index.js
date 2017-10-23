import { h, render, Component } from "preact";
import SubHeading from "../components/SubHeading";
import Image from "../components/Image";
import CodeBlock from "../components/CodeBlock";

export const Metadata = {
	title: "Home",
	description: "The web development blog of developer, author and speaker Jeremy Wagner."
};

export default class Content extends Component{
	render(){
		return (
			<p>what up doge</p>
		);
	}
}
