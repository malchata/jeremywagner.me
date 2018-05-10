import { h, render, Component } from "preact";
import ContentMap from "../components/ContentMap";

export const Metadata = {
  title: "Home",
  description: "The web development blog of developer, author and speaker Jeremy Wagner.",
  date: "4 November, 2016",
  slug: "/",
  sitemapPriority: 0.875
}

export default class Content extends Component{
  constructor(props){
    super(props);
  }

  render(props){
    let contentExcerpts = [];

    for(var entry in ContentMap["/blog"]){
      contentExcerpts.push(ContentMap["/blog"][entry].excerpt);
    }

    return (
      <article className="excerpts">
        {contentExcerpts}
      </article>
    );
  }
}
