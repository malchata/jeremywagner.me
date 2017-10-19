import { h, render, Component } from "preact";

export default class Image extends Component{
	constructor(props){
		super(props);
		this.lazyClass = "lazy";
	}

	render(props){
		let imageMarkup;

		if(typeof props.srcset === "string"){
			props.srcset = props.srcset.indexOf("http://") !== -1 ? props.srcset.split("http://").join("https://") : props.srcset;
		}

		if(typeof props.src === "string"){
			props.src = props.src.indexOf("http://") !== -1 ? props.src.split("http://").join("https://") : props.src;
		}

		if(typeof props.placeholder === "string"){
			props.placeholder = props.placeholder.indexOf("http://") !== -1 ? props.placeholder.split("http://").join("https://") : props.placeholder;
		}

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
	src: null,
	srcset: null,
	placeholder: null
};
