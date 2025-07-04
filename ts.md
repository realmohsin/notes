- when using exclude of tsconfig.json, things to remember:
- "exclude": ["build"] - writing it like this will only work on top level directory of build. any sub directory with the name 'build' will not be excluded.
- "exclude": ["**/build/*] - this will exclude all folders with the name build, including subdirectories.
- "exclude": ["**/ignored.ts"] - this will ignore all files in all directories with the name 'ignored.ts'.

Personal way to start:
```json
"include": ["./src/**/*"],
"exclude": ["./node_modules/", "**/build/*", "**/*.ignored.ts"]
```

A folder name without anything in front usually implies './' in front. once you get used to that you can leave it out.


Epiphanies:
One major point of using TypeScript is knowing exactly when you need to type narrow and when you don't.
When using TypeScript without a bundler, include .js extension when importing files.

Use tsx for running ts code without compiling first. Good for dev environment.

JavaScript is dynamically typed, meaning the type of a variable can change in runtime.

Type Error - When the program throws an error because a value of one type was used when the program was expecting another type.

Type Safety - Eliminating type errors by ensuring types are only used in the correct place. There are varying degrees of type safety, from incredibly rigid with a low chance of type errors to more flexible with a higher chance of type errors.

Static Analysis - When a tool analyzes your code without executing it.

Compiler - A program that takes code transforms it into another format.

Type Annotation - Small bits of code that tell TypeScript what type a value or variable is.

Type Declaration - A file with the .d.ts extension which only holds type definitions for a JavaScript library.

You can install TypeScript using:
npm install -g typescript

Once that's done you can use the tsc command to run the TypeScript compiler. TSC is the TypeScript command line tool. We run this to type check and compile our code into JavaScript. If we have a tsconfig.json file in our project directory, tsc will pick up all of the configuration options we used in that file.

If installed locally, you can use:
npx tsc

The first thing to do is to initialize a tsconfig.json file. This will tell TypeScript how we want to run the compiler. To initialize the file:
tsc --init

Sample tsconfig.json:

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  }
}
```

The `target` field lets us choose what version of JavaScript the compiler will transform our code into. This is useful if we want to target older browsers, like Internet Explorer 11. Targeting older browsers often means adding more code to your JavaScript files for polyfills and workarounds.

The `module` field lets us change what module system the output of our bundle will use. This affects how our import and export statements are transformed in the final JavaScript output. If I were making an app for NodeJS or if I were using a bundler like Webpack, I would choose CommonJS. (For Webpack, why would it matter whether its commonjs or something else?)

"isolatedModules": true
When this is on, TypeScript expects every file to be a module. That means it has either an import or an export statement somewhere in the file. If we don't have anything to import or export for some reason, we can turn a file into a module by adding export default {} to the end of the file. This setting is helpful when working with external tools, like Babel. (Unclear explanation) Further explanation: Basically its needed for babel and other build tools because they transpile each file one at a time. Since they transpile one file at a type, you can't have global types from namespaces. That's the main reason for this. There are other restrictions, but the main one is forcing your code to avoid global types.

"strict": true,
Our tsconfig.json file lets us change how strict the type checker is when checking our types. There are a lot of options which we can choose from, but if we just want to enable all of them and have the type system catch as many bugs as possible, all we have to do is enable the strict flag.

- noImplicitAny - any is a type in TypeScript which turns off the type checker for a variable and makes it act like regular JavaScript. If we want a variable to do that, we should be explicit about it so we don't accidentally create type errors for ourselves.

- strictNullChecks - With this on, TypeScript will automatically warn us any time a variable could be null or undefined. This will help us avoid the dreaded Cannot read property of undefined errors.


`esModuleInterop`: true
This flag makes it much easier to use code from both the CommonJS and the ES Modules system. This is often necessary when working with packages from NPM. It adds a small bit of code to our JavaScript output, but saves a lot of headaches.



Implicit Type Checking
TypeScript will automatically infer the types of many of the values in your program without you having to explicitly assign them a type. This kind of inference works for all of the primitive types, like numbers and booleans. TypeScript also infers the types of object literals as well as array literals.

Contextual Type Inference
TypeScript can also infer the types of variables based on the context where the variable was created. Usually this is because the functions and constructs surrounding the variable are typed and so inference is possible. (Usually contextual type inference can only happen with callbacks, if those callbacks are defined inline, otherwise they have to be typed if passed after being saved to a variable. This is because function definitions and declarations cannot be inferred implicitly. Inline functions can be implicitly inferred because they are assumed to be used only as that particular callback.)

non-null assertion:
```typescript
let x!: string;
console.log(x); // undefined
```
Non-null assertions allow us to use values before they are assigned. Usually not wanted, but for the cases where that's intended use non-null assertions.

For annotating arrays, there's two syntaxes:
```typescript
let x: string[];
let y: Array<string>;
```
The first variation is preferred. When using React the second syntax is not allowed.

Be careful not to mix up destructuring and type annotations:
```typescript
let { courses: orderedFood, veganOption: hasVegan } = menu;
```
The above is destructuring, not type annotations.

Restoring Type Safety from any Values
One useful technique is putting a value with the 'any' type into a variable with a defined type. This restores TypeScript's type checking to that value. One place this might be necessary is when performing network requests.
```typescript
async function getFruitList() {
  const response = await fetch("https://example.com/fruitList");
  const fruitList = await response.json();
  const typeFruitList: string[] = fruitList;
  return typeFruitList;
}
```
response.json() returns a promise that resolves to a value of 'any'. We can restore type checking by assigning this value to a typed variable. But we have to be extra careful we assign correctly.

When annotating functions, the return value can usually be inferred, but its better to annotate explicitly because it will help you make sure the return value is of the expected type instead of letting it be assumed potentially incorrectly.

When destructuring parameters and setting type annotation:
```typescript
function getFruitName({ name }: { name: string }) {
  return name;
}
```

We only need to annotate the properties needed by the function, we can pass an object with extra properties, without needing to annotate the properties that aren't used.

To annotate return value of arrow function:
```typescript
const headsOrTails = (): boolean => {
  return Math.random() > 0.5;
};
```

By definition, an async function is a function which returns a JavaScript Promise. There is a special syntax for defining the type of the value which is wrapped in a promise. We place the wrapped type in angle brackets and put Promise in front of it.
```typescript
async function getFruitList(): Promise<string[]> {
  const response = await fetch("https://example.com/fruit");
  const fruitList: string[] = await response.json(); // restoring type safety
  return fruitList;
}
```

To create a function type annotation, there is a special syntax:
```typescript
function mapNumberToNumber(list: number[], callback: (item: number) => number) {
  // (parameter) callback: (item: number) => number
  // Implementation goes here
}
```

For optional and default parameters:
```typescript
function logOutput(message = "hello, world", yell?: boolean) {}
```
Parameters with default values don't need annotation, and optional parameters need to be marked with '?'.

To use rest parameters:
```typescript
function logManyOutput(...messages: string[]) {}
```

There are plenty of times when writing TypeScript that we have no way of knowing what the type of something is. TypeScript gives us two special types that represent values that could be any type: any and unknown.

The any type turns off the type checker and removes all guarantees that our types are correct.

We can assign values of 'any' to variables of any type. This allows us to start type checking a value that was 'any' by putting it in a variable thats typed.

unknown is the type safe version of any. It still can represent any type, but since we don't know what type it is specifically, TypeScript limits what we are able to do with values of this type.

You can assign values of any type to a variable with the 'unknown' type, but you can't assign 'unknown' values to variables of other types. You can't do anything with an 'unknown' value except pass it around. You can only do something with it if you use type narrowing to determine its type beforehand.

When working with any kind of dynamic data, such as user input or API responses, you'll have some degree of uncertainty with the types of the data you use. That means at some point you'll have to use any or unknown, but how do you know when to use one over the other? any gives you the greatest flexibility, but absolutely no type safety, so it's best to avoid any unless it is absolutely necessary. Using unknown doesn't give you much flexibility, but it does maintain TypeScript's type safety guarantee, and encourages you as the developer to add the necessary checks to narrow your value's type to something more useful. As a general rule of thumb, prefer unknown over any and use type narrowing to determine a more accurate type.

You should prefer to use unknown as it will force you to narrow types before engaging in something that might throw a Type Error.

For network responses, if you don't know the type of the value returned, you can use 'unknown' for type safety:

```typescript
async function getFruitList(): unknown {
  const response = await fetch("https://example.com/fruit");
  const fruitList: unknown = await response.json(); // restoring type safety
  return fruitList;
}
```

We can construct a special type definition for our object using Interfaces. Interfaces let us create a named definition of the shape of an object that we can reuse. Once we've defined our interface type, we can use it as a type annotation.

We could extend our interface. This copies the property definitions of one interface to another:

```typescript
interface EdibleThing {
  name: string;
  color: string;
}

interface Fruit extends EdibleThing {
  sweetness: number;
}

const apple: Fruit = { name: "apple", color: "red", sweetness: 80 };
```

When TypeScript is checking to see if a value can be assigned to an Interface, it is going to look at each of the properties to see if the types of those properties match up. That makes it possible to put more properties on a variable than are defined by the interface. Exception is for object literals, in that case, number of properties have to match as well. (What is the point of this exception? Just a problem to be aware of I suppose like JavaScript's typeof null is 'object'?)

We can designate a property as optional with ?:

```typescript
interface Fruit {
  name: string;
  color: string;
  calories?: number;
}
```

But this would mean we have to type narrow before accessing calories, since it may not exist.

Indexable Types
There might be times when we don't know the properties that will be on an interface before we run our code, such as when we are adding properties dynamically to an object. In these cases, we can tell TypeScript to allow properties that follow a certain type signature, or index signature.

```typescript
interface Fruit {
  [key: string]: string;
  name: string;
}

let apple: Fruit = {
  name: "Apple",
  ripeness: "overripe",
};

interface FavoriteFruitList {
  [fruitOrder: number]: string;
}

const favoriteFruit: FavoriteFruitList = [];
favoriteFruit[1] = "Apple";

const thirdPlace = 3;
favoriteFruit[thirdPlace] = "Strawberry";
```

Note that we can use any identifier we want for our index, it won't affect our code, but is helpful for documenting what the index type actually represents.

TypeScript gives us two types which expand on object and array: Enums and Tuples. The purpose of both of these types is to add even more structure to our types.

Enums
We can use an Enum to create a type safe definition of named constants which we can reference elsewhere in our code.

Enums are special in that they are both a type and a value.

```typescript
enum Seasons {
  winter,
  spring,
  summer,
  autumn,
}

function seasonsGreetings(season: Seasons) {
  if ((season = Seasons.winter)) return "⛄️";
  // ...
}

const greeting = seasonsGreetings(Seasons.winter);
```

Enums act like an object, where the strings we include are the property names and their values are incrementing numbers, starting at 0.

Most types are removed when TypeScript compiles code to JavaScript. Enums, on the other hand, are translated into JavaScript snippets which represent their shape and behavior. That makes Enums both a type and a value. They roughly translate to:

```typescript
var Seasons;
(function (Seasons) {
  Seasons[(Seasons["winter"] = 0)] = "winter";
  Seasons[(Seasons["spring"] = 1)] = "spring";
  Seasons[(Seasons["summer"] = 2)] = "summer";
  Seasons[(Seasons["autumn"] = 3)] = "autumn";
})(Seasons || (Seasons = {}));

console.log(Seasons);
// {
//   '0': 'winter',
//   '1': 'spring',
//   '2': 'summer',
//   '3': 'autumn',
//   winter: 0,
//   spring: 1,
//   summer: 2,
//   autumn: 3
// }
```

If giving enum variables string values, they cannot be changed later to a string, they can only be changed to another of the other Enum values through enum reference.

Tuples
Tuples are fixed-length arrays. We can tell TypeScript how many items are in the array, and what the type of each item is.

```typescript
function simpleUseState(
  initialState: string
): [string, (newState: string) => void] {
  // The rest of the implementation goes here.
}
```

void
void represents the absence of any type. It's often used to indicate that a function doesn't return anything.

never
never represents a value that can never occur.

Interfaces allow us to give names to the shape of objects. Objects aren't the only types we encounter in our program, though.

type aliases allow us to give names to any other type or combination of types. type aliases allow us to give names to any other type or combination of types.

Writing type aliases doesn't create a new type; any value that is compatible with the alias' type will be compatible with the alias.

```typescript
type FruitList = string[];
interface IndexedFruitList {
  [index: number]: string;
}

const fruit: FruitList = ["Apple", "Orange"];
const otherFruitList: string[] = fruit; // This works
const indexedFruitList: IndexedFruitList = fruit; // This also work
```

Type aliases don't create unique types, so FruitList is equivalant to string[].

We can do more interesting things with type aliases too, like self-referential types.

```typescript
type StringTree = {
  value: string;
  left?: StringTree;
  right?: StringTree;
};

let myStringTree: StringTree = getStringTree();
myStringTree.value; // string
myStringTree?.left?.right?.left?.value; // string | undefined
```

Interfaces and type aliases are very similar. You might even be wondering why TypeScript has two constructs which perform basically the same function. They have subtle differences which can make the difference when deciding whether to use one over the other. Interfaces support extension using the extends keyword, which allows an Interface to adopt all of the properties of another Interface. Because of this, Interfaces are most useful when you have hierarchies of type annotations, with one extending from another. type aliases, on the other hand, can represent any type, including functions and Interfaces!

Generally, I would use Interfaces for objects, unless they require self-referential typing.

Union Types
Union types represent values that could be one of any number of types.

```typescript
interface CoordinateInterface {
  x: number;
  y: number;
}
type CoordinateTuple = [number, number];

type Coordinate = CoordinateInterface | CoordinateTuple;
```

You'll have to do some type narrowing when using union types.

Union types can be used instead of extending Interfaces (in some circumstances)

```typescript
interface Fruit {
  name: string;
  sweetness: number;
}
interface Vegetable {
  name: string;
  hasSeeds: boolean;
}
type EdibleThing = Fruit | Vegetable;
```

To access hasSeeds or sweetness on EdibleThing, type narrowing will need to be used, for example, with if ('hasSeeds' in obj)...
In this case it might make more sense to use interface extension so as not to repeat 'name' property in Fruit and Vegetable interface definitions.

One of the most valuable uses of Union types is when working with null and undefined when the TSConfig strictNullChecks flag is on. Any time we use an optional property, optional parameter, or optional chaining, TypeScript automatically infers that as a union with undefined. You'll have to type narrow every time for safety.

Intersection Type
Intersection types are one type and another. Intersection types combine the properties and features of two types together.

```typescript
interface Fruit {
  name: string;
  sweetness: number;
}
interface Vegetable {
  name: string;
  hasSeeds: boolean;
}
type EdibleThing = Fruit & Vegetable;
```

An EdibleThing type must have name, sweetness and hasSeeds.

If types cannot be combined in a sensible way, the intersection becomes 'never' type.

Literal types represent exact values of JavaScript primitives.

```typescript
let fruitName: "Apple" = "Apple";
```

This behavior is inferred automatically when we use const to declare our variables.

When dealing with a set of constant string values, a union of literal types can be more convenient than Enums as we will have the same type safety but without the extra hassle of accessing our values on the Enum itself.

```typescript
type Seasons = "spring" | "summer" | "autumn" | "winter";
```

<----Class Definition Notes ---->

<----Class Modifiers Notes ---->

readonly modifier
Adding this modifier to a property makes it so you cannot mutate or make changes to the property whatsoever. You can think of this as the const variable declaration, but for object properties. You can also apply multiple layers of readonly to further limit what can be changed.

```typescript
type readOnlyFruit = { readonly name: string };
const apple: readOnlyFruit = { name: "Apple" };
apple.name = "Banana"; // Type Error: Cannot assign to 'name' because it is a read-only property.

type fruitBasket = {
  readonly fruitList: readonly string[];
};
const basket: fruitBasket = { fruitList: ["Apple"] };
basket.fruitList[0] = "Banana"; // Type Error: Index signature in type 'readonly string[]' only permits reading.
```

TypeScript Operators

Type Indexed Access
Using Type Indexed Access, we can grab any type from any property of any other type.

```typescript
interface Fruit {
  name: string;
  color: string;
  nutrition: { name: string; amount: number }[];
}

type FruitNutritionList = Fruit["nutrition"];
```

We can even grab the type of individual items in an array. We can access a specific index, or we can use the number type to grab the type of every array value.

```typescript
type NutritionFact = Fruit["nutrition"][0];

// Alternatively
type NutritionFact = Fruit["nutrition"][number];
```

Not sure how this 'number' indexing works.

typeof operator
Sometimes we might want to use the type of some runtime value to represent the type of another thing. This could be especially helpful when the type was inferred by TypeScript.

```typescript
let rectangle = { width: 100, height: 200 };
let rectangle2: typeof rectangle; // { width: number; height: number; }
```

keyof operator
It can also be helpful to get the different keys which are present on a type. In reality, it's a union type of string literals, one for each property name.

```typescript
interface Rectangle {
  width: number;
  height: number;
}
type RectangleProperties = keyof Rectangle; // type RectangleProperties = "width" | "height"

let rectangle: Rectangle = { width: 100, height: 200 };
const propertyName: RectangleProperties = "height";
console.log(rectangle[propertyName]); // 200
```

Can combine keyof and typeof:

```typescript
let rectangle = { width: 100, height: 200 };
type RectangleProperties = keyof typeof rectangle; // type RectangleProperties = "width" | "height"
```

const assertion
TypeScript is loose with how it interprets our literal types. For example, when we create an object literal, TypeScript infers that the types of the values are primitives, like string and number, not literal types, like "hello" and "5". (Previously I wrote typescript infers the strictest possibility, but this is wrong.)

Usually, TypeScript infers that the types of the values are primitives, like string and number, not literal types, like "hello" and "5". But if we want to make the properties literal, we can use whats called a const assertion.

An assertion is a notice to the type checker that tells it more about our program so it can check our code properly.

const assertions:

```typescript
let rectangle = { width: 100, height: 100 } as const;

let rectangle2 = { width: 100, height: 100 as const };

let message = "Hello" as const;
```

(if using let with 'as const', there's limited value, right? Doesn't it just become const variable which has literal type value.)

You can turn an array into a tuple by using as const:

```typescript
const assortedItems = ["hello", 5, (fruit: Fruit) => {}] as const;
// const assortedItems: readonly ["hello", 5, (fruit: Fruit) => void]
```

Sometimes you have a single function which accepts different counts of arguments or different argument types. We could easily type something like that with Union types and optional parameters. If we had more than a few arguments or types in our union, it could get messy. That's where function overloading comes in. We overload a function by adding multiple function type signatures above the function definition.

The last function signature is known as the "implementation signature", and has to match the signature of all of the overloads. Since both string and arrays have a length property, I can use an object with a length property, but it's common to use 'any' for the parameters and narrow the type of each parameter in the function implementation.

```typescript
function stringOrArrayLength(input: string): number;
function stringOrArrayLength(input: unknown[]): number;
function stringOrArrayLength(input: { length: number }): number {
  return input.length;
}
```

Callable Interfaces
Since functions in JavaScript are just objects, you can add properties to them. TypeScript lets you annotate these situations with callable interfaces.

```typescript
interface IceCreamSundae {
  (toppings: string[]): void;
  baseIceCream: string;
  chocolateSyrup: number;
  cherry: boolean;
}
```

Usually an object must have all properties of its assigned interface, but since you can't define and add properties on a function at the same time, TypeScript gives leeway and just checks that those extra properties are assigned at some point later:

```typescript
const sundae: IceCreamSundae = (toppings: string[]) => {};
sundae.baseIceCream = "vanilla";
sundae.chocolateSyrup = 5;
sundae.cherry = true;
```

this parameter
TypeScript provides a way for you to apply a type annotation to this so you can have type safety when accessing this.

```typescript
interface IceCreamSundae {
  baseIceCream: string;
  chocolateSyrup: number;
  cherry: boolean;
}
const hotFudgeSundae = {
  baseIceCream: "vanilla",
  chocolateSyrup: 5,
  cherry: true,
  eat(this: IceCreamSundae) {
    if (this.cherry) {
      console.log("Mmmm. Tasty.");
    } else {
      console.log("Could be better.");
    }
  },
};

hotFudgeSundae.eat(); // 'Mmmm. Tasty.'
```

Type Guards
What do you do when you have an unknown type and you want to use it in a meaningful way? What about a Union of several types? To do so safely requires us adding some runtime checks which prove to the TypeScript type checker that the value has a specific type. We call these runtime checks "type guards". We can create type guards using any kind of conditional - if statements, switch statements, ternaries, and a few others. We put some kind of check against the value's type inside the if statement's condition. Then, inside the block, our value now has the type we matched it against.

```typescript
function sayAlexsNameLoud(name: unknown) {
  if (name === "Alex") {
    // name is now definitely "Alex"
    console.log(`Hey, ${name.toUpperCase()}`); // "Hey, ALEX"
  }
}

function sayNameLoud(name: unknown) {
  if (typeof name === "string") {
    // name is now definitely a string
    console.log(`Hey, ${name.toUpperCase()}`);
  }
}

function calculateScore(score: number | string) {
  switch (typeof score) {
    case "string":
      return parseInt(score) + 10;
      break;
    case "number":
      return score + 10;
      break;
    default:
      throw new Error("Invalid type for score");
  }
}

function combineList(list: unknown): any {
  if (Array.isArray(list)) {
    list; // (parameter) list: any[]
  }
}

class Fruit {
  constructor(public name: string) {}
  eat() {
    console.log(`Mmm. ${this.name}s.`);
  }
}

function eatFruit(fruit: unknown) {
  if (fruit instanceof Fruit) {
    fruit.eat();
  }
}
```

You can check for array using Array.isArray() but to check items of any array, you'll have to loop over and make sure each is the correct type:

```typescript
if (Array.isArray(list)) {
    // This will filter any items which are not numbers.
    const filteredList: number[] = list.filter((item) => {
      if (typeof item !== "number") return false;
      return true;
    });

    // This will transform any items into numbers, and turn `NaN`s into 0
    const mappedList: number[] = list.map((item) => {
      const numberValue = parseFloat(item);
      if (isNaN(numberValue)) return 0;
      return numberValue;
    });
```

Objects are a little trickier to narrow, since they could have any combination of properties and types. The in operator can be used to determine whether a property exists on an object. We can then use the typeof operator to determine that property's type.

The in operator only works to narrow union types (?), so we can't use it with unknown. Instead, we'll have to use another special type that comes with TypeScript: object.

```typescript
interface Person {
  name: string;
}
function sayNameLoud(person: object | Person) {
  if ("name" in person) {
    console.log(`Hey, ${person.name.toUpperCase()}`);
  }
}
```

When would a function have parameter types as ('object | Person')? Doesn't make sense to me. Why wouldn't we just enforce it to be Person? If it's coming from network request or something, then it would be unknown. I suppose if we made it so it takes all sorts of objects and we want to narrow to see if it's Person, in which case the above is checking for that. That must be it - question is how do you check if an object is of a certain interface or type. Using 'in' operator is a good way, however, type safety is lost after that check. See:

```typescript
interface Person {
  name: string;
  age: number;
}
function sayNameLoud(person: object | Person) {
  if ("age" in person) {
    console.log(`Hey, ${person.name.toUpperCase()}`);
  }
}

sayNameLoud({ age: 27 });
```

In the above, typescript won't throw an error. Also might not throw error if age is assumed to be string. Must check for EVERY property and then check each property's type since there's no definitive way to get TypeScript to check against Person interface if 'object' is part of union type. (if there was an instanceof equivalent for interface definitions then problem would be solved.)

Handling null and undefined
Often, we can't know for certain whether a variable actually has a value or if it is null or undefined. Optional Chaining is a relatively new JavaScript operator which allows you to attempt to access properties on an object whether or not they actually exist. This can be really useful when we want to access deep properties of objects that might not actually exist. We can prepend a question mark to our "dot property access" (.) operator to create the Optional Chaining operator (?.) that lets us safely access any property, even optional or undefined properties. If the property doesn't actually exist or is null or undefined, JavaScript will quietly return undefined for the whole expression.

Nullish Coalescing operator
Works the same as logical OR but only checks if a value is null or undefined.

Non-null Assertion
Sometimes, you just know better than the type checker. If you positively know that a particular value or property is not null or undefined, you can tell the type checker using the Non-null Assertion operator (!.):

```typescript
const messageInputValue = document.getElementById("messageInput")!.value;
messageInputValue; // const messageInputValue: string;
```

Assertion Signatures
To assert to the type checker that a value has a specific type, we just append the keyword as, followed by the type we want to assert. This tells the TypeScript type checker that a certain value is in fact the type we say it is. TypeScript trusts us to know what we're doing. This is a situation where we know more than TypeScript and get to override the behavior of the type checker. Assertion signatures are safer than most methods, since the type checker will verify that the type we are asserting is at least similar to the original type. That keeps us from asserting that one type is a totally incompatible type. The type checker is even smart enough to avoid conversions between interfaces that aren't similar enough.

```typescript
document.querySelector("form")?.addEventListener("submit", (event) => {
  const target = event.currentTarget as
    | (EventTarget & { email: HTMLInputElement })
    | null;
  const email = target.email;
});
```

In the above, we know that the form has an email input that can be accessed with form.email. To make types work here, we are asserting that currentTarget will have an email property using EventTarget & email: HTMLInputElement.

Double Assertion Signatures
We can convince TypeScript that any value of any type has any other type. It all starts by giving a value an assertion that it is unknown, then asserting again.

```typescript
const age = "hello" as unknown as number;
age; // const age: number
```

Doing the above is very dangerous as you can see, you can convince TypeScipt a string is a number. This is the most dangerous way to get around the type system, even more dangerous than any. This can be helpful when you are certain something should be a certain type and TypeScript isn't letting you convert with a single assertion signature. This is especially useful when you are working with interfaces or third-party APIs which expect parameters to be passed as a certain type. We should only convert a value's type to unknown if there is no other solution. It's much safer for us to convert to a type that is common between the two different types.

```typescript
function buttonEventListener(
  event: string,
  listener: any,
  element: HTMLButtonElement
) {
  element.addEventListener(event, listener);
}

const anchor = document.createElement("a");
buttonEventListener("click", () => console.log("Mouse clicked"), anchor);
// Type Error: Argument of type 'HTMLAnchorElement' is not assignable to parameter of type 'HTMLButtonElement'.

buttonEventListener(
  "click",
  () => console.log("Mouse moved"),
  anchor as HTMLElement as HTMLButtonElement
);
// no error
```

In the above example we are forcing TypeScript to see anchor as HTMLButtonElement because we know that won't be a problem. Double assertion works as long as the second assertion type is a subset type of the first assertion.

TypeScript uses structural typing - it focuses on the shape of objects to determine whether two types are compatible. Two types with the same structure are treated as equivalent and values that match can be assigned to both. Even if different ways of describing structures are used but the structures are the same, then they're still the same:

```typescript
class AppleClass {
  type: "Apple";
  name: string;
}
interface AppleInterface {
  type: "Apple";
  name: string;
}
type AppleType = {
  type: "Apple";
  name: string;
};
```

All three are equivalent.

Other programming languages, like Java and C# use a nominal type system. The word "nominal" refers to the name of the thing, which means if I were to create two classes with an identical structure, but different names, those two classes would be considered different. We can emulate nominal typing by adding a unique property to our types with a string literal type. This practice is called "branding", or "tagging". This makes it possible to discriminate between types that may have the same structure, but different purposes.

You can create 'branded primitives' using assertion signatures.

```typescript
type USD = number & { _brand: "USD" };
type EUR = number & { _brand: "EUR" };

let income: USD = 10; // Type Error: Type 'number' is not assignable to type 'USD'.

let VAT = 10 as EUR;

function convertToUSD(input: EUR): USD {
  return (input * 1.18) as USD;
}

let VATInUSD = convertToUSD(VAT); // let VATInUSD = USD;
```

Discriminating Union
As we've seen, you cannot type narrow to determine if an object is of a certain Interface. But this can be very helpful or necessary. One strategy is using Discriminating Unions, which is done by adding unique identifier in the form of an extra literal property:

```typescript
interface Fruit {
  type: "fruit";
  name: string;
  color: string;
  juice: () => void;
}

interface Vegetable {
  type: "vegetable";
  name: string;
  color: string;
  steam: () => void;
}

type EdibleThing = Fruit | Vegetable;

function prepareEdibleThing(food: EdibleThing) {
  if (food.type === "fruit") {
    food.juice();
  }
  if (food.type === "vegetable") {
    food.steam();
  }
}
```

TypeScript will be able to detect the discriminating union property and if you narrow based on that, you can use the other properties properly.

User Defined Type Guards

Type Predicate Function
If a complicated check is required to determine a type, a user defined type guard can be used. One scenario this can be helpful is when we have interfaces from third party libraries so we can't use a discriminating union, but we still need to tell them apart.

A Type Predicate Function is a function that takes at least one argument, returns a boolean, and has a type predicate return signature:

```typescript
function isFruit(maybeFruit: Fruit | Vegetable): maybeFruit is Fruit {
  if ('sweetness' in maybeFruit && ...) return true;
  return false;
}

function isVegetable(food: any): food is Vegetable {
  if ('color' in food) return true;
  return false;
}

function isFruit(maybeFruit: unknown): maybeFruit is Fruit {
  if (
    typeof maybeFruit === "object" &&
    maybeFruit !== null &&
    "name" in maybeFruit &&
    "sweetness" in maybeFruit &&
    "color" in maybeFruit
  ) {
    return true;
  }
  return false;
}
```

If we wanted to, we could use user defined type guard functions to trick the TypeScript compiler that any value is any other type. So be careful.

Assertion Functions
Assertion functions are another kind of type guard that use a different method to tell the type checker what type a value has. Assertion functions allow you to throw errors to assert a type condition.

There are two kinds of assertion return signatures. The first type asserts that a boolean argument is true. We have to pass in an argument, and then we can add asserts <parameter name> as our function return signature:

```typescript
function assertTrue(condition: boolean): asserts condition {
  if (!condition) {
    throw new Error();
  }
}
const maybeFruitName: unknown = "Banana";
assertTrue(typeof maybeFruitName === "string");
maybeFruitName; // const maybeFruitName: string;
```

The second type of assertion fuciton allows to assert that if the fuciton does not throw an error, a function argument is a specific type:

```typescript
function assertIsFruit(food: any): asserts food is Fruit {
  if (!("sweetness" in food)) throw new Error();
}
```

Seems like difference between this and the type predicate function is defining based on error or not.

Both Assertion Functions and Type Predicates allow us to write functions which assert or prove something about types of the values which are passed into them.

To recap Assertion Functions - there are two kinds - one that asserts that a function argument is a specific type, otherwise it throws an error, and one that asserts that a boolean argument is true, otherwise it throws an error.

# Generics

Generics are like functions, but for types. A type goes in, a different type comes out. They make it possible to reuse and transform our types into different types, instead of having to rewrite different definitions for each type.

## Generic Functions

Generics represent a type that won't be defined until the type is used in our code. We can use generics with functions. When we originally write the generic function, we might not know the type the generics represent, but when we use our function elsewhere in our code, the generics' types can be inferred from the usage. This makes it possible to write functions that accept different kinds of types but have the same implementation for each type.

These generic parameters are like variables.

Add angle brackets after function name and pass a 'variable' that will represent a type.

```typescript
function getFirstItem<T>(list: T[]): T {
  return list[0];
}
```

## Generic Types

Generics aren't just for functions. In fact, we can create generic Interfaces, Classes, and type aliases.

```typescript
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};

type StringTree = Tree<string>;
```

## Generic Constraints and Defaults

We can do that by applying a type constraint. This tells TypeScript that our generic can't just be any type. It has to match the constraints we supply. To do this, we'll use the extends keyword in our generic definition.

```typescript
class FruitBasket<T extends Fruit = Apple> {
  constructor(public fruits: T[] = []) {}
  add(fruit: T) {
    console.log("Added " + fruit.name); // can access properties of Fruit
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}

function getObjectProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

# Thinking in Types

The TypeScript compiler takes our code and turns it into javascript code:

```typescript
interface Fruit {
  isFruit: true;
  name: string;
}
class FruitBasket<T extends Fruit> {
  constructor(public fruits: T[] = []) {}
  add(fruit: T) {
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}
```

becomes:

```javascript
class FruitBasket {
  constructor(fruits = []) {
    this.fruits = fruits;
  }
  add(fruit) {
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}
```

TypeScript also lets us compile our code into a format that is just types. This file is often shipped with the compiled JavaScript in case an upstream developer needs access to the type definitions for their IDE or something. We can easily see this by pasting the code into TypeScript's Playground (https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgGJQK7DMg3gKGWWAGd0swAuMTCAbkORDgFsJKSbQBzBgX3wIANnBIk0mbACFRAawhgAPABVkEAB6QQAE3HlsAPjyMEAexCdMCMKagAKAA4YARkOAJkMSWBKVkygG0AXWQAXmRggEo8ASI4bW07Lwo-ZWiCIiIwAAtSADpk7BI8pxJspO9IhiJYtTgwO3TGLNziwp8S0wdG6uQBPiA) and choosing the ".d.ts" tab on the output panel.

.d.ts of above typescript:

```typescript
interface Fruit {
  isFruit: true;
  name: string;
}
declare class FruitBasket<T extends Fruit> {
  fruits: T[];
  constructor(fruits?: T[]);
  add(fruit: T): void;
  eat(): void;
}
```

It might not be apparent, but type systems can be thought of in very similar terms to our runtime systems. Granted, it's like an upside-down version of our runtime code, but a lot of the same principles are there.

Type aliases are like variables. They are named buckets that we can put any type in, just like a regular variable.
TypeScript operators, like typeof, keyof, |, and &, let us combine, manipulate, and modify our types, like +, \*, and -.
Type narrowing lets us determine an exact type from several possibilities.
Generics work like functions. Generic types accept a type as a parameter and operate on it to transform it into a different type.

## Mapped Types

TypeScript provides us with a special type signature which we can use to perform transforms on interfaces and object types. Mapped types allow us to take an existing type, pull out each property individually, and perform a transformation on that property's type. You can think of is an an array .map() function, but for the properties on an object type. The syntax is [.. in ..]: .. within an object type.

```typescript
interface Fruit {
  name: string;
  color: string;
  sweetness: number;
}

type Properties<T> = keyof T;

type FruitProperties = Properties<Fruit>; // type FruitProperties = "name" | "color" | "sweetness"

type Values<T> = T[Properties<T>];
type FruitValues = Values<Fruit>; // type FruitValues = string | number

type ObjectIdentity<T> = {
  [P in Properties<T>]: T[P];
};

type FruitCopy = ObjectIdentity<Fruit>;
// type FruitCopy = {
//     name: string;
//     color: string;
//     sweetness: number;
// }

// will cause error because there is built-in Readonly type already
// but this is for demonstration
type Readonly<T> = {
  readonly [P in Properties<T>]: T[P];
};

type ReadonlyFruit = Readonly<Fruit>;
// type ReadonlyFruit = {
//     readonly name: string;
//     readonly color: string;
//     readonly sweetness: number;
// }

type UnReadonly<T> = {
  -readonly [P in Properties<T>]: T[P];
};

type WritableFruit = UnReadonly<ReadonlyFruit>;
// type WritableFruit = {
//     name: string;
//     color: string;
//     sweetness: number;
// }

type Required<T> = {
  [P in Properties<T>]-?: T[P];
};

interface OptionalFruit {
  name: string;
  color?: string;
  sweetness?: number;
}
type RequiredFruit = Required<OptionalFruit>;
// type RequiredFruit = = {
//     name: string;
//     color: string;
//     sweetness: number;
// }
```

The syntax P in Properties<T> probably looks familiar. It very closely resembles the syntax for a for .. in loop in JavaScript. Just like for .. in creates a new variable for each iteration of the loop, we're creating a new type for each property in our list.

TypeScript actually ships with a number of transformer types, which it calls Utility Types. These utility types are so helpful that TypeScript bundles a number of them which we can use wherever we want.

## Conditional Types

Conditional types let us provide a type constraint. If the constraint passes, we get one type; otherwise, we get a different type.

We can create a conditional type by using the ternary syntax, with a question mark after the type constraint, followed by the "true" result, followed by a colon (:), and then the "false" result.

```typescript
type LiteralIsStringType<T> = T extends string ? string : never;

type AppleLiteralType = LiteralIsStringType<AppleLiteral>; // type AppleLiteralType = string;
type NeverLiteralType = LiteralIsStringType<0>; // type NeverLiteralType = never;
```

When a conditional type is applied to a union, it is distributed. Conditional types are distributive, which means that when we pass in a Union type, the type constraint isn't checked against the entire Union that is passed in; rather the constraint is checked against each member of the Union individually.

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type NonNullString = NonNullable<string | null | undefined>;
// becomes
// NonNullable<string> | NonNullable<null> | NonNullable<undefined>
// which is
// string | never | never
// which simplifies to
// string
```

Any time you have a Union of a type and never, the never is removed from the Union automatically. This exclusionary quality of the never type really comes in handy when working with conditional types and type Unions.

Aside: It seems 'extend' has multiple functions. When working with Interfaces, it creates a new Interface. When working with Conditionals, it asks whether one type is a subtype or subset of another type. T extends 'string' ? string : never - asks if the generic T is assignable to a string, then give us a string type, etc.

Confirmed: T extends U is asking if T is a subset of U. Not the other way around. 'abc' is a subset of `string`, but `string` type is not a subset of the literal string 'abc'.

When T and U is a union, in T extends U, the way it works is you iterate for every element in T, not U.

```typescript
type Exclude<T, U> = T extends U ? never : T;

type FavoriteLetters = "a" | "l" | "e" | "x";
type Vowels = "a" | "e" | "i" | "o" | "u" | "y";

type NonFavoriteVowels = Exclude<Vowels, FavoriteLetters>;
// type NonFavoriteVowels = "i" | "o" | "u" | "y"
```

Conditional Type Inference
The `infer` keyword returns a segment that we ask to infer from conditional. We can think of the infer keyword as unwrapping whatever thing we use it with in our conditional type.

```typescript
type AnyFunction = (...args: any) => any;
type ReturnType<T extends AnyFunction> = T extends (...args: any) => infer R
  ? R
  : any;

// We have to use `typeof` to extract the type signature of this function.
type ParseIntReturn = ReturnType<typeof Number.parseInt>; // type ParseIntReturn = number

// ParseIntReturn is already a type, so we can directly access its properties without using `typeof`
type ToStringReturn = ReturnType<ParseIntReturn["toString"]>; // type ToStringReturn = string

type UnwrapArray<T> = T extends (infer R)[] ? R : T;

type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
```

Utility Types
Here are how the utility types provided by TypeScript are implemented:

```typescript
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type Required<T> = {
  [K in keyof T]-?: T[K];
};

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Record<K extends string | number | symbol, T> = {
  [_ in K]: T;
};

type Exclude<T, U> = T extends U ? never : T;

type Extract<T, U> = T extends U ? T : never;

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type NonNullable<T> = T extends null | undefined ? never : T;

type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
```

Modules
You can export types normally alongside normal values:

```typescript
export class Fruit {}
export type FruitBasketType = Fruit[];

export const fruit: FruitBasket = [];
```

We can then import them normally, or if we don't want to execute code from file we are importing from, we can use the type prefix:

```typescript
import { FruitBasketType, Fruit } from "./fruitBasket.ts";
// or
import type { FruitBasketType } from "./fruitBasket.ts";
```

Remember that classes are both a type and a value! Might make things interesting.

# Modules

The esModuleInterop tsconfig.json flag allows you to import commonjs and esmodules. There are some pitfalls when dealing with this. TypeScript also has its own import/export constructs. The general advice - avoid TypeScript's own import/export syntax. Use esmodules for writing TypeScript code. Keep the esModuleInterop flag to true and if you have to import from commonjs code, use commonjs syntax.

But output files should usually be commonjs. When compiling for the browser, you'll be using a bundler so that will take care of modules.

## Namespaces

Before ES Modules was standardized and included in JavaScript, TypeScript had its own form of code organization called namespaces. Each namespace that you create exist in the global environment, similar to IIFE modules. That makes it so you can access anything in any namespace from any other file in your project, but makes it difficult to examine what dependencies a specific file has.

You might find some situations where using namespaces could be valuable, such as creating type definitions for a third-party module.

Namespaces are blocks which we create with the namespace keyword. Anything inside the block is considered part of the namespace. If we want something inside our namespace to be accessible outside our namespace, we use the export keyword to its declaration. We can export types and values from within namespaces.

```typescript
namespace FruitBasket {
  export abstract class Fruit {
    name!: string;
  }
  export type FruitBasket = Fruit[];

  const fruitBasket: FruitBasket = [];

  export function addToBasket(fruit: Fruit) {
    fruitBasket.push(fruit);
  }
  export function eat() {
    return fruitBasket.pop();
  }
  export function nextFruit() {
    return fruitBasket[fruitBasket.length - 1];
  }
}
```

Namespaces are implemented as IIFEs when they are compiled to JavaScript:

```javascript
var FruitBasket;
(function (FruitBasket) {
  class Fruit {}
  FruitBasket.Fruit = Fruit;
  const fruitBasket = [];
  function addToBasket(fruit) {
    fruitBasket.push(fruit);
  }
  FruitBasket.addToBasket = addToBasket;
  function eat() {
    return fruitBasket.pop();
  }
  FruitBasket.eat = eat;
  function nextFruit() {
    return fruitBasket[fruitBasket.length - 1];
  }
  FruitBasket.nextFruit = nextFruit;
})(FruitBasket || (FruitBasket = {}));
```

While we can access namespaces globally, the order that these files are loaded and executed makes a differences. Fortunately, we can create a dependency graph of our files using a reference tag. This is a comment added to the top of our TypeScript file that tells TypeScript that we're referencing another file. Notice below that when making the comment, we use three slashes (/) instead of two.

```typescript
// ./fruitBasket.ts
namespace FruitBasket {
  export abstract class Fruit {
    name!: string;
  }
  export type FruitBasket = Fruit[];

  const fruitBasket: FruitBasket = [];
}

// ./fruitBasketFunctions.ts

/// <reference path="fruitBasket.ts">
namespace FruitBasket {
  export function addToBasket(fruit: Fruit) {
    fruitBasket.push(fruit);
  }
  export function eat() {
    return fruitBasket.pop();
  }
  export function nextFruit() {
    return fruitBasket[fruitBasket.length - 1];
  }
}
```

(OK, so namespaces and reference tags were used before esmodules to organize and group code. But nowadays you still see namespaces in .d.ts files. Why is that? Does it mean the source code of the package was written using namespaces? Is there additional value in using namespaces for the sake of organizing the .d.ts files?)

# Type Declarations

## Built-in Type Definitions

TypeScript comes with its own set of definitions for every feature in JavaScript, called the standard library. You can use type definitions from the standard library too. For example, all of TypeScript's utility types are included in the standard library, so we don't have to define them ourselves.

The default configuration for TypeScript includes definitions for ES5 and DOM APIs, such as those that exist in web browsers like document.getElementById and HTMLElement. We can configure which standard library packages we want to include by modifying the `lib` property of our tsconfig.json file. This property takes an array of strings representing different features or packs of features.

For example, if we wanted to use ES2020 features, we could use put lib: ["ES2020"] in our tsconfig.json. This would automatically include all of the previous versions, so we don't have to list them all. In fact, we can put any version of JavaScript, from ES2015 to the current version, or use ESNext to get a continually updated set of new JavaScript features. If we manually change the lib property of tsconfig.json, we'll have to include the DOM API standard library too. We just need to include it in the array, like so: `lib: ["ESNext","DOM"]`. We can also choose specific standard library components, such as `ES2015.Proxy` to get support for proxy syntax. However, it's usually best to choose the specific version of JavaScript we want to have the type definitions for.

TypeScript doesn't ship with support for Node.js APIs, but they can be added. (by installing @types/node ?)

## Outputting TypeScript Definitions

There is an option which you can use to have TypeScript output separate files, called declaration files, which you can include with your JavaScript library. Then, any TypeScript users who use your library will still be able take advantage of the types.

If we set the `declaration` property in our tsconfig.json file to true, TypeScript will output a type declaration file for all of our files alongside the files themselves. Here's what a TypeScript definition file looks like:

```typescript
// index.d.ts
declare class Fruit {
  name: string;
  color?: string;
  constructor(name: string, color?: string);
}
export declare class FruitBasket {
  #private;
  static maxFruit: number;
  addFruit(fruit: Fruit): void;
  eat(): void;
}
export {};
```

The new declare keyword. This only exists in TypeScript, and is used any time we are creating a type definition for something that exists in a JavaScript file.

Once we've generated our declaration files, we can include them in our library bundle by adding a "types" field to our package.json file. It should include a path to the type definition file relative to where package.json is located:

```json
// package.json
{
  //...
  "types": "./build/index.d.ts"
}
```

One of the best ways to understand how TypeScript interprets type declaration files is by looking at the output of compiled TypeScript. You can easily do this by pasting TypeScript code into the TypeScript Playground and choosing the '.D.TS' tab on the output window.

## Definitely Typed and @types/ packages

Third-party packages are a big part of why working with JavaScript is so great. NPM has a huge ecosystem of packages which we can use in Node.js projects or on the web. While some of these packages are written in TypeScript and include TypeScript definitions, most of them are still written in JavaScript. That means we can't use them in our project without decreasing our type safety, since we might accidentally use an API wrong, or might use a function return value in the wrong way. In addition, we won't be able to take advantage of the IDE enhancements which TypeScript provides, which can be really helpful for figuring out how to use an API.

Fortunately, there is a huge repository of user-submitted types for over 7,000 NPM packages. It's called Definitely Typed, and it publishes its type definitions on NPM using the @types/ namespace. Adding types to our project is as easy as running npm install.

One of the most used type definitions is the one for Node.js. If you want to use any of Node.js's APIs, like fs or path, you'll want to install these type definitions.
```bash`
npm install --save-dev @types/node

````
If we have strict mode on, or if we are using the noImplicitAny flag in tsconfig.json, TypeScript will warn you if a package doesn't have type definitions when you try to import it.

Some packages don't have definitions on DefinitelyTyped, which means running npm install @types/somePackage will fail. In that case, you will have to create the type definition yourself.

In the event that you need to use a package with no type definitions, you can create a simple shim which will let TypeScript recognize the module, but make the entire module `any`. This works by creating a .d.ts file inside your project folder. The file needs to have the same name as the package you are importing. Then, inside that file, use the declare keyword to tell typescript about your module:
```typescript
//fruit-basket.d.ts
declare module "fruit-basket";
````

Basically, 'declare module' is required because this file is not in node_modules/@types folder. So the connection is not automatically made.

`declare` is used to tell the compiler "this thing (usually a variable) exists already, and therefore can be referenced by other code, also there is no need to compile this statement into any JavaScript". (`declare` can be used to amend or extend definitions, see below.) (I'm guessing its for when you have a variable that is pre determinined to be a certain type and we want to say so in the definition file. If I'm right, you dont declare types only variables or values.)

(`declare` seems to be optional, maybe only used when necessary as it's implied for everything anyway.)

Sometimes we might need to override a built in type definition, such as adding something to the window global. We can do this with a special type declaration (`declare` keyword) that extends the global namespace. This declaration should happen inside our application code, not in a .d.ts file:

```typescript
declare global {
  interface Window {
    fruitList: Fruit[];
  }
}
```

The interface that we define on the Window object (note the capital W) will be combined with the built in definition, and then anywhere in our code that we reference window.fruitList, we'll have the correct type definitions.

(There seems to be a difference between 'definition' and 'declaration' in typescript. Definition is a type definition, whereas declaration declares that this variable exists and it has this type definition.)

Type Definition files mirror the actual package files they represent. So if 5 things are exported by the index.js of a package, 5 type definitions will be exported from the corresponding index.d.ts file in node_modules/@types/package_name/index.d.ts. The IDE and typescript can then associate the correct type definitions with imported values from packages.

## Typing an NPM module manually

If an npm package does not come with types and does not have a DefinitelyTyped types package, we can make type definition files ourselves. Third party packages come in all kinds of shapes and sizes, which means we have to adapt our type definition for each type of package.

Modular libraries are packages that have no reference to `global` or `window` and no top-level var or function declarations, and they will use import or require. For modular libraries, we need to create a folder at node_modules/@types/package_name. Then we have to create a file structure that mirrors the package file structure, with each file having just type definitions for the associated file's exports.

Anything that's exported by a package file needs to have its associated type definition. For example:

```typescript
// @types/fruit-basket/index.d.ts
export class Apple {
  name: string;
}

export interface FruitBasket {
  add(fruit: Apple): void;
}

export function eatFruit(fruitBasket: FruitBasket, time: number): void;

export const fruitBasket: FruitBasket;
export let timeToEat: number;
```

Notice that not just types, but variables are being exported because those exact variables are exported by the package, so we need to export the same variable with just its type so that VSCode and TypeScript can make the association.

A UMD package is a package that in addition to using exports, it also attaches things to the global object. To accomodate a UMD package, to provide a global value, you can do that with a single line:

```typescript
// @types/fruit-basket/index.d.ts
export class Apple {
  name: string;
}

export interface FruitBasket {
  add(fruit: Apple): void;
}

export function eatFruit(fruitBasket: FruitBasket, time: number): void;

export const fruitBasket: FruitBasket;
export let timeToEat: number;

export as namespace fruitBasketLib;
```

If instead of defining type declaration files for a package in node_modules, we want to define in our project directory, we can do so. We can add a .d.ts file anywhere in our project directory with the following:

```typescript
declare module "fruit-basket";
```

There will be no type safety, but import error will be gone. However, you can add types:

```typescript
declare module "fruit-basket" {
  // import { Apple } from "fruit-apple";
  // export { Apple } from "fruit-apple";

  export class Apple {
    name: string;
  }

  export interface FruitBasket {
    add(fruit: Apple): void;
    eat(time: number): void;
  }

  const fruitBasket: FruitBasket;
  export default fruitBasket;

  export function eatFruit(fruitBasket: FruitBasket, time: number): void;

  export let timeToEat: number;
}
```

The above would be the same as exporting these types from node_modules/@types/fruit-basket/index.d.ts file. If needing to use 'export default' and potentially default exporting a function then things get a bit complicated and you can check docs for more information on using `declare module`. You'll have to utilize namespaces within the declare module block and make the function a default export but also a namespace itself.

There are 3 types of libraries -

- module - things are exported for consumer to use
- umd - things are exported and attached to global object
- global - things are just added to global object

For the last library type, global, we can add types by using 'declare namespace'. Remember, namespaces are Typescript's way of creating (and therefore referencing) global objects. If our library is truly global, we can just wrap all of our definitions in a namespace:

```typescript
// fruit-basket.d.ts
declare namespace fruitBasketLib {
  class Apple {
    name: string;
  }

  interface FruitBasket {
    add(fruit: Apple): void;
    eat(time: number): void;
  }

  const timeToEat: number;
  const fruitBasket: FruitBasket;

  function eatFruit(fruitBasket: FruitBasket, time: number): void;
}
```

You can then reference types from elsewhere using references:

```typescript
// fruit-basket.d.ts
// the below reference indicates dependency and allows using fruitApple global
/// <reference types="fruit-apple" />

declare namespace fruitBasketLib {
  interface FruitBasket {
    add(fruit: fruitApple.Apple): void; // notice using fruitApple from global
    eat(time: number): void;
  }

  const timeToEat: number;
  const fruitBasket: FruitBasket;

  function eatFruit(fruitBasket: FruitBasket, time: number): void;
}
```

(Why does the above not have exports? It's in a .d.ts file. By the way, whats the difference of namespace keyword being in .d.ts vs .ts. In .ts it creates an IIFE. In .d.ts it probably corresponds to and signifies that the exported types will be on the namespace as property right? Does namespace in .d.ts mean namespace keyword was used in the source code?)

`declare module` tells TypeScript that the module exists.
`declare namespace` tells TypeScript of something added to the global object.

# Advanced TypeScript Configuration

tsconfig.json options

```json
{
  "compilerOptions": {},
  "files": ["fruitBasket.ts", "fruit/apple.ts", "fruit/banana.ts"]
}
```

The files property is a list of paths, relative to the tsconfig.json file, to all of the files in your project. If your project is small and doesn't necessarily include any dependencies from node_modules, using the files can make TypeScript speedier. Not used often.

```json
{
  "compilerOptions": {},
  "include": ["src/**/*"]
}
```

By default, TypeScript will compile all .ts and .tsx files in the same directory as the tsconfig.json file. We can selectively include the files that we need using the include.
One thing to remember is that include only tells TypeScript where to start. If one of our files imports a module from a file that is not matched by our include list, that file will still be compiled and type checked by TypeScript. (The exception is node_modules.)

```json
{
  "compilerOptions": {},
  "exclude": ["node_modules/**/*", "scripts/**/*"]
}
```

When using include, you'll also want to explicitly exclude some directories and files. Exclude folders and files that included files might reach out to. For example, if code in src/ directory reaches outside the src/ directory, you might want to exclude what it reaches out to.

A combination of include and exclude tells the IDE what is considered the source code and helps create the space of autocompletion suggestions.

incremental
When incremental is turned on, TypeScript will keep a cache of the compilation results for itself when it runs a full compile. On subsequent compiles, it will use this cache to skip parts that don't need to be compiled again, making the overall build faster.

sourceMap
Source maps are generated files which provide a map from compiled output, such as the .js files which TypeScript generates, back to the original .ts source, without having to include the source files themselves. They can be included in build output and shipped to production environments without affecting the end-user's experience since source maps are only loaded when the user opens the developer tools. Turning on source maps will increase your build time, but could be helpful when trying to debug your code in a production environment. Turning on source maps is as easy as activating the sourceMap flag. You can also include your source maps inline with your JavaScript files using the inlineSourceMap option, but that will increase the size of your output files and could degrade your user experience. You should only use that option if the server that you are serving your code on doesn't support source maps.

checkJs
If your project doesn't have any .js files, or if you specifically don't want TypeScript to check your .js files, you can turn off the checkJs option. This will still let TypeScript compile your JavaScript files, but it won't give you any warnings or errors if your JavaScript has any type errors. This is helpful when incrementally migrating a JavaScript project to TypeScript.

jsx
If you are working with React or another library that uses JSX, you can configure how TypeScript compiles the JSX syntax. If you are working with React, you'll want to set this setting to react; otherwise, you can set it to preserve, which will keep the JSX syntax in place without changing it. Remember, whenever you are working with JSX, the JSX code has to be inside a .tsx file.

jsxFactory
You can also use the jsxFactory option to change which function is used to compile JSX Elements. By default, it uses React.createElement, but if we were working with a Preact project, we would want to use preact.h.

outDir
This lets you specify where your compiled source will be placed relative to the tsconfig.json file. This includes source maps and declaration files, if applicable.

```json
{
  "compilerOptions": {
    "outDir": "build"
  }
}
```

noEmit
This option tells the TypeScript compiler to only type check our code, not output any files.

`target` field
The `lib` property lets us specify what version of JavaScript our source files can use. Configuring it determines what language globals you have access to (Array, Object, Math, Proxy, etc). Also responsible for what environment-dependent globals you should have access to.

The 'target' field on the otherhand lets us specify what version of JavaScript our output files should be. Supporting more recent JavaScript versions, like ES2019, might decrease the size of your bundle and make your program more efficient, since you don't have to include large polyfills and JavaScript engines can optimize newer syntax to make it faster than older syntax.

In short, pick a lib value that covers what code you'll be writing, and pick a target value that covers your code output. You want your target to be as recent as possible, while still supporting all the people that need to run your code.

## Module Resolution

When TypeScript is compiling your project, it will start with the files in your files or includes list, but as we've found, it doesn't stop there. If one of the TypeScript files imports any other modules, TypeScript will load in that file as well. If it can't find the file, it will throw an error and the compilation will fail.

TypeScript knows how to find files based what you put in your import statement using a process called Module Resolution. TypeScript is configured to use a module resolution strategy that is very similar to the one Node.js uses, so if you've used Node.js, Webpack, or something similar, it should be familiar. TypeScript lets you configure the module resolution strategy, which can be useful depending on the size of your project and how you've structured it.

One important thing to remember is that you can write TypeScript code that is not completely compliant with ES Modules syntax. In ES Modules, you have to specify the extension of the file you are importing, and you can't import a folder. If you want to take advantage of TypeScript's nuanced module resolution system, you can leave the extension off files that you are importing. (However, this is not good to do because even though TypeScript will understand what file to get, the compiled code will not work! But it might be fine if you're feeding the output to Webpack for further compilation and bundling.)

When changing TypeScript module resolution settings, make sure everything else is configured to consume your outputted code properly. If you change the way module resolution works and adjust the imports in your code accordingly, those adjustments to your code will transfer into the output. Loading the compiled code in a browser or Node.js will make those environments look for modules exactly where the import statement says they are. If the browser or Node.js can't find the files because the files aren't in the right place, there will be an error. If we're working with ES Modules in a browser environment, we have to rearrange our directory structure on our static file server to match the import statements. (Using ES Modules natively is not very common right now.)

baseUrl
baseUrl is a setting that changes where non-relative imports are resolved from. They don't affect relative modules at all!

paths
TypeScript gives us one more tool we can use to control our non-relative imports. The paths setting lets us specify specific patterns to match specific modules. These patterns accept wildcard (\*) characters, so they can be pretty flexible.

When using the paths setting, we need to specify a baseUrl, since all of the paths we list will be relative to the baseUrl.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@fruit/*": ["src/fruit/*"]
    }
  }
}
```

The paths setting can really upset the way ES Modules work in browsers. For one thing, all ES Module imports have to begin with a /, ./ or ../. Fortunately we can simulate that behavior with paths - "/_": ["src/_"]. (Currently not using any setup that actually uses es modules natively in browsers right?)

Paths can do one more theing - connect imports from a CDN to a type declaration file.

```typescript
import { h } from "https://unpkg.com/preact@10.5.2/dist/preact.min.js";
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "/*": ["src/*"],
      "https://unpkg.com/preact@10.5.2/dist/preact.min.js": [
        "node_modules/preact/src/index.d.ts"
      ]
    }
  }
}
```

# Projects

Project References allow us to create multiple configs for different parts of our project while still treating the project as a whole. This gives us all the benefits - fast compilation and type checking, more control over the build output, and better separation between the different parts of the project.

The tools for using Project References are the option 'composite': true and "references".

```json
// /shared/tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "composite": true,
    "outDir": "./build"
  }
}

// /client/tsconfig.json
{
  "compilerOptions": {
    // ...
    "baseUrl": "./",
    "paths": {
      "shared/*": ["../shared/*"]
    }
  },
  "include": ["./src/**/*"],
  "references": [{ "path": "../shared" }]
}
```

Check documentation and online examples for how to use 'composite' and 'references' properties to be able to use multiple different tsconfig.json configs within one project.

# Webpack

There are two options we have when configuring to work with TypeScript. We can either use a TypeScript loader, or we can use the Babel loader and configure Babel to compile TypeScript code.

## ts-loader

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "isolatedModules": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

We'll specify the entry point for our project, as well as the output bundle location. We'll tell Webpack to resolve .ts and .tsx files in addition to .js. Then we'll configure a module loader that finds any files with a .ts or .tsx extension and load them with the ts-loader module loader. This will invoke TypeScript with our tsconfig.json options for every TypeScript file that Webpack finds.

It's common for Webpack projects to import non-code assets, like images and CSS. TypeScript doesn't know how to deal with these types of files, so we need to create a simple type declaration file to handle these. Here is a declaration for .png files:

```typescript
// custom.d.ts
declare module "*.png" {
  const content: any;
  export default content;
}
```

This tells TypeScript that any files that end in ".png" export an any value, which lets us use it however we need without TypeScript complaining. If we knew exactly how Webpack transformed the file type, we could adjust the type definition. For example, if .png files were imported as URL strings, we could change the type to string.

Handling baseUrl and paths
If you use the baseUrl or paths settings in tsconfig.json (for creating @/ shortcuts for example), you can easily configure Webpack to pick up these settings. Installing and enabling tsconfig-paths-webpack-plugin will make your module resolution settings just work with Webpack.

```javascript
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: "./path/to/tsconfig.json" })]
  }
  ...
}
```

Notice that the plugin is placed in the resolve.plugins section of the configuration. This is intentional.

## babel

Babel is a compiler itself. When using with TypeScript the strategy should be to let Babel handle compilation and use TypeScript just to check types. For that reason, we can ignore many of the settings for tsconfig.json. The most important setting is noEmit, since that will stop TypeScript from compiling our code.

```json
{
  "compilerOptions": {
    "strict": true,
    "isolatedModules": true, // provides warnings that make it easier for external build tools like babel (isolatedModules makes sure that global variables do not exit)
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "include": ["src/**/*"]
}
```

Use @babel/preset-typescript to strip typescript from code so that babel can further compile.

````json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
``
Compile your code with `npx babel src --extensions ".ts" -d build` and type check your code with `tsc`.



## ES Module Web Development without bundler
ES Modules makes it easier than ever to write modern JavaScript that depends on other modules without needing a bundler. Here is a possible setup:

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "esnext",
    "sourceMap": true,
    "outDir": "public",
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "https://cdn.skypack.dev/date-fns@^2.14.0'": [
        "node_modules/date-fns/typings.d.ts"
      ]
    },
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
````

When writing our program, we need to make sure that we include the file extension on our import statements.

## Node Development

Since version 13, Node.js has had limited support for ES Modules. However, CommonJS is much more common (pun intended) in the Node ecosystem, so we'll have our compiler output CommonJS-compliant files. We can still use ES Modules in our source code, though, especially if we have esModuleInterop turned on. We'll also want to change our target field to whatever version of JavaScript our version of Node.js supports. We'll use the isolatedModules flag to make sure each of our files is a module. Finally, we use resolveJsonModule to allow us to import .json files as modules (as Node.js already supports).

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "outDir": "build",
    "strict": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

We also will want to install @types/node for node APIs.

If using `baseUrl` and `paths` in tsconfig.json, you should install 'tsconfig-paths' package and use it to read the tsconfig.json file. You'll need to include the tsconfig.json in production. Its usage:

```bash
npm install --save-dev tsconfig-paths
# then
node -r tsconfig-paths/register build/index.js
# or
npx ts-node-dev -r tsconfig-paths/register src/index.ts
```

## Library Development

If you are making a library that you intend to release on NPM, there are a lot of pieces to consider. How can you make your package work with multiple module systems? How can you make sure the production bundle is as small as possible? What about adding tests and linting? TSDX is a Zero-config CLI for TypeScript package development. That means you only need to run one command, and it will configure everything for you with great defaults and the ability to adjust any setting as needed. To create a new TypeScript library, just run:

```bash
npx tsdx create myLib
```

# Advanced Transformation Types

## Recursive Conditional Types

Recursive conditional types are new in TypeScript 4.1. Before, you would have to write out incredibly complicated types with strange hacks. Now, recursive conditional types are built in with automatic depth limiting. If TypeScript executes the same recursive conditional too many times, it will give you a warning.

Example of recursive conditional type:

```typescript
type UnwrapArrayRecursive<T> = T extends (infer R)[]
  ? UnwrapArrayRecursive<R>
  : T;

function deepFlatten<T extends any[]>(array: T): UnwrapArrayRecursive<T>[] {
  return array.flat(Infinity);
}
const flattened = deepFlatten([
  [1, 2],
  [3, 4, ["a", "b"]],
]); // const flatten: (string | number)[]
```

## Template Literal Types

Starting with TypeScript 4.1, you can interpolate string literals together. If you pass a union of strings to a template literal type, it will output a union of every combination. This is a really powerul aspect of template literal types.

```typescript
type Seasons = "spring" | "summer" | "autumn" | "winter";
const seasonsStartDate = {
  springStart: "March, 20",
  summerStart: "June, 20",
  autumnStart: "September, 22",
  winterStart: "December, 21",
};
type SeasonsStartDate = {
  [P in `${Seasons}Start`]: string;
};
// type SeasonsStartDate = {
//     springStart: string;
//     summerStart: string;
//     autumnStart: string;
//     winterStart: string;
// }
```

TypeScript automatically created an interpolation with every member of our union.

Another example:

```typescript
type VerticalPositions = "top" | "middle" | "bottom";
type HorizontalPositions = "left" | "center" | "right";

type Positions = `${VerticalPositions}-${HorizontalPositions}`;
// "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right"
```

TypeScript creates string literals for every permutation of strings based on the unions that are passed in.

Sometimes, we want a string that represents many values, but matches a specific pattern. We can create a type which does this using non-literal types in our type interpolation:

```typescript
type StringDashString = `${string}-${string}`;

const correctPosition: StringDashString = "forward-backward";
const incorrectPosition: StringDashString = "Some other value";
// Type Error: Type '"Some other value"' is not assignable to type '`${string}-${string}`'.
```

With conditional types, we could hook into the type inference system to unwrap our types. We can do the same thing with template literal types. By placing the infer keyword inside a template tag, we can parse a literal value. This example uses a conditional type to pull literal values out of a string and put them into a tuple.

```typescript
type MatchTuplePair<S extends string> = S extends `[${infer A},${infer B}]`
  ? [A, B]
  : unknown;

type StringTuple = MatchTuplePair<`[hello,world]`>; // type StringTuple = ["hello", "world"]
```

Using recursive conditionals, we can create more complicated utility types that work with template literal types. For example, if we had a literal type that has whitespace on either side, we could create a trim type to remove that whitespace:

```typescript
type WhitespaceString = "      hi there     ";

type Trim<S extends string> = S extends ` ${infer T}`
  ? Trim<T>
  : S extends `${infer T} `
  ? Trim<T>
  : S;

type TrimmedString = Trim<WhitespaceString>; // type TrimmedString: "hi there"
```

## Mapped Types Key Remapping

Until recently, TypeScript didn't support renaming keys when creating a mapped type. You can create new property names with template literal types, but we need a way to connect the new property name with the old property's type.

```typescript
type SetFunctions<T> = {
  [P in keyof T as `set${string & P}`]: (
    callback: (currentValue: T[P]) => T[P]
  ) => void;
};
```

## Intrinsic Utility Types

TypeScript now ships with a number of intrinsic utility types. These are utilities which aren't represented by type annotations; rather, the type system modifies the type internally. Currently, there are only four intrinsic utility types, and they all relate to changing the casing of literal types - Capitalize (capitalizes first character), Uppercase (capitalizes whole string), Lowercase(lowercases whole string), Uncapitalize(uncapitalizes first char).

```typescript
type SetFunctions<T> = {
  [P in keyof T as `set${string & Capitalize<P>}`]: (callback: (currentValue: T[P]) => T[P]) => void;
}
//...
fruit.setName(...) // 🙌
```

## TSDocs

There are standards that exist which let us add comments above our function and variable declarations to document them in greater detail. The TSDoc standard is based on the existing JSDoc standard, but is entirely designed to work with TypeScript.

ll TSDoc annotations start with a multi-line comment with two asterisks, like /\*\* \*/. Adding a single description is as easy as adding text inside that comment block.

```typescript
/** A tasty, sweet plant part that you can eat */
type Fruit = {
  name: string;
  color: string;
  sweetness: number;
};
```

Now the description will show up when hovering over anywhere Fruit is used.

The @param tag lets us define properties on interfaces and object types as well as parameters for functions.

```typescript
/**
 * A tasty, sweet plant part that you can eat
 *
 * @param name - The botanical name of the fruit
 * @param color - The color name of the fruit
 * @param sweetness - Between 1 and 100, with 100 being the most sweet
 */
type Fruit = {
  name: string;
  color: string;
  sweetness: number;
};
```

The @returns tag lets us add a description to our return value

```typescript
/**
 * Eat a fruit
 *
 * @param fruit - The fruit that we are going to eat
 *
 * @returns The waste from eating the fruit, such as an apple core.
 */
function eatFruit(fruit: Fruit): FruitWaste {
  // ...
}
```

You can add annotations to interfaces, classes, class methods, objects, even individual variables.

```typescript
/**
 * The price in USD
 */
const price = 27.5;
```

There are also tags which can add even more information to your documentation. For example, @deprecated can tell users that a specific property or function shouldn't be used anymore; @example can be used to write out a full example of how to use a function; @throws lets you provide documentation about what kinds of errors a function will throw. All possible tags are available at https://tsdoc.org/.

There are documentation generators which can read all of the type definitions and TSDoc comments and convert them into a complete documentation page. The tool typedoc can be installed and used to create HTML documentation:

```bash
npm install --save-dev typedoc
npx typedoc
```

You can install 'eslint-plugin-tsdoc' to add rules that make sure tsdoc comments conform to tsdoc specification.

## Migrating from JavaScript to TypeScript

You'll want to start with a permissive tsconfig.json file.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "esnext"],
    "allowJs": true, // allows js files in its compilationn
    "checkJs": false, // type checking of js files
    "skipLibCheck": true,
    "strict": false, // strict type checking flags like noImplicitAny and strictNullChecks, etc
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "downlevelIteration": true
  }
}
```

Once tsconfig.json is set up like the above, you should be able to run TypeScript and get back no errors, since it isn't checking for errors in your JavaScript code. Change the file extension of one file from .js to .ts (or .tsx for React components), and you'll start seeing the errors in that single file. Fix the errors, save the file, and move on to the next.

At some point, when all or most of your files have been converted, you might want to increase the strictness of your type checking by turning on some of the strict settings you disabled earlier. This will take a bit more effort to fix the issues, but you'll also gain confidence that your program won't throw type errors at runtime.

## Experimental Decorators

Decorators are an experimental feature of TypeScript that allow you to add extra powers to ES2015 classes. The implementation which TypeScript uses is different from the TC39 proposal (currently in Stage 2), so using decorators is discouraged. Decorators are functions that we can attach to classes and their members. These decorator functions get different parts of the class as their parameters, and allow us to do something with that class (or class member). Decorators allow us to reuse logic between multiple classes without resorting to class inheritance.

Since this is an experimental feature, you need to turn on the experimentalDecorators option in tsconfig.json.

Class Decorator: We can attach a function to a class which will be called when that class is instantiated.

```typescript
type Instantiable = new (...args: any[]) => any;

function makeEdible<TClass extends Instantiable>(target: TClass) {
  return class Edible extends target {
    // shouldn't it be target extends Edible?
    edible = true;
  };
}

@makeEdible
class Fruit {
  constructor(public name: string) {}
}

console.log(new Fruit("Apple")); // class Fruit {name:"Apple", edible:true}
```

Property Decorators: We can use property decorators to add metadata or logic to a class property. This is done using property descriptors (JavaScript feature).

```typescript
function Uppercase(target: any, key: string) {
  let val = target[key];

  const getter = () => {
    return val;
  };
  const setter = (newVal: string) => {
    val = newVal.toUpperCase();
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Fruit {
  @Uppercase
  public name = "Apple";
  constructor(name: string) {
    this.name = name;
  }
}

console.log(new Fruit("Apple")); // class Fruit {name:"APPLE"}
```

Method Decorators: Method decorators work similarly to property decorators; they are a function where the first parameter is the class prototype and the second is the method name. The third property is the property descriptor for the method which can be modified directly.

```typescript
function Loggable(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Executed ${key} method.`);
    return original.apply(this, args);
  };
  return descriptor;
}

class Fruit {
  public name = "Apple";
  constructor(name: string) {
    this.name = name;
  }
  @Loggable
  sayName() {
    console.log(`${this.name} Fruit`);
  }
}
```

# ---------===== React With TypeScript =====---------

React doesn't ship with TypeScript declarations; we have to install them from DefinitelyTyped:

```bash
npm i -DE @types/react @types/react-dom
```

tsconfig.json's jsx option set to 'react-jsx' allows you to use JSX without importing React, alongside some other benefits:

````json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}

But for development you want to create another tsconfig file and extend the production one:
```json
// tsconfig.dev.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsxdev"
  }
}
````

The most important thing to remember when using React with TypeScript is that file extensions matter. TypeScript has some syntax which is incompatible with JSX syntax. To get around these conflicts, TypeScript only recognizes JSX inside of files that end with .tsx; it also disables the conflicting TypeScript syntax in those files.

## React Class Components (for legacy codebases)

The React.Component class is a generic class, which means we can pass a TypeScript Interface as a type parameter which represents the props which the component accepts.

By default, React.Component uses a Readonly empty object as the type of this.state. We can easily override that by assigning the state class property an interface as its type.

The React.Component constructor takes a second type parameter to represent our state interface.

It's important to note that the generic parameters apply types to this.props, this.state, and this.setState, but not to the parameters of class lifecycle methods.

```typescript
class Counter extends React.Component<CounterProps, CounterState> {
  // ...
  increment = () => {
    this.setState(({ count }) => ({
      count: count - 1,
    }));
  };
  decrement = () => {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
  };
  // ...
}
```

## Function Components

Similar to adding type annotations to regular functions.

React components all have to return either a React Element or null.

```typescript
import { ReactElement } from "react";

function HelloWorld(): ReactElement | null {
  return <div>Hello world!</div>; // probbaby needs some conditional logic to return null in some case
}
```

Props can be annotated by giving our function parameters an annotation.

```typescript
function Message({ message }: { message: string }): ReactElement {
  return <div>A message: {message}</div>;
}
```

If you want to explicitly annotate a function as a React component, you can use the built-in React.FunctionComponent type, or it's alias React.FC. This type includes annotations for common static properties that are added to function components, like displayName, propTypes, and defaultProps. It also includes the children prop in your prop definition, and has an explicit return type.

We can use FC by annotating a variable that we assign an arrow function component. FC and FunctionComponent are generic types which accept a type representing the props.

```typescript
import { FC } from "react";

const Message: FC<{ message: string }> = ({
  // includes children prop in the prop def so you don't need to add (probably like ths - 'yourType & { children: ReactElement | null }')
  message,
  children,
}) => {
  return (
    <div>
      A message: {message}
      <br />
      Children: {children}
    </div>
  );
};
```

(If you are planning on doing anything unique or special with the type of children, you likely want to annotate it directly; in that case, skip using React.FC.)

## Components and Element Types

Reminder of Basic React -

- React Element - React elements are the building blocks of React applications. One might confuse elements with a more widely known concept of “components”. An element describes what you want to see on the screen. React elements are immutable.

```javascript
const element = <h1>Hello, world</h1>;
```

Typically, elements are not used directly, but get returned from components.

- React Component - React components are small, reusable pieces of code that return a React element to be rendered to the page. The simplest version of React component is a plain JavaScript function that returns a React element:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Components can also be ES6 classes:

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Components can be broken down into distinct pieces of functionality and used within other components. Components can return other components, arrays, strings and numbers (important part when thinking about typescript - React components can return other things beyond React Elements and its still valid. TypeScript might assume you are making a mistake if your component does not always return a ReactElement.). A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component. Component names should also always start with a capital letter (<Wrapper/> not <wrapper/>).

JSX code is transformed into React.createElement calls. React.createElement has the return type React.Element (usually named as ReactElement when importing). However, components can return something other than ReactElements like strings or array of numbers etc. If we were to try putting one of these components inside JSX block, Typescript would give us a warning:

```javascript
function RenderString() {
  return "Hello World!";
}

function App() {
  return (
    <div>
      <RenderString />
      {/* Type Error: 'RenderString' cannot be used as a JSX component.
      Its return type 'string' is not a valid JSX element */}
    </div>
  );
}
```

TypeScript thinks you might be making a mistake using a function that returns a string within JSX. (React types could have accomodated allowing strings and arrays being returned as valid, but remember- the point of typescript is to help you catch mistakes you might make. So writers of React types wanted you to intentionally handle cases when you return non ReactElements in JSX. This way when you actually DO make a mistake by trying to use a function that's not meant to be a React Component, you'll get warned.)

So, to let TypeScript know that we are indeed using React properly and that React allows us to have components that return strings, we have a few options. We can use a double type assertion with unknown ((x as unknown) as ReactElement), but that should only be used when we have no other better options, to give a bit more type safety we can do ((x as ReactNode) as ReactElement). ReactNode is a type built into React's type definition that represents anything that can be used as a child of a React component, including strings and arrays.

```typescript
import { ReactNode, ReactElement } from "react";

function RenderString() {
  return "Hello world!" as ReactNode as ReactElement;
}
```

Another way to handle the above:

```typescript
import { Fragment } from "react";

function RenderString() {
  return <Fragment>Hello world!</Fragment>;
}
```

A React component is a class or function which returns a ReactElement (It cannot return ReactNode ?). Components define what props you can pass and what state can be held by the component, but the component itself doesn't hold state. It's just a template. Since you can call a function or instantiate a class multiple times, React components are intended to be used multiple times. These are components:

```javascript
class Hello extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
const World = () => {
  return <div>World</div>;
};
```

These two component definitions, a class component and a function component, can be represented with a single type built into React's type definitions: React.ComponentType<P>, with P being the props of the component. Unsurprisingly, the type defintion for React.ComponentType<P> is just a union of a class component and function component defintion.

```typescript
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
```

One use case of ComponentType: When you accept another component as a prop, and render that component as an element in returned JSX:

```typescript
function RenderComponent({ Comp }: { Comp: ComponentType }) {
  return (
    <div>
      <Comp />
    </div>
  );
}
```

(ReactElements do not need to encased in < /> when passed around in variables and used in JSX, because it is not a component function, it is DOM elements, the < /> is assumed.) Difference between ComponentType and ReactElement, is that ComponentType is a function that will return ReactElements or other components. Shorthand: React Elements are the DOM nodes, components are the functions. (Question: When a component returns another component, is the return type ReactElement? Probably not right?)

ReactNode represents anything that can be used as a child of a React component, so strings, null, arrays, ReactElements, etc.

ReactElements are the lowest level DOM nodes - <div></div>. They are not <Comp /> or () => <div></div>. In the latter, that is a arrow function Component that returns a ReactElement type. The entire function itself is a component and if we store it in a variable we need to call it by placing it when < /> if used within JSX, or we can just call it as a normal function.

## Intrinsic Elements

In React, intrinsic elements represent the basic units that React uses to render a component with a particular renderer. In ReactDOM, these are div, span, and all the other HTML elements. (So the individual DOM elements in ReactElements I believe.)

(Note: Intrinsic elements don't really exist in React Native; instead, you import components directly from React Native that are translated to the native elements. This lesson only focuses on React DOM.)

The type declarations for React come with special types which can help us work with these intrinsic elements. The React type declarations add a namespace called JSX to the global. We can access this anywhere that we are using React. This is where the type declarations for intrinsic elements comes from.

```typescript
const MyButton = () => {
  return <button>Click Me!</button>;
};
```

if you were to hover over the <button> element in this example using VS Code, you would see that it is an instance of `JSX.IntrinsicElements.button` which defines the props for that element. For example, <button> can have a type and disabled prop, but not a width prop.

```typescript
interface IntrinsicElements {
  // ...
  button: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  // ...
}
interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  autoFocus?: boolean;
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  type?: "submit" | "reset" | "button";
  value?: string | string[] | number;
}
interface DOMAttributes<T> {
  // ...
  onClick?: MouseEventHandler<T>;
  // ...
}
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
type EventHandler<E extends SyntheticEvent> = (e: E) => void;
interface MouseEvent<T = Element, E = NativeMouseEvent>
  extends SyntheticEvent<T, E> {
  // ...
  button: number;
  buttons: number;
  clientX: number;
  clientY: number;
  // ...
}
```

If we dig into `JSX.IntrinsicElements.button` we'll encounter some of the above types as we go down deeper. HTMLButtonElement is a type that represents a button in the DOM. It's part of the standard library that is built into TypeScript. React is using to to say "This intrinsic element renders as this DOM node." If we were to attach a ref to this element, HTMLButtonElement is the type that would be assigned to ref.current. we have the React.ButtonHTMLAttributes generic. This interface extends the HTMLAttributes interface, and creates prop definitions for all of the attributes that are unique to buttons. HTMLAttributes has prop definitions for all of the attributes which are common among HTML elements.

React uses a synthetic event system which is an abstraction on top of the regular DOM event system. This helps with cross-browser compatibility and makes it so events all behave consistently. These types here model that synthetic event system.

SyntheticEvent is another interface with the properties common of all events, like e.preventDefault(). MouseEvent extends SyntheticEvent and adds a few more properties which are exclusive of MouseEvents.

(BTW, despite all the digging, we still don't get to the point where T (which is HTMLButtonElement) is used (after being passed into ButtonHTMLAttributes), presumbaly its used even deeper down in some type conditional to assess the types of the parameters of event handlers passed to the intrinsic element.)

Recap: The type definitions for Intrinsic Elements are built into the React type declarations, and include all of the DOM elements that you could possibly use. Some intrinsic elements, like <button> have unique prop definitions which match the attributes you can assign to an actual HTMLButtonElement. All intrinsic elements have common properties, including event handlers. And, depending on which event handler you are using, the event parameter might have some extra properties, like how onClick's event parameter has properties for which mouse button did the clicking.

## Hooks

## useState

There are two hooks for storing state: useState and useReducer

useState is simple. The state value's type is the type of whatever you pass in to the useState function. Sometimes you need to tell useState exactly what type your state should be, such as when you don't pass in an initial value, or you want to use a union type. useState is a generic function, so we can pass the type in before we call the function.

```typescript
// will be inferred in these two cases
const [stringState, setStringState] = useState("Hello!");
const [numberState, setNumberState] = useState(5);

// This can only be undefined
const [uninitializedState, setUninitializedState] = useState();

// This can be a string or undefined
const [stringState, setStringState] = useState<string | undefined>();

// Its more common to initialize with null
const [maybeNumberState, setMaybeNumberState] = useState<string | null>(null);
```

When working with component composition, it's common to pass the state and state setter function as props. If we only ever intend to pass a literal value to our state setter function, then annotating that function is easy - pass in value as a parameter; return void; This can be done because this simple definition extends (in the conditional sense) the builtin type definition of setState.

```typescript
interface UpstreamComponentProps {
  stringState: string;
  setStringState: (newValue: string) => void;
}
```

This gets a bit tricker if we need to use an update function with our state setter. In this case, it's probably easier to use the built-in type which React uses. The built-in type definition of setState is `Dispatch<SetStateAction<string>>`.

```typescript
interface UpstreamComponentProps {
  stringState: string;
  setStringState: Dispatch<SetStateAction<string>>;
  maybeNumberState: number | null;
  setMaybeNumberState: Dispatch<SetStateAction<number | null>>;
}
```

## useReducer

If you need a bit more control over how your state is updated, or if you have several pieces of state that update in concert, useReducer can really come in handy.

Quick recap on reducers. We have state, which is usually an object (although it can be any type). useReducer gives us our state and a dispatch function. We call dispatch with an action, which is also usually an object. Dispatch then calls our reducer function with our current state and our action. The results of that reducer function become our new state. If you define all these parts and they are typed properly, you don't need to add type annotations to the useReducer hook.

```typescript
const [state, dispatch] = useReducer(shoppingReducer, []);
```

The type of dispatch is `Dispatch<ShoppingListAction>`. ShoppingListAction will be something like:

```typescript
export type ShoppingListAction =
  | AddAction
  | EditAction
  | DeleteAction
  | CompleteAction;
```

When we pass the dispatch function around it will be easy to annotate it, just import the Action type (ShoppingListAction) and pass into Dispatch, `Dispatch<ShoppingListAction>`.

Epiphany: What can be noticed here is that the type for setState function of useState is `Dispatch<SetStateAction<string>>`. This means useState is actually implemented internally using useReducer. That means useReducer is actually more at the fundamental level.
State in React is internally handled using the reducer pattern we used to use at the application level.

To annotate reducer function with potential generic type you need to pass down, as well as example of using useReducer:

```typescript
interface DadJokeResponse {
  id: string;
  joke: string;
  status: 200;
}
const JOKE_URL = "https://icanhazdadjoke.com/";

interface FetchState<T> {
  state: "loading" | "error" | "data";
  data: T | null;
  error: Error | null;
}

interface LoadingAction {
  type: "loading";
}

interface ErrorAction {
  type: "error";
  error: Error;
}

interface SuccessAction<T> {
  type: "data";
  data: T;
}

type FetchActions<T> = LoadingAction | ErrorAction | SuccessAction<T>;

function fetchReducer<T>(
  state: FetchState<T>,
  action: FetchActions<T>
): FetchState<T> {
  //  Implement your reducer here.
  switch (action.type) {
    case "loading":
      return {
        state: "loading",
        data: null,
        error: null,
      };
    case "data":
      return {
        state: "data",
        data: action.data,
        error: null,
      };
    case "error":
      return {
        state: "error",
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
  // return state;
}

function useFetch<T>(url: string) {
  const [state, dispatch] = React.useReducer<
    React.Reducer<FetchState<T>, FetchActions<T>>
  >(fetchReducer, {
    state: "loading",
    data: null,
    error: null,
  });

  React.useEffect(() => {
    async function performFetch() {
      try {
        const response = await fetch(url, {
          headers: {
            accept: "application/json",
          },
        });
        const data = await response.json();
        dispatch({ type: "data", data });
      } catch (error) {
        dispatch({ type: "error", error: error as Error });
      }
    }
    dispatch({ type: "loading" });
    performFetch();
  }, [url]);
  return state;
}

export default function App() {
  const { state, data, error } = useFetch<DadJokeResponse>(JOKE_URL);
  if (state === "loading") return <div>Loading...</div>;
  if (state === "error") return <div>Error: {error?.message}</div>;
  if (state === "data") return <div>{data?.joke}</div>;
  throw new Error("This should never happen.");
}
```

## useEffect, useMemo, useCallback

Type Definition for useEffect:

```typescript
function useEffect(effect: EffectCallback, deps?: DependencyList): void;

type DependencyList = ReadonlyArray<any>;
type EffectCallback = () => void | (() => void | undefined);
```

The only thing to keep in mind when using useEffect in TypeScript is that the EffectCallback has to return void, which means it returns nothing, or a cleanup function. If we do return a cleanup function, it can't return anything either.

useLayoutEffect has the exact same type definition as useEffect.

Type Definition for useMemo:

```typescript
function useMemo<T>(factory: () => T, deps: DependencyList): T;
```

Usually T can be inferred and so you usually don't have to manually annotate.

Dependency list for useMemo is not optional, otherwise the value returned from useMemo will be referentially different between renders, so it becomes pointless without a dependency array.

Type Definition for useCallback:

```typescript
function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T;
```

Mostly the same as useMemo except the generic type that represents the return value is constrained to be a function. That's because useCallback is specifically used for memoizing functions.

# Typing Props

Props is always an object. This makes it really easy to annotate props with a type, since we can use any of the usual techniques for objects when writing our props annotation.

Example of props being annotated:

```typescript
interface FruitBasketProps {
  // This could be a string, but I'm using a union of strings
  // to constrain what the possible values are.
  fruitType: "apple" | "orange" | "banana";
  maxFruit: number;
  disabled?: boolean;
  fruit: string[];
}

const FruitBasket = (props: FruitBasketProps) => {
  // ...
};
```

Although it is not common to do, we can use ReadOnly<Props> to make sure people don't mutate props, but its assumed people know not to mutate props anyway.

```typescript
const FruitBasket = (props: ReadOnly<FruitBasketProps>) => {
  // ...
};
```

Indexable types can also be used, for example, to allow any props but its value must be a certain type:

```typescript
interface ListerProps {
  [key: string]: string;
}

const Lister = (props) => {
  return (
    <ul>
      {/* List all of the keys and values in the props object. */}
      {Object.entries(props).map(([key, value]) => (
        <li key={key}>
          <strong>{key}</strong>: {value}
        </li>
      ))}
    </ul>
  );
};

<Lister item1="Hello" item2="World" />;
```

## Event Handlers

Event handlers are built into each intrinsic element. In fact, in React DOM, only intrinsic elements fire events.

If we are passing an event handler directly to an intrinsic element, TypeScript will infer the type of the function's parameters for us.

```typescript
<button onClick={(event) => {
  // (parameter) event: React.MouseEvent<HTMLButtonElement, MouseEvent>
}}>
```

TypeScript automatically knows that onClick is a mouse event and that its target is an HTMLButtonElement. This is the easiest way to use event handlers.

If you need to write out your event handler function separately, such as if we are passing the event handler as a prop, you have a few options for adding the appropriate types.
Option 1 (mouseover the onChange prop to figure out the type for the parameter):

```typescript
const App = () => {
  function handleOnChange(event: React.FormEvent<HTMLInputElement>):void {
    // ...
  }

  return <input type="text" onChange={handleOnChange}>
}
```

Alternatively, you can use one of the many "EventHandler" types that are built into React's type definition, including ChangeEventHandler, MouseEventHandler, and PointerEventHandler. These are generic types that accept an element type and output a function type matching whatever event handler you need.
Option 2:

```typescript
const App = () => {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // ...
  }

  return <input type="text" onChange={handleOnChange}>
}
```

We don't have to annotate anything inside the function itself; our ChangeEventHandler type takes care of that for us.
(Usually thats the case - when we use a function type definition to annotate the variable we don't need to annotate the parameters and return in the function defintion. )

## Adding extra properties with Intersection types on Events

Sometimes the properties specified by the built-in event type are not complete. For instance any properties that will be dynamically added to the event object based on the specific usage. One example is form submit events. When using a form, their inputs get added as properties on the form object, with the key being the input's 'name'. But event.target.inputName won't be availabe on the builtin type because obviously typescript can't know what inputs you'll be making. So we have to tell typescript about this.

```typescript
interface FormFields {
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const target = event.target as typeof event.target & FormFields;

  const formValues = {
    email: target.email.value,
    message: target.message.value,
  };

  // Do whatever with the form values.
}

// form
<form onSubmit={handleSubmit}>
  <div>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
  </div>
  <div>
    <label>
      Message:
      <textarea name="message"></textarea>
    </label>
  </div>
</form>;
```

## Using same event handler with two different kinds of elements

We might want to use the same event handler with two different kinds of elements, such as buttons and anchor tags. In this case, it might make more sense to assert that our target is a union of the two element types.

```typescript
function handleClick(
  event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
) {
  const target = event.target as HTMLButtonElement | HTMLAnchorElement;

  // If target has an `href` property, we know it's an anchor
  if ("href" in target) {
    target.href;
  }
}
```

All of the properties common to both buttons and anchors would be available without needing to type narrow; if we need to access a property unique to one of the element types, we can use the 'in' operator to check for the existence of the property to narrow our type.

## Advanced Props Patterns

For the children prop, the most flexible type is ReactNode, because children can be a lot more things than just React.Element. You should use the ReactNode type for children unless you intentionally want to constrain the type.

A Render Prop is technically any prop that accepts a function that returns a ReactNode. It's used for sharing code between React Components. React Hooks solve the same problems that render props solve, so it's not used very often.

If needed, render props can be annotated easily as such:

```typescript
import { ReactNode, FC } from "react";

interface MousePositions {
  x: number;
  y: number;
}
interface MousePositionProps {
  render?: (MousePositions) => ReactNode;
  children?: (MousePositions) => ReactNode;
}
const MousePosition: FC<MousePositionProps> = ({ render, children }) => {
  // ...
};
```

The style prop lets us adjust the CSS of a specific intrinsic element. To annotate the style prop, you can use the React.CSSProperties type.

```typescript
import { CSSProperties } from "react";

const Button: React.FC<{ style: CSSProperties }> = ({ style, children }) => {
  return <button style={style}>{children}</button>;
};
```

You can use TypeScript's utility types to make it so only certain style attributes can be assigned through props.

```typescript
type AllowedStyles = "display" | "backgroundColor";

const Button: React.FC<{
  style: Pick<CSSProperties, AllowedStyles>;
}> = ({ style, children }) => {
  return <button style={style}>{children}</button>;
};

<Button style={{ fontSize: 24 }}>Click me!</Button>;
// Type Error: Type '{ fontSize: number; }' is not assignable to type 'Pick<CSSProperties, AllowedStyles>'
```

### Mirroring HTML Elements

Many times we create simple wrappers over intrinsic elements and we want to pass props down to them.

React gives us a utility type which extracts the props from an HTML element. Often, if we are creating a component that wraps an intrinsic element, we likely want to add more props that control some special behavior. We can use type widening to combine our props with the intrinsic props by either creating an intersection type with & or creating an interface that extends the element's props.

```typescript
import { ComponentPropsWithoutRef } from "react";

// Option 1
type ButtonProps = {
  variant?: "primary" | "success" | "warning" | "danger";
} & ComponentPropsWithoutRef<"button">;

// Option 2
interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "success" | "warning" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className = "",
  ...props
}) => {
  return <button {...props} className={`${className} ${variant}`} />;
};
```

ComponentPropsWithoutRef can be used with non-intrinsic components as well. When using with intrinsic components we pass it a string (see above). If we want to pull the props out of a non-intrinsic component, we just have to pass the type of that component in.

```typescript
type ButtonComponentProps = ComponentPropsWithoutRef<typeof Button>;
// type ButtonComponentProps = {
//   variant?: "primary" | "success" | "warning" | "danger";
//   etc. etc...
// }
```

If we wanted to restrict which props the consumer of our component can assign to this element, we could also use TypeScripts utility types to Pick or Omit properties from the ButtonProps interface.

If we need the ref prop as well we can use ComponentPropsWithRef.

### PropTypes

TypeScript is a static type checker. It looks at all of your code to make sure the types of your properties, variables, and parameters all match up. Since it checks your code without running it, it can give you hints and warnings in your IDE which can help you as you write your code.

PropTypes, on the other hand, does runtime checking of the types of your props. In development mode, PropTypes prints a warning to the console if you use the wrong type for one of your props. It can't help you as you write your code, though; only when you run it.

Using PropTypes isn't as important when we're working in TypeScript, since TypeScript can validate our props as we write our code using more sophisticated type checking.

## Context

React Context lets you pass values from a parent component to any of the children components. The way context is implemented makes it possible for the type definition of your context to be available wherever you consume it.

We create context using React.createContext. We have to pass in a default value. This is the value the context provides if it is accessed outside of a <Context.Provider> tree. The type of the entire context is inferred from the type of the default value.

Often, the default value is null or undefined. If we need to set an explicit type for our context, we can pass it in as a generic type.

```typescript
import { createContext, Dispatch, SetStateAction } from "react";

interface ThemeModeInterface {
  mode: "dark" | "light";
  setMode: Dispatch<SetStateAction<"dark" | "light">>;
}

const ThemeModeContext = createContext<ThemeModeInterface | null>(null);
```

This has one substantial downside - we have to check if the value of our context is null every time we access it, regardless of whether we are in a Provider tree or not. We can use assertions to deal with this, but one good strategy is by creating a prescribed method of accessing that particular context that checks if the context valueis actually set.

```typescript
export const useThemeMode = () => {
  const themeMode = useContext(ThemeModeContext);
  if (!themeMode?.mode)
    throw new Error(
      "The theme mode context was accessed outside of the provider tree"
    );
  return themeMode;
};
```

This is typically paired with a component that manages the context value and returns the context provider.

```typescript
export const ThemeModeProvider: FC = ({ children }) => {
  const [mode, setMode] = useState<"dark" | "light">("light");

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <ThemeModeContext.Provider value={contextValue}>
      {children}
    </ThemeModeContext.Provider>
  );
};
```

By only exporting the provider and the useThemeMode hook, we can ensure that an error will be thrown if the context is accessed outside of the provider tree. If we access our context using the useContext hook or the ThemeModeContext.Consumer render prop, TypeScript will give us the type which we initialized our context with. (There are deviations from this when talking about class components and this.context)

## Refs

Function components use refs both for holding references to DOM elements and storing bits of data that don't affect rendering.

If we're collecting a reference to a DOM element, we likely want to initialize our ref with null. we need to provide a type to the generic that represents the type of the ref's contents. With strictNullChecks turned on, we'll also need to verify that our ref is set before we try to access it.

```typescript
const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return <input type="text" ref={inputRef} onClick={onClick}>
}
```

Using refs for any other value, such as arbitrary strings or objects, works exactly the same as useState - whatever we pass as the initial value of the ref determines the type of the ref. If we need to override that, we can provide a type to the generic.

```typescript
const App = () => {
  const stringRef = useRef("Hello there!");
  const maybeNumberRef = useRef<number | null>(null);
  // ...
};
```

Ref forwarding lets you pass a ref through a component to one of its children. It's not very common. When we wrap our component in React.forwardRef, we have to provide generic types for the ref itself and for the wrapped component's props. The ref type is defined first, followed by the props, even though the function parameters put the ref after the props.

```typescript
import { forwardRef } from "react";
const Input = forwardRef<HTMLInputElement, { disabled?: boolean }>(
  ({ disabled }, ref) => {
    return <input ref={ref} disabled={disabled} />;
  }
);
```

## Example of Adding typescript to (older v16) react webpack project

1. npm i -D typescript @types/react @types/react-dom @babel/preset-typescript
2. npx tsc --init
   'target' doesn't matter because using webpack, 'module' as 'commonjs' is fine
   'lib' can be set to "DOM","ESNext" so we can use dom apis and new javascript syntax
   'jsx' can be 'react' (should be 'react-jsx' if using newer versions of react)
   'noEmit' to true because we're using webpack
   'isolatedModules' to true helps out to make sure we're importing and exporting somethign from every one of our files
   use 'include' and possibly 'exclude' as needed for project
3. in webpack config make changes to specify .ts and .tsx files

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./app/index.tsx", // changed entry to .tsx
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  resolve: {
    // added .ts, .tsx and .json
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      // making sure ts and tsx files go through babel loader
      { test: /\.(js|ts|tsx)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html",
    }),
    new CopyPlugin([{ from: "_redirects" }]),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
```

4. add @babel/preset-typescript to babel

```json
"babel": {
  "presets": [
    "@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
  ]
}
```

5. Choose files that fetch data to turn to typescript first. Annotate function parameters first to the best of your ability given the context, then once done, go through each function to make sure the return is not 'any' by hovering over each function definition. Make assertions about fetched data structures as needed. Use 'unknown' as a placeholder as you make initian type definitions, then you can go back and be more specfic as you understand the context better.

6. As you change files to .ts or .tsx, there will be errors in imports of other files not turned to ts yet. These will go away when those imports are turned to .ts files. Those errors are saying they expect an associated type declaration file since a javascript module is being imported.

7. Some files will not require annotations after changing extension to .ts, as everything will be inferred. For example:

```typescript
import React from "react";

export default function useHover() {
  const [hovering, setHovering] = React.useState(false);

  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);

  return [
    hovering,
    {
      onMouseOut,
      onMouseOver,
    },
  ];
}
```

8. If using styles objects to pass to style prop on intrinsic elements, you can assert they are CSSProperties:
```typescript
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsla(0, 0%, 20%, 0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px",
  } as React.CSSProperties,

  // use undefined instead of null when trying to set empty style prop on intrinsic elements
  style={ language === selected ? { color: "rgb(187, 46, 31)" } : undefined }
```

9. For annotating change handlers, you can use a coule of strategies, one of them is using the event types:
```typescript
const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
  setUsername(event.target.value);

// you dont need to specify submit event? Maybe because you're just use .preventDefault so using a wider type is fine
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  onSubmit(username);
};
```

https://react-typescript-cheatsheet.netlify.app/ - Helpful
