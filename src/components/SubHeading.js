import { h, render, Component } from "preact";

export default class SubHeading extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<h2 id={props.deepLink}>
				<a name={props.deepLink}></a>
				<a class="subhead" href={`#${props.deepLink}`}>{props.children}</a>
			</h2>
		);
	}
}
