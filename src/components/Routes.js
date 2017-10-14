import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import { h, render, Component } from "preact";

export default class Routes extends Component{
	constructor(props){
		super(props);
	}

	getContent(contentModule){
		return new Promise(resolve=>{
			System.import(contentModule).then(module => module.default);
		});
	}

	render(){
		return (
			<Router>
				<AsyncRoute path="/blog/using-webp-images" getComponent={this.getContent("../routes/using-webp-images/index")}/>
			</Router>
		);
	}
}
