import { h, render, Component } from "preact";

export default class Header extends Component{
	render(){
		return (
			<header>
				<h1 className="name">Jeremy Wagner's</h1>
				<h2 className="site">Web Dev Blog</h2>
			</header>
		);
	}
}
