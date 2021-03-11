import { customElement, html, css, FASTElement } from '@microsoft/fast-element';
import { styles_headers } from '../typography';

// Thanks for the ideas: https://www.writeabout.com/2017/11/darth-vaders-to-do-list-6/

const template = html<HomeScreen>`
  <h1>Your Day at a Glance</h1>
  wake up (Hard!)
Put on helmet.
For breakfast eat darth’os
Force choke admiral ozzel.
Battle luke skywalker.
Think”Emperor why you so stupid?)
Go to disney.(Dark lords don’t wait in line!)
Blow up stuff.
Make a death star. 4
Sing my theme song! http://youtube/imperial march
Destroy rebel scum.
Eat lunch.
Capture Princess Leia.
Dance.
Hope no one sees me dancing.
Kill the ones who see me dancing.
Use the bathroom.
Train Starkiller.
Battle Starkiller after he joined the Rebels.
Use the eclipse.
Blame Rebels for everything.
Eat diner (roast sarlacc again?).
Watch tv.
Go to bed(will you tell me a story emperor?).
Wake up in the middle of the night.
Eat cake.
Watch empire fall.
Die.
`;

const styles = css`
  :host {
    contain: content;
    display: block;
    padding: 32px;
  }

  ${styles_headers}
`;

@customElement({
  name: 'home-screen',
  template,
  styles
})
export class HomeScreen extends FASTElement {
}