![ES6 for Everyone](https://es6.io/images/es6-facebook-share.png?cool=yah)

# ES6 for Everyone Starter Files

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

