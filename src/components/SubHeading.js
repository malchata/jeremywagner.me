import { h, render, Component } from "preact";

export default class SubHeading extends Component{
  constructor(props) {
    super(props);
  }

  createDeepLink(fragment) {
    return fragment.replace(/\s/ig, "-").replace(/(\'|\"|\,|\;|\:|\!|\?)/ig, "").toLowerCase();
  }

  render(props) {
    let deepLink = this.createDeepLink(props.children[0]);

    return (
      <h2 id={deepLink}>
        <a name={deepLink}></a>
        <a class="subhead" href={`#${deepLink}`}>{props.children}</a>
      </h2>
    );
  }
}
