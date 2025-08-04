JavaScript is a loosely-typed, interpreted programming language.

 
- same-origin-policy: Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port). This is called the “Same Origin Policy”. To work around that, both pages must agree for data exchange and must contain special JavaScript code that handles it. 


"JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side."
^ is this same-origin-policy

TypeScript transpiles to JavaScript 

Specification: https://ecma-international.org/technical-committees/tc39/
Manual: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
Tutorial: https://javascript.info/


Absolute Path Usage:
```html
<script src="/script.js"></script>
```
Relative Path Usage:
```html
<script src="script.js"></script>
```

JavaScript interprets line breaks as implicit semicolons - this is called 'automatic semicolon insertion', except when there is an incomplete expression, in which case, JavaScript does not assume a semicolon.

But there are situations where JavaScript “fails” to assume a semicolon where it is really needed.
Example:
```javascript

alert("Hello")
[1, 2].forEach(alert);

```

Multi-line comments in JavaScript
```javascript
/* An example with two messages.
This is a multiline comment.
This is a multiline comment.
*/
```
Shortcut for commenting out code in most editors: Ctrl + /


Statements - are syntax constructs and commands that perform actions.


## 'use strict'

For a long time, new features were added to JavaScript without modifying existing ones, which had the benefit of never breaking old code. But the downside was any imperfect decision made by JavaScript creators got stuck in the language forever.  This was the case until ES5, when existing features were modified, but to keep old code working, these modifications are off by default - you need to explicitly enable them with a special directive - "use strict" - at the top of the script.

strict mode is off in browser consoles, but you can add with multi-line input:
```console
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```
- Does node REPL execute in strict mode?
Node REPL does not execute in strict mode, but can be turned on with the option --use_strict:
```bash
node --use_strict
```

Explicitly enabling strict mode may not always be needed because using certain language features, like classes and modules, automatically enable 'use strict'. 

Some differences between strict mode and non-strict mode:
- In non-strict mode, a variable can be created without declaring it 


Infinity -Infinity NaN 
Infinity is greater than any number, it is the result of dividing by 0
-Infinity is less than any number, it is the result of dividing a negative number by 0
NaN is a result of a computational error or an incorrect or undefined mathematical operation
NaN is sticky - any further mathematical operations on NaN returns NaN. One exception: NaN ** 0 is 1

Mathematical operations will never result in errors being thrown, at worst we'll get NaN as a result.

The number data type is limited to 64 bits, so JavaScript cannot accurately represent numbers outside the range ±(2^53 - 1) with the normal number data type. 

BigInt type was recently added to the language to represent integers of arbitrary length. They are represented by appending n to the end of the number:
```javascript
const aBigInt = 1234567890123456789012345678901234567890n;
```

In JavaScript there is no floating point data type, the number type represents both integer and floating point numbers. There is also no character data type, only the string data type which may consist of zero (be empty), one character, or many of them.

Math is a built-in object that provides mathematical operations.

Boolean values can come as a result of comparisons.

By convention, if we want to represent somethign as 'empty' or 'unknown' we use null instead of undefined. So if we come across something set to null, we can assume it was intentioned by a human, whereas if we come across undefined we can assume it was the JavaScript language. (However, because you can explicitly assign undefined to variables, these assumptions cannot always be relied upon.)

The symbol type is used to create unique identifiers for objects.

There are 8 data types in JavaScript, 7 primitive (their values contain only one entity), 1 non-primitive:
- boolean
- number
- bigint
- string
- null
- undefined
- symbol
- object

The `typeof` operator allows us to see which type is stored in a variable, it returns a string with the type name. There are some peculiarities concerning `typeof`: 
  - `typeof` null returns 'object'. This is an officially recognized error that cannot be fixed due to early mistakes in creating JavaScript, and must be remembered so that one can work around it. 
  - In addition to basic types, `typeof` can distinguish functions and return 'function'. There is no function type in JavaScript, so this is also technically a mistake, also from the early days of JavaScript, but one that can be convenient in practice.


alert, prompt, and confirm are browser-specific global functions that allow interaction with a user by pausing script execution until dismissed.


TypeScript's benefits:
1. In the editor, it can highlight code that would throw an error, that without TypeScript could only be discovered AFTER running the code.
2. It highlights instances where the running code can potentially fail and forces you to consider those potential cases. (TypeScript forces you to consider edge cases, like when a variable is potentially null or undefined.)
3. If code is all statically typed (especially code that you import from others), then you can make predictions about what the code is expected to do before it runs.
4. If code you import is statically typed, and has type declaration files, you can use them as documentation.

In a way, TypeScript is mainly for your code editor. 
