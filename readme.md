**Table of Contents**
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Variables](#variables)
- [Functions](#functions)
- [Template/Strings](#templatestrings)
- [String Improvements](#string-improvements)
- [Destructuring](#destructuring)
- [General](#general)

<!-- /TOC -->

Everything you need to Learn ES6 over at [ES6.io](https://ES6.io)
# Variables
- Block scope:
  - **let**: can be updated
  - **const**: immutable *binding*, properties of object can be updated
    - object.freeze(constInstance) will make properties un-updateable
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
  - **Always anonymous function** so not good stacktrace, but can assign to const or variables
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
  - When need `arguments` obejct

# Template/Strings
  - Template Strings/Literals: uses backticks: ``` `you are ${test}` ``` will write `test` variable into string. Can run JavaScripts inside of ${}
  - **multiline** strings now possible with backticks as well
  - Can nest template string within template string: map, terniary
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

# General
- console
  - console.table(object) - will display map function in table along with object
- Objects
  - if key and value are same name, don't need to specify both
    - eg: `{ name, race, test: 'test string' }` is the same as `{ name: name, race: race, test: 'test string' }`
- Function
  - rest: use ... to store all values as array assigned to variable
    `function multipleVariable( first, ...rest ) { CODE }`
