import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import { h, render, Component } from "preact";

export default class Routes extends Component{
	constructor(props){
		super(props);
		this.initial = true;
	}

	getContentModule(url, cb, props){
		return System.import(`../routes/${props.slug}/index`).then(module=>{
			document.title = `${module.Metadata.title} - Jeremy Wagner`;
			return module.default;
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
