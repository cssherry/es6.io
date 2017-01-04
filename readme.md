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
