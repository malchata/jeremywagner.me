import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SubHeading from "../../../components/SubHeading";
import Image from "../../../components/Image";
import Video from "../../../components/Video";
import CodeBlock from "../../../components/CodeBlock";
import SignOff from "../../../components/SignOff";
import ReadMore from "../../../components/ReadMore";

export const Metadata = {
  title: "Using WebP Images",
  date: "25 April, 2016",
  updateDate: "26 September, 2016",
  description: "Using WebP images can yield substantially lower file sizes for your images, giving way to quicker page load times. Learn how to use them in this post!",
  slug: "/blog/using-webp-images/",
  canonical: "https://css-tricks.com/using-webp-images/"
};

export const BlogExcerpt = <Excerpt>
  <h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
  <p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
  <p className="editors-note">This article has been updated to reflect changes in the <code>{`imagemin`}</code> API.</p>
  <p>We've all been there before: You're browsing a website that has a ton of huge and beautiful images of delicious food, or maybe that new gadget you've been eyeballing. These images tug at your senses, and for content authors, they're essential in moving people to do things.</p>
  <p>Except that these images are downright huge. Like really huge. On a doddering mobile connection, you can even see these images unfurl before you like a descending window shade. You're suddenly reminded of the bad old days of dial-up connections.</p>
  <ReadMore link={Metadata.slug}/>
</Excerpt>;

export default class Content extends Component{
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <article>
        {BlogExcerpt}
        <Image
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-2x.png 2x"}
          caption={"I thought we moved past this, already."}
          width={320}
          height={176}
          critical={false}
          saveData={props.saveData}
        />
        <p>This is a problem. You need to make sure that these images aren't causing your audience to become impatient. Impatience begets fidgeting. Once your users are fidgeting, they're thinking about moving on. They will leave. Worse yet, they'll go to someplace else. Someplace that's not your website.</p>
        <p>Images represent a significant part of content on the web, and for good reason. The written word is a powerful form of expression, but nothing evokes those primal feelings like a good visual can. The problem is walking the tightrope between visually rich content and the speedy delivery of it.</p>
        <p>The answer is not a singular one. Many techniques exist for slimming down unruly images, and delivering them according to the capabilities of the devices that request them. Such a topic can easily be its own book, but the focus of this article will be something very specific: Google's WebP image format, and how you can take advantage of it to serve images that have all the visual fidelity your images have now, but at a fraction of the file size. All you need are two things:</p>
        <ol>
          <li>Some images to work with.</li>
          <li>A desire to learn.</li>
        </ol>
        <p>Let's learn about WebP!</p>
        <SubHeading>What is WebP, and why should I even care?</SubHeading>
        <p>WebP is an image format developed and first released by Google in 2010. It supports encoding images in both lossless and lossy formats, making it a versatile format for any type of visual content, and an alternative format to both PNG or JPEG. The results are usually comparable.</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-1x.jpg"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-1x.jpg 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508291830/jeremywagner.me/using-webp-images/tacos-2x.jpg 2x"}
          caption={"Can you tell the difference? (Hint: the WebP version is on the right.)"}
          width={385}
          height={108}
          saveData={props.saveData}
        />
        <p>In the above example, the visual differences are almost imperceptible, yet the differences in file size are substantial. The JPEG version on the left weighs in at 56.7 KB, and the WebP version on the right is nearly one third smaller at 38 KB. Not a bad improvement, especially when you consider that the visual quality between the two are pretty much the same.</p>
        <p>So the next question (of course) is "what's the browser support?" Not as slim as you might think. Since WebP is a Google technology, support for it is fixed to Chromium-based browsers. These browsers make up a significant portion of users worldwide, however, meaning that <a href="http://caniuse.com/#search=webp" rel="noopener">nearly 67% of browsers in use support WebP</a> at the time of this writing. If you had the chance to make your website faster for two thirds of your users, would you pass it up?</p>
        <Video
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508295315/jeremywagner.me/using-webp-images/bateman-1-placeholder.jpg"}
          sources={["http://res.cloudinary.com/drp9iwjqz/video/upload/v1509066934/bateman_xrk1jh.webm", "http://res.cloudinary.com/drp9iwjqz/video/upload/v1509066934/bateman_xrk1jh.ogv", "http://res.cloudinary.com/drp9iwjqz/video/upload/v1509066934/bateman_xrk1jh.mp4"]}
          caption={"Thought so."}
          width={500}
          height={213}
          critical={false}
          saveData={props.saveData}
        />
        <p>It's important to remember though that WebP is <em>not a replacement</em> for JPEG and PNG images. It's a format you can serve to browsers that can use it, but you should keep your older images on hand for other browsers. This is the nature of developing for the web: Have your Plan A ready for browsers that can handle it, and have your Plan B (and maybe Plan C) ready for those browsers that are less capable.</p>
        <p>Enough with the disclaimers. Let's optimize!</p>
        <SubHeading>Converting your images to WebP</SubHeading>
        <p>If you're familiar with Photoshop, the easiest way to get a taste for WebP is to try out the <a href="http://telegraphics.com.au/sw/product/WebPFormat#webpformat" rel="noopener">WebP Photoshop Plugin</a>. After you install it, you'll be able to use the Save As option (not Save For Web!) and select either WebP or WebP Lossless from the format dropdown.</p>
        <p>What's the difference between the two? Think of it as being similar to the differences between JPEG and PNG images. JPEGs are lossy and PNG images are lossless. Use regular old WebP when you want to convert your JPEG images. Use WebP Lossless when you're converting your PNGs.</p>
        <p>When you save images to the WebP Lossless format with the Photoshop plugin, you're given no prompts to tweak settings or anything. It just takes care of everything. When you choose regular old WebP for your lossy images, you'll get something like this:</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508296692/jeremywagner.me/using-webp-images/webp-plugin-2x.png 2x"}
          caption={"Lots going on here, huh?"}
          width={645}
          height={393}
          saveData={props.saveData}
        />
        <p>The settings dialogue for lossy WebP gives more flexibility for configuring the output. You can adjust the image quality by using a slider from 0 to 100, set the strength of the filtering profile to get lower file sizes (at the expense of visual quality, of course) and adjust noise filtering and sharpness.</p>
        <p>My big complaint with the WebP Photoshop plugin is two-fold: There isn't a Save for Web interface for it so that I can preview what an image will look like with the settings I've chosen, and I'd have to create a batch process to save out a bunch of images. My second gripe probably isn't a hurdle for you if you like batch processing in Photoshop, but I'm more of a coder, so my preference is to use Node to convert many images at once.</p>
        <SubHeading>Converting images to WebP with Node.js</SubHeading>
        <p><a href="http://nodejs.org/" rel="noopener">Node.js</a> is awesome, as you may or may not be able to agree with, depending on your feelings and experience with it. For jack of all tradesmen such as myself, it's less about the fact that it brings JavaScript to the server and more that it's a productivity tool that I can use while I write code. In this article, we're going to use Node to convert your JPEGs and PNGs to WebP images en masse with the use of a Node package called <code>{`imagemin`}</code>.</p>
        <p><code>{`imagemin`}</code> is the Swiss Army Knife of image processors in Node, but we'll just focus on using it to convert all of our JPEGs and PNGs to WebPs (whew!) Don't fret, though! Even if you've never used Node before, this article will walk you through everything. If the idea of using Node bugs you, you can use the WebP Photoshop plugin and skip ahead.</p>
        <p>The first thing you'll want to do is <a href="http://nodejs.org/en/download" rel="noopener">download Node.js</a> and install it. This should only take you five minutes. Once installed, open a terminal/command line window and go to your web project's root folder. From there, just use Node Package Manager (<code>{`npm`}</code>) to install <code>{`imagemin`}</code> and the <code>{`imagemin-webp`}</code> plugin:</p>
        <CodeBlock>{`npm install imagemin imagemin-webp`}</CodeBlock>
        <p>This install may take up to a minute. When finished, open your text editor and create a new file named <code>{`webp.js`}</code> in your web project's root folder. Type the script below into the file:</p>
        <CodeBlock>{`var imagemin = require("imagemin");    // The imagemin module
var webp = require("imagemin-webp");   // imagemin's WebP plugin
var outputFolder = "./img";            // Output folder
var PNGImages = "./img/*.png";         // PNG images
var JPEGImages = "./img/*.jpg";        // JPEG images

imagemin([PNGImages], outputFolder, {
  plugins: [webp({
    lossless: true // Losslessly encode images
  })]
});

imagemin([JPEGImages], outputFolder, {
  plugins: [webp({
    quality: 65 // Quality setting from 0 to 100
  })]
});`}</CodeBlock>
        <p>This script will process all JPEG and PNG images in the img folder and convert them to WebP. When converting PNG images, we set the <code>{`lossless`}</code> option to <code>{`true`}</code>. When converting JPEG images, we set the quality option to 65. Feel free to experiment with these settings to get different results. You can experiment with even more settings at the <a href="http://www.npmjs.com/package/imagemin-webp" rel="noopener"><code>{`imagemin-webp`}</code> plugin page</a>.</p>
        <p>This script assumes that all of your JPEG and PNG images are in a folder named img. If this isn't the case, you can change the values of the <code>{`PNGImages`}</code> and <code>{`JPEGImages`}</code> variables. This script also assumes you want the WebP output to go into the <code>{`img`}</code> folder. If you don't want that, change the value of the <code>{`outputFolder`}</code> variable to whatever you need. Once you're ready, run the script like so:</p>
        <CodeBlock>{`node webp.js`}</CodeBlock>
        <p>This will process all of the images and dump their WebP counterparts into the <code>{`img`}</code> folder. What benefits you realize will depend on the images you're converting. In my case, a folder with JPEGs totaling roughly 2.75 MB was trimmed down to <strong>1.04</strong> MB without any perceptible loss in visual quality. That's a <em>62% reduction</em> without much effort!</p>
        <Video
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508379806/jeremywagner.me/using-webp-images/bateman-3-placeholder.jpg"}
          sources={["http://res.cloudinary.com/drp9iwjqz/video/upload/v1509291984/jeremywagner.me/using-webp-images/bateman-3.webm"],["http://res.cloudinary.com/drp9iwjqz/video/upload/v1509291984/jeremywagner.me/using-webp-images/bateman-3.ogv"],["http://res.cloudinary.com/drp9iwjqz/video/upload/v1509291984/jeremywagner.me/using-webp-images/bateman-3.mp4"]}
          caption={"Have you ever seen my WebPs?"}
          width={500}
          height={257}
          critical={false}
          saveData={props.saveData}
        />
        <p>Now that all of your images are converted, you're ready to start using them. Let's jump in and put them to use!</p>
        <SubHeading>Using WebP in HTML</SubHeading>
        <p>Using a WebP image in HTML is like using any other kind of image, right? Just slap that sucker into the <code>{`<img>`}</code> tag's <code>{`src`}</code> attribute and away you go!</p>
        <CodeBlock>{`<!-- Nothing possibly can go wrong with this, right? -->
<img src="img/myAwesomeWebPImage.webp" alt="WebP rules.">`}</CodeBlock>
        <p>This will work great&mdash;but only for browsers that support it. Woe betide those unlucky users who wander by your site when all you're using is WebP:</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508380200/jeremywagner.me/using-webp-images/broken-webp-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210555/jeremywagner.me/using-webp-images/broken-webp-1x.png"}
          srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210555/jeremywagner.me/using-webp-images/broken-webp-1x.png 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210555/jeremywagner.me/using-webp-images/broken-webp-2x.png 2x"}
          caption={"WHAT HAPPENED"}
          width={357}
          height={222}
          saveData={props.saveData}
        />
        <p>It sucks, sure, but that's just the way front end development is, so buck up. Some features just aren't going to work in every browser, and that's not going to change anytime soon. The easiest way we can make this work is to use the <code>{`<picture>`}</code> element to specify a set of fallbacks like so:</p>
        <CodeBlock>{`<picture>
  <source srcset="img/awesomeWebPImage.webp" type="image/webp">
  <source srcset="img/creakyOldJPEG.jpg" type="image/jpeg">
  <img src="img/creakyOldJPEG.jpg" alt="Alt Text!">
</picture>`}</CodeBlock>
        <p>This is probably your best best for the broadest possible compatibility because it will work in every single browser, not just those that support the <code>{`<picture>`}</code> element. The reason for this is that browsers that don't support <code>{`<picture>`}</code> will just display whatever source is specified in the <code>{`<img>`}</code> tag. If you need full <code>{`<picture>`}</code> support, you can always drop in <a href="https://github.com/scottjehl/picturefill" rel="noopener">Scott Jehl's super-slick Picturefill script</a>.</p>
        <SubHeading>Using WebP in CSS</SubHeading>
        <p>The picture (see what I did there?) gets more complicated when you need to use WebP images in CSS. Unlike the <code>{`<picture>`}</code> element in HTML which falls back gracefully to the <code>{`<img>`}</code> element in all browsers, CSS doesn't provide a built-in solution for fallback images that's optimal. Solutions such as multiple backgrounds end up downloading both resources in some cases, which is a big optimization no no. The solution lies in feature detection.</p>
        <p><a href="http://modernizr.com/" rel="noopener">Modernizr</a> is a well-known feature detection library that detects available features in browsers. WebP support just so happens to be one of those detections. Even better, you can do a custom Modernizr build with only WebP detection <a href="https://modernizr.com/download" rel="noopener">on the download page</a>, which allows you to detect WebP support with very low overhead.</p>
        <p>When you add this custom build to your website via the <code>{`<script>`}</code> tag, it will automatically add one of two classes to the <code>{`<html>`}</code> element:</p>
        <ol>
          <li>The <code>{`webp`}</code> class is added when the browser supports WebP.</li>
          <li>The <code>{`no-webp`}</code> class is added when the browser doesn't support WebP.</li>
        </ol>
        <p>With these classes, you'll be able to use CSS to load background images according to a browser's capability by targeting the class on the <code>{`<html>`}</code> tag:</p>
        <CodeBlock>{`.no-webp .elementWithBackgroundImage\{
  background-image: url("image.jpg");
\}

.webp .elementWithBackgroundImage\{
  background-image: url("image.webp");
\}`}</CodeBlock>
        <SubHeading>What about users with JavaScript disabled?</SubHeading>
        <p>If you're depending on Modernizr, you have to think about users with JavaScript disabled. Sorry, but it's the way things are.</p>
        <Image
          lazy={true}
          placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508381212/jeremywagner.me/using-webp-images/screams-placeholder.jpg"}
          src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/screams.jpg"}
          caption={"You can\'t escape it"}
          width={498}
          height={246}
          critical={false}
          saveData={props.saveData}
        />
        <p>The user who has JavaScript disabled is someone you do have to think about. <a href="https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/" rel="noopener">It's more of a potential issue than you might think it is</a>, so if you're going to use feature detection that can leave some of your users in the dark, you'll need to test with JavaScript disabled. With the feature detection classes used above, JavaScript-less browsers won't even show a background image. This is because the disabled script never gets to add the detection classes to the <code>{`<html>`}</code> element.</p>
        <p>To get around this, we'll start by adding a class of <code>{`no-js`}</code> to the <code>{`<html>`}</code> tag:</p>
        <CodeBlock>{`<html class="no-js">`}</CodeBlock>
        <p>We'll then write a small piece of inline script that we'll place before any <code>{`<link>`}</code> or <code>{`<script>`}</code> tags:</p>
        <CodeBlock>{`<script>
  document.documentElement.classList.remove("no-js");
</script>`}</CodeBlock>
        <p>This will remove the <code>{`no-js`}</code> class on the <code>{`<html>`}</code> element when parsed.</p>
        <p>So what good does this do us? When JavaScript is disabled, this small script never runs, so the <code>{`no-js`}</code> class will stay on the element. This means we can can add another rule to provide an image type that has the widest support:</p>
        <CodeBlock>{`.no-js .elementWithBackgroundImage\{
  background-image: url("image.jpg");
\}`}</CodeBlock>
        <p>This does everything we need. If JavaScript is running, the small inline script is run and removes the <code>{`no-js`}</code> class before the CSS is parsed, so the JPEG is never downloaded in a WebP-capable browser. If JavaScript is indeed turned off, then the class is not removed and the more compatible image format is used.</p>
        <p>Now that we've done all of this, these are the use cases we can expect:</p>
        <ol>
          <li>Those who can use WebP will get WebP.</li>
          <li>Those who can't use WebP will get PNG or JPEG images.</li>
          <li>Those with JavaScript turned off will get PNG or JPEG images.</li>
        </ol>
        <p>Give yourself a hand. You just learned how to progressively use WebP images.</p>
        <SubHeading>In closing</SubHeading>
        <p>WebP is a versatile image format that we can serve in place of PNG and JPEG images&mdash;if it's supported. It can yield a substantial reduction in the size of images on your website, and as we know, anything that results in transferring less data lowers page load time.</p>
        <p>Are there cons? A couple. The biggest one is that you're maintaining two sets of images to achieve the best possible support, which may not be possible for your website if there's a huge set of imagery that you need to convert over to WebP. Another is that you'll have to manage a bit of JavaScript if you need to use WebP images in CSS.</p>
        <p>The takeaway is that the relatively low effort is worth the savings you'll realize, savings that will improve the user experience of your website by allowing it to load faster. Users browsing via mobile networks will benefit especially. Now go forward and WebP to your heart's content!</p>
        <SignOff/>
      </article>
    );
  }
}
