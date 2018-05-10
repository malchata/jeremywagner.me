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

    return props.lazy === true ? <source type={type} data-src={source.replace("http://", "https://")}/> : <source type={type} src={source.replace("http://", "https://")}/>;
  }

  render(props){
    if(props.critical === false && props.saveData === true){
      return null;
    }

    let videoMarkup;

    if(props.lazy){
      if(typeof props.placeholder === "string"){
        props.placeholder = props.placeholder.indexOf("http://") !== -1 ? props.placeholder.split("http://").join("https://") : props.placeholder;
        props.placeholder = props.saveData === true ? props.split("/f_auto,q_auto/").join("/f_auto,q_auto:eco/") : props.placeholder;
      }

      videoMarkup = <figure>
        <video class={this.lazyClass} poster={props.placeholder} width={props.width} height={props.height} playsinline autoplay loop muted>
          {props.sources.map((source)=>this.getSource(source, props))}
        </video>
        <figcaption>{props.caption}</figcaption>
      </figure>;
    }
    else{
      videoMarkup = <figure>
        <video width={props.width} height={props.height} playsinline autoplay loop muted>
          {props.sources.map((source)=>this.getSource(source, props))}
        </video>
        <figcaption>{props.caption}</figcaption>
      </figure>;
    }

    return videoMarkup;
  }
}

Video.defaultProps = {
  lazy: false,
  placeholder: null,
  saveData: false,
  critical: true
};
