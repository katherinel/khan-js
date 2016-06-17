### Khan Academy Interview Project: Building a Challenge Framework

Technologies used: Node, React, Esprima

View the demo online: [https://pacific-reef-75373.herokuapp.com/]


**Esprima vs Acorn**

I decided to go with Esprima over Acorn for the parser. While they are comparable, Esprima seemed to have better documentation, slightly more community around it, and after reading about why Acorn was created in the author's own words, I really didn't see a compelling reason to use Acorn. In speed tests, Esprima claimed to beat Acorn, and Acorn claimed to beat Esprima, so there wasn't much to go on there. Both also claimed to be compatible with all relevant browsers.


**What I would add**

* A way to change what whitelisted and blacklisted types the tests check for - right now they are hardcoded.
* For the blacklist test, highlight where the blacklisted type was found. This feedback could be obtained using the Esprima parse 'loc' option, which gives line and column info.
* Indicate syntax errors (maybe - it's kind of annoying to have this feedback as you're typing. Perhaps set a delay on a timer so that it shows them after you've stopped typing for a few seconds?)
* A nicer code editor!


**How I'd do the last test**
*Determine the rough structure of the program. For example, "There should be a 'for loop' and inside of it there should be an 'if statement'."*
* Traverse through the tree recursively, looking for parent type. If no parent is found, return an error. If the parent is found, set a flag so that when you traverse through its node, you know that you're now looking for the child.


**What I would improve**

* Tests: whitelist and blacklist functions are similar, could probably make them more DRY.
* React: Codebox component is getting unwieldy. Would probably want to break it out into separate components.
* Overall things could be organized a little better; use an asset manager.

**Originally...**
My first attempt involved using a JS testing framework, Mocha (with Chai for assertions) - you can see it in test/code-box.js. I got the tests to run on the page load but couldn't get them to hook into the React component and run when I wanted them to, and I also scrapped this idea upon realizing that having a test framework like this running continuously would slow things down a lot.