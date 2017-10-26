import { h, render, Component } from "preact";

export default class Navigation extends Component{
	render(){
		return(
			<nav>
				<div className="nav-sentinel"></div>
				<div className="nav-container">
					<ul id="nav">
						<li className="nav-item"><a className="nav-link" href="/about">About me</a></li>
						<li className="nav-item"><a className="nav-link" href="/writing">Stuff I wrote</a></li>
						<li className="nav-item"><a className="nav-link" href="/lets-work-together">Let's work together</a></li>
						<li className="nav-item"><a className="nav-link" href="https://manning.com/books/web-performance-in-action?a_aid=webopt&a_bid=63c31090" rel="noopener">Read my book!</a></li>
					</ul>
					<ul id="social-nav">
						<li className="social-item twitter"><a className="social" href="https://twitter.com/malchata" rel="noopener"></a></li>
						<li className="social-item github"><a className="social" href="https://github.com/malchata" rel="noopener"></a></li>
						<li className="social-item email"><a className="social" href="mailto:jeremy.wagner@gmail.com" rel="noopener"></a></li>
						<li className="social-item rss"><a className="social" href="/rss.xml" rel="noopener"></a></li>
					</ul>
				</div>
			</nav>
		);
	}
}
