import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import { h, render, Component } from "preact";

export default class Routes extends Component{
	constructor(props){
		super(props);
	}

	getContentModule(url, cb, props){
		return new Promise(resolve=>{
			System.import(manifest[`/${props.slug}.js`]).then(module => module.default);
		});
	}

	render(){
		return (
			<Router>
				<AsyncRoute path="/blog/:slug" getComponent={this.getContentModule}/>
			</Router>
		);
	}
}
