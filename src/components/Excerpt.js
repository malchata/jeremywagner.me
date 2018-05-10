import { h, render, Component } from "preact";

export default class Excerpt extends Component{
  constructor(props){
    super(props);
  }

  render(props){
    return (
      <div className="excerpt">
        {props.children}
      </div>
    );
  }
}
