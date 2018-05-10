import { h, render, Component } from "preact";

export default class ReadMore extends Component{
  constructor(props){
    super(props);
  }

  render(props){
    return (
      <a className="read-more" href={props.link}>Read More <span className="arrow">&raquo;</span></a>
    );
  }
}
