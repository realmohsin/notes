- install tsc globally to compile ts files to js
- after compilation, if the compiled js file is open in editor, ts files will complain that there is duplicate variable definitions, close the compiled files to get rid of ts complaints
- added extensions for autocomplete that override js and ts file autocompletes - settings file has settings to reflect this (figure out if this is better or not)

- numbers, strings, and booleans - the essential types of a programming language that allow programming itself - the foundations of programming

- use type inference heavily - object and array types can be inferred too
- for tuple types, put type inside brackets
- enums are variables that are assigned sequential numbers - interesting thing is when defining enum type, the variables are stored in the type(?) accessed like this - Role.ADMIN

- union types may cause typescript to show errors perhaps because it is saying there are combinations for which errors can happen - usually means a manual runtime check is required (type guards, see below):  if (typeof === 'string') { do this..}

- literal types are specific values
- literal types are used with union types in many use cases - type Severity = 'critical' | 'high' | 'medium' | 'low' | 'unknown'

- function types specify function inputs and output. used for specifying callbacks. (can use basic Function (capitalized here unlike string, boolean, number) but better to specify)

- unknown type - almost the same as any, except will throw error without runtime check

- never type - use in function return if function will always crash script or never return.

- tsc app.ts -w => will recompile whenever the file changes
- tsc --init => creates tsconfig.json => tells typescript everything in this folder should be managed by typescript. running tsc now will compile all ts files found in this folder

- .d.ts files are manifest files that describe all the types you have in a library, usually only made for third party libraries 

- adding ! at the end of an expression tells typescript that you know this value will never be null/undefined. If you don't know, then maybe a good idea to add a runtime check.

- can use typescript to specify to class methods that the method should be called from an instance of the class - method(this: ClassName) {}

- you can mark class properties and methods with private and public prefix -  private means only methods inside class can access those properties (this is typescript only feature). 

- you can add public/private in the constructor function, which adds another shortcut - automatically setting the value for you -

- protected modifier is like private, except allows manipulation from inherited classes (while preserving protection from outside the class)

class Department {
   private readonly id: string; // can do this or specify private/public in the constructor
   public name: string; // ^

   constructor (private readonly id: string, public name: string) {}

  describe(this: Department) {}
}

- abstract classes and properties, methods - for defining properties/methods that must exist in child classes but a generic one cannot be provided.  Basically abstract classes are useful if you want to enforce all classes based on a certain class must share a common property/method, but you can't provide a concrete value or implementation in the base class (perhaps because the value should be very dependent on the actual child class). Abstract classes cannot be instantiated, its just there to be inherited from.

- can use private keyword for constructor. (to implement singleton pattern, where only one instance of a class should be instantiated ever.) A singleton class is configured such that you don't create it with "new" but by calling a method which then ensures that only one instance of the class exists at any given time, using custom logic

- difference between Type and Interface is Interface can only be used to describe objects, and so usually convention is to use Interface to describe objects, and other custom things like union types as Types


Interface example:
interface Person {
  readonly name: string;
  age: number;
  greet(phrase: string): void;
}

- classes can be expected to 'implement' an interface using the implements keyword -
class Person implements Greetable, AnotherInteface {}

- seems like there are two strategies for forcing classes to have certain properties - abstract class as base, or using an Interface. if the classes are too different to have parent-child relationship, then Interface makes sense to force some commonality thats needed

- interfaces can have readonly keyword

- interfaces can extend each other
interface Greetable extends Named, AnotherInterface {}

- interfaces can be used to create Function types (probably not heavily used)
inteface AddFn {
  (a: number, b: number): number;
}
- types can also be used to create Function types (and also probably not used much, but more often for this case than with interfaces)
type AddFn = (a: number, b: number) => number

- optional properties/methods in interfaces. Can also do this in classes.
interface Dist {
  name?: string;
  myMethod?(): void;
}

- Date is a type supported by Typescript

- Intersection types examples -
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

type Admin = {
  name: string;
  privileges: string[];
}
type Employee = {
  name: string;
  startDate: Date;
}
type ElevatedEmployee = Admin & Employee;

above example can be achieved with interface inheritance
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}
interface ElevatedEmployee extends Employee, Admin {}

- type guards - a check for a certain type at runtime. Allows for the flexibility of using union types, while still allowing to check for specific types. To type guard or check for a certain object type, then use - if ('privileges' in obj) {} to check for property existence. To check for an instance of a class can use if (obj instanceof class) {}

- Classes themselves become a type. 
class Car {}
class Truck {}
type Vehicle = Car | Truck

- Discriminated Unions - strategy for differentiating between object types without resorting to multiple type guards - adding a property that unique identifies and explains the object.
interface Bird {
  type: 'bird';
  flyingSpeed: 'number';
}
interface Dog {
  type: 'dog';
  walkingSpeed: 'number;
}
type Animal = Bird | Dog;

function moveAnimal(animal: Animal) {
  switch (animal.type) {
    // can write this concise switch statement instead of writing a million type guards
  }
}


- index types - For creating flexible objects where I don't know how many properties an object will have or the names/keys of the properties. 
interface ErrorContainer {
  [key: string]: string;
}

- function overloads - you can have multiple function type defnitions for the same function to help typescript understand narrowed possibilities. 
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}
The above makes it clear to typescript what gets returned and when from add function, so the return value can be operated on without Typescript throwing a error.

- A generic type is a type that's connected to another type, which together clarifies the specific overall shape or type it will be. For example, arrays and promises require telling typescript what type of data will be stored inside or what data will be returned. So Array<string> and Promise<string> tells the full picture of types inside.

- Generic functions usually take generic types as arguments

- Generic functions can be used for when a function is flexible in the types it accepts. In this case, you can use generic functions or youll have to type cast every instance of what the function returns. 

- When calling a function that was defined with generic types, you can pass in a type using brackets, or have them inferred based on what you're passing.

- constraints can be used in generic function definitions to constrain the generic types. If arguments must be objects - 
function merge<T extends object, U extends object>(objA: T, objB: U) {}

- Generic Function example:
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) { descriptionText = 'Got one element' }
  else if (element.length > 1) {descriptionText = 'Got ' + element.length + ' elements.'}
  return [element, descriptionText]
}

- keyof keyword can be used as a constraint in Generics - 
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) { return 'Value: ' + obj[key] }

- Generic classes are where we don't care about the exact type, and we can be flexible, so we use generics to let typescript determine exact type when class is called. 

- Generic types give us flexibility while also giving type safety.

- Typescript provides some generic utility types that are preconstructed generics so that we don't have to create complex (sometimes temporary) Types ourselves.

- At first glance, it might seem that union types can be used instead of generic definitions to achieve the same thing - but this is totally wrong. Unions say that something can be of the following x types. but generics are used to *lock in* one of the following x types.

- Generics help you create data structures that work together or wrap values of a broad variety of types

- declare keyword used to tell typescript that a variable will exist with so and so type. Used when we know another script or module will be run that will define something beforehand globally that we can use in current context.  (Can be used when a third party libary does not have a Definitely-Typed package for its types )

- webpack needs imports to not have .js extensions in paths. It will add extensions as appropriate itself.

- there is a sample webpack.config file in webpack docs for ts setup

- there is a section in create-react-app for adding typescript if you want to use cra

- use of React.FC is discouraged

tsconfig.json -
{
  compilerOptions: {
    "target": "es5", // which version of javascript to compile to
    "lib": [ // this tells typescript what libraries might be referenced
      "dom", // so typescript knows the types for document.querySelector("button"), etc
      "es6",
      "dom.iterable",
      "scripthost"
    ], // these are the default settings if not added. if not added, the default list is determined by what's needed for the "target" setting set above (perhaps new javascript interal classes for new features, etc)
    "sourceMap": true, // if set to true, the Sources tab of the browser dev tools will show ts files that can be used for setting breakpoints and debugging
    "outDir": "./dist", // outputs to dist folder
    "rootDir: "./src", // only compiles ts files in src folder
    "removeComments": true, // removes comments from compiled code (most likely useless, since you would most likely use something else for minification which would remove comments, right?)
    "downlevelIteration": true // used for solving bugs concerning loops. if loops are not behaving as they should, perhaps take a look at this option
    "noEmitOnError": true // set this if you want typescript to not compile if there is an error somewhere
    "strict": true // all the below options, even though commented out, are by default set to true if this option is true.
    "noImplicitAny": true, // cannot have cases where variable types are not set(or where type inference cannot determine type)
    "strictNullChecks": true, // if a value can be null/undefined, typescript will force you to specify
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitType": true,
    "alwaysStrict": true
  },
  "exclude": [
    "analytics.dev.ts",
    "**/*.dev.ts", // any file in any folder
    "node_modules", // if exclude section is not specified, node_modules is set as default 
  ],
  "include": [], // if this is setting is used, then only the folders/files specified will be compiled
}
