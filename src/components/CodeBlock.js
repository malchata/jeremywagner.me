import { h, render, Component } from "preact";

export default class CodeBlock extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<div className="code-container"><pre><code>
{props.children}
</code></pre></div>
		);
	}
}
