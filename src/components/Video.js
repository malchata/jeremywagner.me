import { h, render, Component } from "preact";

export default class Video extends Component{
	constructor(props){
		super(props);
		this.lazyClass = "lazy";
	}

	getSource(source, props){
		let sourceMarkup, type;

		if(source.indexOf(".webm") !== -1){
			type = "video/webm";
		}
		else if(source.indexOf(".ogv") !== -1){
			type = "video/ogg";
		}
		else if(source.indexOf(".mp4") !== -1){
			type = "video/mp4";
		}

		return <source type={type} src={source.replace("http://", "https://")}/>;
	}

	render(props){
		let videoMarkup;

		if(props.lazy){
			videoMarkup = <figure>
				<video class={this.lazyClass} poster={props.placeholder.replace("http://", "https://")} width={props.width} height={props.height} preload="none" loop muted>
					{props.sources.map((source)=>this.getSource(source, props))}
				</video>
				<figcaption>{props.caption}</figcaption>
			</figure>;
		}
		else{
			videoMarkup = <figure>
				<video width={props.width} height={props.height} autoplay loop muted>
					{props.sources.map((source)=>this.getSource(source, props))}
				</video>
				<figcaption>{props.caption}</figcaption>
			</figure>;
		}

		return videoMarkup;
	}
}

Video.defaultProps = {
	lazy: false
};
