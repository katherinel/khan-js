### Khan Academy Interview Project: Building a Challenge Framework

Technologies used: Node, React, Esprima, Mocha + Chai

View the demo online:


**Esprima vs Acorn**
I decided to go with Esprima over Acorn for the parser. While they are comparable, Esprima seemed to have better documentation, slightly more community around it, and after reading about why Acorn was created in the author's own words, I really didn't see a compelling reason to use Acorn. In speed tests, Esprima claimed to beat Acorn, and Acorn claimed to beat Esprima, so there wasn't much to go on there. Both also claimed to be compatible with all relevant browsers.

**Mocha + Chai**
These came up as a popular JS test framework, so I used them for my unit tests. You can see the tests in test/code-box.js

**React**
I used React as a way to easily handle the user input events. 

**What I would improve**
