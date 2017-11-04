import { h, render, Component } from "preact";
import ContentExcerpts from "../components/ContentExcerpts";

export const Metadata = {
	title: "Home",
	description: "The web development blog of developer, author and speaker Jeremy Wagner.",
	date: "4 November, 2016"
};

export default class Content extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (<ContentExcerpts/>);
	}
}
