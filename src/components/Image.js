import { h, render, Component } from "preact";

export default class Image extends Component{
	constructor(props){
		super(props);
		this.lazyClass = "lazy";
	}

	render(){
		if(props.lazy === true){
			let imageMarkup = <figure>
				<img className={this.lazyClass} src={props.placeholder} data-src={props.src} data-srcset={props.srcset} alt={props.caption} title={props.caption}/>
				<noscript>
					<img src={props.src} srcset={props.srcset} alt={props.caption} title={props.caption} width={props.width} height={props.height}/>
				</noscript>
				<figcaption>{props.caption}</figcaption>
			</figure>;
		}
		else{
			let imageMarkup = <figure>
				<img src={props.src} srcset={props.srcset} alt={props.caption} title={props.caption} width={props.width} height={props.height}/>
				<figcaption>{props.caption}</figcaption>
			</figure>;
		}

		return (
			{imageMarkup}
		);
	}
}
