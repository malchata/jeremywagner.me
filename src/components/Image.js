import { h, render, Component } from "preact";

export default class Image extends Component{
	constructor(props){
		super(props);
		this.lazyClass = "lazy";
	}

	render(props){
		let imageMarkup;

		if(props.lazy === true){
			imageMarkup = <figure>
				<img className={this.lazyClass} src={props.placeholder} data-src={props.src} data-srcset={props.srcset} alt={props.caption} title={props.caption} width={props.width} height={props.height}/>
				<noscript>
					<img src={props.src} srcset={props.srcset} alt={props.caption} title={props.caption} width={props.width} height={props.height}/>
				</noscript>
				<figcaption>{props.caption}</figcaption>
			</figure>;
		}
		else{
			imageMarkup = <figure>
				<img src={props.src} srcset={props.srcset} alt={props.caption} title={props.caption} width={props.width} height={props.height}/>
				<figcaption>{props.caption}</figcaption>
			</figure>;
		}

		return (imageMarkup);
	}
}

Image.defaultProps = {
	lazy: false,
	srcset: null
};
