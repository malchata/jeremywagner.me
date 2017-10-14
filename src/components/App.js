import { h, render, Component } from "preact";
import Header from "./Header";
import Navigation from "./Navigation";
import Routes from "./Routes";

export default class App extends Component{
	render(){
		return(
			<div>
				<a href="/blog/using-webp-images">Test me</a>
				<Header/>
				<Navigation/>
				<Routes/>
			</div>
		);
	}
}
