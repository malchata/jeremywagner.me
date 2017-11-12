import { h, render, Component } from "preact";
import Excerpt from "../../../components/Excerpt";
import SubHeading from "../../../components/SubHeading";
import Image from "../../../components/Image";
import SignOff from "../../../components/SignOff";

export const Metadata = {
	title: "Tips for Writing a Technical Book",
	date: "21 January, 2017",
	description: "My book Web Performance in Action is now published by Manning Publications. Here's some tips I've discovered after a year of writing my first technical book.",
	slug: "/blog/tips-for-writing-a-technical-book/"
};

export const BlogExcerpt = <Excerpt>
	<h1><a class="head" href={Metadata.slug} rel="noopener">{Metadata.title}</a></h1>
	<p className="date">{Metadata.date}{typeof Metadata.updateDate === "string" ? ` (updated ${Metadata.updateDate})` : null}</p>
	<p>I spent the last year writing a technical book for Manning Publications, and it's finally out! The book is called <a href="https://manning.com/books/web-performance-in-action?a_aid=webopt&a_bid=63c31090" rel="noopener"><em>Web Performance in Action</em></a>. The process was something I wanted to fully document, but it became clear to me that nobody would find such an overly-specific, long-winded screed worth reading.</p>
	<p>So instead, I said "to hell with it" and slapped a clickbait title on this thing. If you've ever entertained the notion of writing a technical book, these are some tips that served me well during the process. Well, for <em>me</em> at least. Your mileage will vary, of course.</p>
</Excerpt>;

export default class Content extends Component{
	constructor(props){
		super(props);
	}

	render(props){
		return (
			<article>
				{BlogExcerpt}
				<SubHeading>Don't do it for the money</SubHeading>
				<p>Getting published can do a lot for you. It can raise your profile. It could help you get booked to speak at major conferences. It can command respect from others in the industry if your book becomes well regarded. What it probably <em>won't</em> do is make you gobs and gobs of cash.</p>
				<p>Sure, it's possible <em>if</em> you write a book that hits the mark. Or if it spawns more than one edition. Don't operate under this presumption, though. If you want to invest a year (or more) in writing a technical book, you should do it because you love to teach and write.</p>
				<SubHeading>Tell your family and friends you're going away for a while</SubHeading>
				<p>Do you have a family? Are they not going to react well if you tell them you'll be spending the next year in the basement away from natural light sources? Then consider passing on the opportunity.</p>
				<p>My wife is exceedingly patient. She understands I have a lot of ambition to do things like writing and pushing pixels around on web pages. So when I ventured into the hole beneath my home to bask in blue light over the course of a year (as if this behavior was atypical to begin with), she didn't merely tolerate it, she offered encouragement. The support of your family is vital in tackling projects of this magnitude.</p>
				<p>You should also try to time the project during a stable period in your life. For instance, maybe don't sign a book contract if you've just had a baby. Or if life is otherwise going completely to hell.</p>
				<p>Your friends will see a lot less of you, too. Prior to securing the book deal, I would have drinks with friends at a local watering hole every week. As last year's January cold seeped into my bones, so too did the enormity of my task. I met friends for drinks much less often, opting to take my work to other watering holes alone, <em>if</em> I went anywhere at all.</p>
				<SubHeading>Don't be a jerk to the people who have to work with you</SubHeading>
				<p>I've spent the better part of my life as a rather negative person. In the last few years, I've been making an effort to iron out the kinks in my personality. I want to be someone that people like working with. The result is while I have some sharp edges in how I interact with people, I've improved somewhat. As with building software, self-improvement is continuous.</p>
				<p>This turned out to be good prep for writing a book. You have to remember that people at a publishing company are assigned by the publisher to work on specific projects. It's <em>literally their job</em> to make every book as successful as it can be, and that means they'll be working closely with you.</p>
				<p>Knowing this, it stands to reason you shouldn't be an insufferable jerk. Sure, <em>you're</em> the author. <em>You're</em> the subject matter expert that has been tapped to do the bulk of the work. That doesn't give you license to be above the feedback you'll receive from editors and reviewers.</p>
				<p>As I wrote <em>Web Performance in Action</em>, reviews were conducted three distinct times. This was when the cumulative manuscript was sent to readers who best represented the book's intended audience. Even in positive reviews, there was a ton of feedback. Sure, I couldn't incorporate all of it, but my editor was insistent at least <em>some</em> of it be attended to.</p>
				<p>My ego, bruised as it may have been at times, had no place in this project. I was contractually obligated by Manning to reach specific milestones by certain dates. That meant being cool to the people who had to work with me. This was vital in facilitating an amicable working relationship. Which leads me to my next point...</p>
				<SubHeading>You're (probably) replaceable</SubHeading>
				<p>Think you're never wrong? Think you're above constructive criticism? Then you're either infallibly brilliant (highly improbable) or just a jerk (highly likely). Jerks are unpleasant to work with. The reason some titles get canned isn't only because a book falls way behind schedule. It could also be that an author was notoriously difficult to work with (i.e., a jerk).</p>
				<p>Some titles <em>can</em> be doomed to cancellation due to a lack of perceived interest in the market, but if you're writing a book in a relevant space, being behind schedule <em>and</em> being a tremendous prick can be enough to make a publisher pull the plug. At the very least, it could make a publisher assign another more experienced (and cooperative!) author to the project.</p>
				<p>That means you're replaceable. I was not the best person to write <em>Web Performance in Action</em>. <em>But</em>, I was <em>a</em> person who had the knowledge to do so. I expressed that interest to a publisher at the right time, so I was given the opportunity. Any number of capable writers eager to be published would have gladly taken the helm if offered the chance. It's best to operate under this assumption, and do the best you can to be the kind of person <em>you'd</em> want to work with.</p>
				<p>But note I said <em>probably</em>. If you're recognized as an industry leader on a topic, your reputation could save you from the chopping block. Even if editors would rather jam knitting needles between their ribs rather than work with you. Then again, if you're a pioneer in your field, you're <em>probably</em> well-liked because you're an affable sort. Even jerks that rise to the top are recognized by their subordinates as such.</p>
				<SubHeading>Learn to deal with crushing depression</SubHeading>
				<p>This tip may not apply to you, the well-adjusted reader who never gets the blues. I've been through stints of depression in my life. I've taken medication for it on occasion. I've been off my meds for a long time and doing reasonably well, but I never forget who I am. If things are bleak and the end of the tunnel isn't in sight, I'm going to be depressed as <em>hell</em>.</p>
				<p>When I signed the publishing contract, I wasn't high on life, I was <em>shit-faced</em> on it. I finally had validation from a well known publishing company, and was being given this amazing opportunity to write for them! Everything was great! Food tasted better! Colors seemed more vibrant! Life was good.</p>
				<p>When you're riding high, though, you've got to come down sometime. My return to the base clay wasn't a crash landing, but a slow, steady descent ending in a skid off the runway into highway traffic. The electrifying feelings I had faded slowly as I applied myself to the project. Even as I wrote the first chapter, I was optimistic. As those first couple of months wore on, however, adjusting to the demands of writing a book was weighing on me. Revision notes began to pile up. A feeling crept in that the task was beyond me. That I made a huge mistake. The festival of self-loathing seemed imminent.</p>
				<p>This is where learning a lot about myself in the last few years came in handy: I recognized that this was what I did when the path to completing a project was uncertain. I kept my worst impulses at bay, and focused on the work. I made affirmations to myself: "You have the ability do this. Just put in the work, and you'll make it."</p>
				<p>Unsurprisingly, as the brutal Minnesota winter gave way to longer, sunnier days, I began to feel better. So perhaps the advice here is not so much to take a cue from Stuart Smalley in trying times, but to take some vitamin D.</p>
				<SubHeading>Take strategically timed breaks</SubHeading>
				<p>This one may be the most important: Take breaks. By which I don't mean you should get up and do other stuff every so often (you should be doing that anyway). I mean you should choose a handful of days where you're not going to write, or will only commit to writing minimally. Perhaps even get out of the house and <em>go</em> somewhere.</p>
				<p>When I finished the first third of <em>Web Performance in Action</em>, my wife and I went away for the weekend to a bed and breakfast out of town. Yes, I do admit to writing scarcely during that time, but the change of scenery helped to alleviate the crushing monotony at home. The getaway ended up being hugely beneficial. I returned home with a renewed sense of purpose that helped propel me through the next couple of months.</p>
				<p>When you need to recharge, heed the call, but realize that those breaks need to be strategically timed. If you have big deadlines coming in the next couple of weeks, you'll need to postpone your getaway accordingly. When you're free and clear for a little while, though, take advantage of the situation and clear your head.</p>
				<SubHeading>You're probably not going to stay on schedule</SubHeading>
				<p>When you sign a publishing contract, the publisher will set a schedule for when they expect you to meet certain milestones. Accept it's highly likely you will not be on schedule through the entire project.</p>
				<p>This isn't to say these deadlines can be brushed off when they're inconvenient. It means you may have to accept that you bit off more than you could chew in the allotted time. That's fine. This sort of thing happens. You need to put in your best effort to make deadlines, but if you should fall short, don't despair. Accept that you set goals beyond your capability in the allotted time frame.</p>
				<p>Most importantly, you need to <em>communicate</em> when this may happen. If you're nearing a deadline and it's obvious you're going to miss it, <em>say something</em>. The people you work with are human beings like you. They understand that people have limitations. As long as you make a good faith effort, you'll usually get the benefit of the doubt. Don't wait until the eleventh hour to sound the alarm. Do <em>not</em> blame <em>any</em>one. Own your shortcomings. Do your best to fix them. Then move on. Your book might be late, but the publisher will adapt accordingly. The publisher may opt to assign a second author to the project to help move it along, but this is okay. If you're working diligently and communicating with your editor, you'll always be involved in the project.</p>
				<SubHeading>Stress is normal, and okay (but only sometimes)</SubHeading>
				<p>You're going to experience some amount of stress in any enormous undertaking. It's important you know the different kinds of stress: Eustress, and distress.</p>
				<p><em>Eustress</em> is the kind of strain that boosts your performance. It's similar to what you might feel just before you go on stage to perform, or in some competitive activity. For me, eustress is a mild anxiety mixed with a high degree of confidence. The anxiety is beneficial because it's <em>just enough</em> uncertainty. It forces me to develop a sound plan and execute it well. It's perfect for a project such as a technical book. Eustress keeps you on schedule. It forces you to rise to the challenge and answer the call. It should <em>never</em> make you feel overwhelmed.</p>
				<p><em>Distress</em> is the opposite of eustress. It's the kind of crushing anxiety that makes you swear your hair is turning bone-white before your eyes. You'll have zero confidence, and feel totally depleted. It will be detrimental to your performance.</p>
				<p>When in distress, refer back to the previous tip: Accept that you may not be able to stay on schedule. Communicate to your editor that you need more time, or some help to get through the tough spots. Most importantly, accept that distress is okay <em>sometimes</em>. It's your body's natural response to excessive demand. What's <em>not</em> okay, is to allow yourself to be in a perpetual state of distress. It will have negative effects on your health. Distress is useful as a signal that something's got to give. Treat it accordingly, and don't allow yourself to bathe in it any longer than necessary.</p>
				<SubHeading>Take time off afterward</SubHeading>
				<p>When you finish writing (and you <em>will</em> finish), commit to a period of inactivity where you can recover. Take a trip. Go to happy hour a little more often than you otherwise would have (if that's your thing). Spend time with your family. Most importantly, spend this time basking in the pride that comes in a job well done. After your book has completed the production phase and goes into print, you'll get a box in the mail like this:</p>
				<Image
					lazy={true}
					placeholder={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508808178/jeremywagner.me/tips-for-writing-a-technical-book/final-book-print-placeholder.jpg"}
					src={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508808085/jeremywagner.me/tips-for-writing-a-technical-book/final-book-print-1x.jpg"}
					srcset={"http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508808085/jeremywagner.me/tips-for-writing-a-technical-book/final-book-print-1x.jpg 1x, http://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508808085/jeremywagner.me/tips-for-writing-a-technical-book/final-book-print-2x.jpg 2x"}
					caption={"The final print of Web Performance in Action."}
					width={600}
					height={315}
					saveData={props.saveData}
				/>
				<p>When that happens, take a moment to congratulate yourself. Then take some time off. Then plot your next move when you're ready to get back to work.</p>
				<SignOff/>
			</article>
		);
	}
}
