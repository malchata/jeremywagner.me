import { h, render, Component } from "preact";

export default class Content extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<h1>{props.Content}</h1>
		);
	}
}
