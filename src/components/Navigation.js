import { h, render, Component } from "preact";

export default class Navigation extends Component{
	render(){
		return(
			<nav>
				<ul id="nav">
					<li className="nav-item"><a className="nav-link" href="/about">About me</a></li>
					<li className="nav-item"><a className="nav-link" href="/writing">Stuff I wrote</a></li>
					<li className="nav-item"><a className="nav-link" href="/lets-work-together">Let's work together</a></li>
					<li className="nav-item"><a className="nav-link" href="https://manning.com/books/web-performance-in-action?a_aid=webopt&a_bid=63c31090" rel="noopener">Read my book!</a></li>
				</ul>
				<ul id="social-nav">
					<li className="social twitter"><a href="https://twitter.com/malchata" rel="noopener"></a></li>
					<li className="social github"><a href="https://github.com/malchata" rel="noopener"></a></li>
					<li className="social email"><a href="mailto:jeremy.wagner@gmail.com" rel="noopener"></a></li>
					<li className="social rss"><a href="/rss.xml" rel="noopener"></a></li>
				</ul>
			</nav>
		);
	}
}
