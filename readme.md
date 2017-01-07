**Table of Contents**
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:0 orderedList:0 -->

- [Variables](#variables)
- [Functions](#functions)
- [Template/Strings](#templatestrings)
- [String Improvements](#string-improvements)
- [Destructuring](#destructuring)
- [For of loop](#for-of-loop)
- [Array improvements](#array-improvements)
- [Spread/Rest Operator](#spreadrest-operator)
- [Object Literal Improvements](#object-literal-improvements)
- [Promises](#promises)
- [Symbols (New 7th Primitive Types)](#symbols-new-7th-primitive-types)
- [Linting: ESLint](#linting-eslint)
- [Javascript Modules (old technology, but really prevalent in ES6)](#javascript-modules-old-technology-but-really-prevalent-in-es6)
- [Set up ES6 for all browsers](#set-up-es6-for-all-browsers)
- [Classes](#classes)
- [Generators](#generators)
- [General](#general)

<!-- /TOC -->

# Variables
- Block scope:
  - **let**: can be updated
  - **const**: immutable *binding*, properties of object can be updated
    - object.freeze(constInstance) will make properties not updatable
  - can'd re-declare multiple times
  - only available within block (if, loop, function, etc)
  - Uses:
    - Can replace **Immediately-invoked Function Expression (IIFE)**
      `(function(){var ... = ...})();` with `{ let ... = .... }`
    - for loop (eg: no longer setTimeout console.log(i) error)
    - prevents **temporal dead zones** (can't access before defined)
  - Ways to use:
    - option 1: https://mathiasbynens.be/notes/es6-const:
      - always `const`, `let` when necessary to rebind (string, number, etc), `var` never
    - option 2: https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch3.md of https://github.com/getify/You-Dont-Know-JS
      - `var` for top-level variables, `let` for localized variables, `const` replaces let only when know not reassigned (pain to change from let to const)
- Function scope:
  - var (old):
  - can be created/updated
  - if no function, becomes globally scoped to window

# Functions
- Arrow functions
  - Benefits
    - **concise**
      `[50, 55, 25, 70].filter( speed => speed >= 50 )`
    - **implicit returns** (for 1 line functions)
      - to return back object, use ({})
        `["this", "is", "fun"].map( (word, i) => ({ word: word, position: i + 1 }) )`
    - **doesn't rebind `this`** when used in other function
      - inherited from parent scope (eg: in event listener, doesn't bind to dom)

      <pre class="prettyprint">
      <code class="js">const $dom = $(.selector)
      $dom.on('click', function () {
        this.classList.toggle('new-class');
        setTimeout( {} => {
          // this object is the same as the this in scope directly outside setTimeout
          this.classList.toggle('newer-class');
        }, 500);
      });</code>
      </pre>
  - Use:
    - Uses fat arrow, don't need parenthesis when only 1 parameter, need parenthesis when no parameter

      ```js
      // Old style function
      function test (name) {
        return `${name} is here`
      }

      // Arrow function
      (name) => {
        return `${name} is here`
      }

      // without parenthesis
      name => {
        return `${name} is here`
      }

      // one liner
      name => `${name} is here`

      // one liner without parameter
      () => `name is here`
      ```
  - **Always anonymous function** so not good stack-trace, but can assign to const or variables
  - **default values** in functions now supported
    <pre class="prettyprint">
    <code class="js">function testDefault(first, second = 'second', third = 'third'){
      return `${first} ${second} ${third}`
    }

    // to skip variable, just pass in "undefined"
    testDefault(1, undefined, 3)
    </code>
    </pre>
  - Don't use arrow functions when need access to function's `this` objects:
    - in event handler
    - as property of object

    <pre class="prettyprint">
    <code class="js">const objectType = {
      count: 0,
      add() {
        this.count++
      }
    }</code>
    </pre>

  - Don't add as prototype function
  - When need `arguments` object

# Template/Strings
  - Template Strings/Literals: uses backticks: ``` `you are ${test}` ``` will write `test` variable into string. Can run JavaScripts inside of ${}
  - **multiline** strings now possible with backticks as well
  - Can nest template string within template string: map, ternary
  - to make code more readable, don't nest too many functions inside of backticks, use helper function

  ```js
  function createLi (list) {
    return list.map( number => `<li> ${number} </li>` ).join('');
  }

  const template = `
  <ul>
  ${ createLi( [1, 2, 3, 4] ) }
  </ul>
  `
  ```
  - **tag template**
    - function's first parameter is array of strings in template. Other parameters are the values of inserts for the template (1 less than length of array from first parameter)
    - can also pass in string, which will then get passed on as a value to the template tag to add custom tags around values, sanitize specific strings, etc

    ```js
    function templateTag(strings, ...values) {
      let str = strings[0];
      values.forEach( (string, i) => {
        str += "these " + values[i] + strings[i + 1];
      });
      return str;
    }

    const first = "oranges";
    const second = "apples";

    const sentence = templateTag`Comparing ${first} to ${second}`;
    ```
    - Sanitize user input within templates using https://github.com/cure53/DOMPurify

    ```js
    function templateTag(strings, ...values) {
      let str = strings[0];
      values.forEach( (string, i) => {
        str += "these " + DOMPurify.sanitize(values[i]) + strings[i + 1];
      });
      return str;
    }

    const first = "oranges";
    const second = "apples";

    const sentence = templateTag`Comparing ${first} to ${second}<script>alert("Running bad JavaScript");</script>`;
    ```

# String Improvements
- startsWith/endsWith: parameters: string to search for, optionally how many characters to ignore at the beginning
- includes
- repeat: can create left pad function, will repeat string however much specified

# Destructuring
- Object
  - Easily set object properties as variables
  - Nice for extracting nested data or returning multiple values from a function (by returning object and destructuring immediately)
  - Can also set default for destructuring

  ```js
  const nanook = {
    type: 'cat',
    likes: 'flopping over',
    sound: 'purring',
    hates: 'collars',
    from: {
      city: 'SF',
      state: 'CA',
      country: 'USA'
    },
    contact: {
      email: 'nanook@gmail.co',
      twitter: '@roarnookie'
    }
  };

  const { type, sound, testDefault = 'test' } = nanook; // saves as type and sound and uses default test for testDefault
  const { city:cy, state:st } = nanook.from; // saves as cy and st

  // Function where you don't need to worry about order of parameters
  function noWorries({ worry = 'nothing', name = 'me', amount = 100 }) {
    return `${name} is worried about ${worry} by ${amount}%`;
  }

  noWorries({ worry: "No money", amount: 110 });
  noWorries({ });
  ```
- Array
  - ignores extra elements
  - rest operator gives array of rest

  ```js
  // 'extra element...' is ignored and not saved
  [name, type, likes] = ['Nanook', 'cat', 'purring', 'extra element not needed'];

  // feather, string, cat tree are saved as elements in toys array
  [officialName, ...toys] = ['Nanook the Awesome', 'feather', 'string', 'cat tree'];

  ```
- Reassignment: creates array and reassign to variables, no need for tmp variable
  - to switch 2 values: `[firstValue, secondValue] = [secondValue, firstValue]`

# For of loop
- Loop over any iterable: arguments, array, string, map, generator, set, dom collection, etc -- anything with Symbol.iterator
- Old loops
  - for loop -- strange syntax
  - forEach -- can't use `break` or `continue`
  - for in -- only passes on index values, but also includes prototype functions and the array's direct properties
- Benefits:
  - Allows use of `break` or `continue`
  - Can iterate through generators (eg: `array.entries()`)
  - Can loop over lots of stuff that aren't array like arguments or dom collections (though new dom elements have `forEach` function now)
  - ES2017 has Object.entries(), available through polyfill. However, for now, use Object.keys(objectInstance) or `for in`

  ```js
  // Use const so that val is scoped for each loop
  for (const val of arrayInstance) {
    CODE
  }

  for (const [i, val] of arrayInstance.entries()) {
    CODE
  }
  ```

# Array improvements
- from
  `Array.from( domList )`
  `Array.from( domList, dom => dom.textContent )`
- of
  - Creates array from items passed in
  - `Array.of(1, 2, 3, 4)` returns `[1, 2, 3, 4]`
- find (just first instance)
  - argument is callback that returns true or false for each item in elements
  `arrayInstance.find(item => item.attribute === 'desired item')`
- findIndex (just first instance)
  - good for finding idx for deleting, etc
  `arrayInstance.findIndex(item => item.attribute === 'desired item')`
- Useful old methods that return true/false
  - some
    `arrayInstance.some(item => item.attribute === 'desired item')`
  - every
    `arrayInstance.every(item => item.attribute === 'desired item')`

# Spread/Rest Operator
- Rest: use ... to store all values as array assigned to variable
  - Can be used to put all iterable into 1 array
    `function multipleVariable( first, second, ...rest ) { CODE }`
  - Deconstruct to array
    `[name, type, ...toys] = ['Nanook', 'cat', 'feather', 'ball', 'cat tree']`
- Spread: puts each iterable into element of array
  - String: `[...'nanook']` turns into `['n', 'a', 'n', 'o', 'o', 'k']`
  - Array: `[...['test', 1], 'another', ...['oh', 'good']]` turns into `['test', 1, 'another', ''oh', 'good']`
  - Uses:
    - Used instead of concatting array
    - Can be used to copy array
    - Alternative to Array.from (probably not preferred)
      `[...document.getElementsByTagName('p')].map( el => el.textContent )`
    - Slice out element from array (common with react)
      `[...arrayInstance.slice(0, 5), ...arrayInstance.slice(6)]`
    - Spread into function
      - `[1, 2].push(...[3, 4])` instead of `[1, 2].push.apply([1, 2], [3, 4])`

# Object Literal Improvements
- if key and value are same name, don't need to specify both
  - eg: `{ name, race, test: 'test string' }` is the same as `{ name: name, race: race, test: 'test string' }`
- Shorthand for creating object functions (see functions section)
- Assign template as property names

```js
const key = 'nanook';
const value = 'tabby';

{
  [key]: value, // always able to do
  [`${key}2`]: value, // new ability to compute key in ES6
};
```

# Promises
- fetch

```js
const requestPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');

requestPromise
  .then(data => data.json())
  .then(data => {console.log(data)})
  .catch(err => {console.log(err)});
```
- Build custom promises to run something async

```js
let err = true
const requestPromise = new Promise((resolve, reject) => {
  if (err) {
    reject(Error('custom error parameter'))
  } else {
    resolve('custom parameter');
  }
  // if this returned a promise, would be able to find chain another .then statement
});

requestPromise
  .then(data => {console.log(data)})
  .catch(err => {console.log(err)});

// can accept multiple promises and run them both at once
// Waits for all promises to finish before running "then" callback
Promise
  .all([requestPromise, otherPromise])
  .then(responses => {
    [requestPromiseResult, otherPromiseResult] = responses;
  })

// If the two requests return json objects, need another promise
Promise
  .all([requestPromise, otherPromise])
  .then(responses => {
    return Promise.all(responses.map( res => res.json() ));
  })
  .then(responses => {
    [requestPromiseResult, otherPromiseResult] = responses;
  })
```

# Symbols (New 7th Primitive Types)
- In addition to current number, string, object, boolean, null, undefined primitive types
- Is unique identifier, no naming collision
- Uses:
  - Unique keys within objects

  ```js
  const itinerary = {
    [Symbol('Spain')]: new Date('10/10/2016'),
    [Symbol('France')]: new Date('10/12/2016'),
    [Symbol('Italy')]: new Date('10/14/2016'),
    [Symbol('Spain')]: new Date('10/15/2016'),
  }

  // To get data from itinerary, need to get symbol using getOwnPropertySymbols
  const symbolArray = Object.getOwnPropertySymbols(itinerary);
  const data = symbolArray.map( key => itinerary[key] );
  ```
  - Store classified data because not loopable with `for in` loop

# Linting: ESLint
- Install ESLint to monitor code for js error -- by default all checks are off, but should enable either eslint:recommended or airbnb -- airbnb more strict than eslint:recommended
- Good to read the ESLint explanation for the error -- might not want to turn off
- global eslint config in ~/.eslintrc if there's no eslintrc file within parent directories
- To set globals within file:

  ```
  /* globals ga */
  ```

- To turn off lint feature

  ```js
  /* eslint-disable no-extend-native */

  no-extend-native is DISABLED here

  /* eslint-enable no-extend-native */

  no-extend-native linting is ENABLED again
  ```
- Plugins available for linting within different environments (eg: html or markdown)
- `eslint *.html` or `eslint --ext html` will lint all html files
- `eslint --fix` will fix specified file -- only works for .js files currently
- ESLint git hooks :)
  - Prevents user from committing to repo unless they pass linting
  - Add file within the repo's `.git > hooks` folder.

  ```bash
  #!/bin/bash
  files=$(git diff --cached --name-only | grep '\.jsx\?$')

  # Prevent ESLint help message if no files matched
  if [[ $files = "" ]] ; then
    exit 0
  fi

  failed=0
  for file in ${files}; do
    git show :$file | eslint $file
    if [[ $? != 0 ]] ; then
      failed=1
    fi
  done;

  if [[ $failed != 0 ]] ; then
    echo "🚫🚫🚫 ESLint failed, git commit denied!"
    exit $failed
  fi
  ```

# Javascript Modules (old technology, but really prevalent in ES6)
- import JavaScript modules rather than using scrip tags -- currently not really supported by modern browsers yet
- Need package.json + webpack to bundle js to make ES6 modules work
- To create app:
  - have main js file
  - `npm init` to create package.json to save references to npm installed packages (like `jquery` from `npm install jquery`) -- pretty much all packages are available through npm install
  - `npm install webpack@beta --save-dev` to work with modules
  - `npm install babel-core babel-loader babel-core babel-preset-es2015-native-modules --save-dev` to convert from ES6 to ES5 but supporting modules
  - Create webpack.config.js file
  - Define 'build' within package.json > scripts
  - build with `npm run build` -- will run as long as running code
  - Alternatives:
    - systemJS (quickly makes app works -- no need to npm install -- just include script and run through server) with jspm
    - Browserify

# Set up ES6 for all browsers
- To babelify (syntax to ES5)
  - `npm install babel-cli babel-preset-es2015 --save`
  - Create .babelrc file or define babel within package.json
  - define 'babel' within package.json > scripts
- To polyfill (functions to ES6)
  - Provide all polyfills: `import "babel-polyfill"`
  - Provide polyfill specific to user agent: [Polyfill.io](https://qa.polyfill.io/v2/docs/)
- Custom modules
  - variables are scoped within the module
  - to use outside module, need to export variables
    - default export (main function) -- can be imported as any name
    - named export -- export as specific name -- import surrounded with curly braces

# Classes
- New way to write prototype inheritance
- Declaration

```js
class Animal {
  // Runs whenever new Animal is called
  constructor (name, species) {
    this.name = name;
    this.species = species;
  }

  // Prototype method
  makeNoise() {
    console.log("GRRRRRR");
  }

  // Class method
  static makeTons () {
    console.log("SO MANY ANIMALS!");
  }

  // Setters/getters
  set treat (type) {
    this.treat = type;
  }
  get treat () {
    console.log(`${this.name} loves to eat ${this.type}`);
  }
}

// Can extend classes -- don't go beyond 2 - 3
// Can also extend built-in like Arrays
class Cat extends Animal {
  constructor (name, type) {
    super(name, 'cat');
    this.type = 'fluffy';
  }
  purr(){
    this.makeNoise();
    console.log("purrrrrr");
    this.makeNoise();
  }
}
```

- Expression

```js
const Animal = class {

}
```
- Requires:
  - constructor property function

# Generators
- Function that can start/stop and pause

```js
// Indicate generator with *
function* getPrime(numberPrimes = 10) {
  let curr = 2;
  while (numberPrimes > 0) {
    if (isPrime(curr)) {
      // yield stops the code when .next is called
      numberPrimes--
      yield curr;
    }
    curr++
  }

  function isPrime(num) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}
```
- Uses:
  - Can be iterated through with `for of` loop
  - Waterfall dependent ajax requests without nesting them

  ```js
  // What happens
  function getNext(url, data) {
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
    })
    .fail(function (resp) {
      alert('Failed',);
    })
    .success(function(resp) {
      // resp will get passed on and stored as result of yield getNext()
      waterfall.next(resp);
    });
  }

  // Generator function
  function* ajaxRequests() {
    const sendEmail = yield getNext('http://importanturl.com/1');
    const getStatus = yield getNext('http://importanturl.com/2', sendEmail);
  }

  // Code which is initially run
  const waterfall = ajaxRequests();
  waterfall.next(); // start process
  ```
# General
- console
  - `console.table(object)` - will display `.map(function)` in table along with object
- terminal
  - `ll` shows detailed list of items in folder
