import { h, render } from "preact";
import App from "./components/App";
import Styles from "./css/styles.css";

const mainElement = document.getElementsByTagName("main")[0];

render(<App/>, mainElement, mainElement.lastChild);
