**Table of Contents**
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Variables](#variables)
- [Functions](#functions)
- [Template/Strings](#templatestrings)
- [String Improvements](#string-improvements)
- [Destructuring](#destructuring)
- [For of loop](#for-of-loop)
- [Array improvements](#array-improvements)
- [Spread/Rest Operator](#spreadrest-operator)
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
      <pre class="prettyprint">
      <code class="js">// Old style function
      function(name) {
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
      () => `name is here`</code>
      </pre>
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

  ```
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

    ```
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

# String Improvements
- startsWith/endsWith: parameters: string to search for, optionally how many characters to ignore at the beginning
- includes
- repeat: can create left pad function, will repeat string however much specified

# Destructuring
- Object
  - Easily set object properties as variables
  - Nice for extracting nested data or returning multiple values from a function (by returning object and destructuring immediately)
  - Can also set default for destructuring
  ```
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
  }

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
  ```
  // 'extra element...' is ignored and not saved
  [name, type, likes] = ['Nanook', 'cat', 'purring', 'extra element not needed']

  // feather, string, cat tree are saved as elements in toys array
  [officialName, ...toys] = ['Nanook the Awesome', 'feather', 'string', 'cat tree']

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

  ```
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
  `Array.from(domList)`
  `Array.from( domList, dom => dom.textContent )`
- of
  - Creates array from items passed in
  - `Array.from(1, 2, 3, 4)` returns `[1, 2, 3, 4]`
- find (just first instance)
  - argument is callback that returns true or false for each item in elements
  `arrayInstance.find(item => item.attribute == 'desired item')`
- findIndex (just first instance)
  - good for finding idx for deleting, etc
  `arrayInstance.findIndex(item => item.attribute == 'desired item')`
- Useful old methods that return true/false
  - some
    `arrayInstance.some(item => item.attribute == 'desired item')`
  - every
    `arrayInstance.every(item => item.attribute == 'desired item')`

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

# General
- console
  - console.table(object) - will display map function in table along with object
- Objects
  - if key and value are same name, don't need to specify both
    - eg: `{ name, race, test: 'test string' }` is the same as `{ name: name, race: race, test: 'test string' }`
