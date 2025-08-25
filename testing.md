automated test - is code that throws an error when things are unexpected

There's two things when talking about tests - the result and what you expect the result to be, or put differently, the thing to test, and your expectation for it.

The item to test could be anything. Your expectation can be strict or loose and take on many forms.
The item to test could be any data type. Your expectation will depend on what data type it is.

Assertions are your chosen expectations for testing something.

Assertions will be like -
I expect the thing to test to be ...
I expect the thing to test to be greater than ...
I expect the thing to test to be less than ...
I expect the thing to test to not be ...
I expect the thing to test to have these properties ...
I expect the thing to test to be this length...
etc

We need a test runner and an assertion library.

An assertion library will give options for different assertions in the form of functions. These functions will take two values, the thing to test and whats needed to complete the assertion or expection.

Then we need a test runner, which will run the assertions and report back the results. We want our assertions to do nothing if the assertion is correct. If not correct the assertion should throw an error.

The test runner just runs the function you give it. You are expected to write the function in such a way that you get a result that you want to test. Then you make assertions about the result. The test runner will simply run the function you give it. Then it will write out to the console which of your assertions raised an error.

# Mocking
You need to use mocks when you do not want to or cannot use something exactly in a test. For example, there is no reason to test external APIs and it might be expensive to call them unncessarily in tests. So you might want to mock the data fetching calls and just test your portion of the code given a certain api response. Mocking also makes our tests deterministic.

monkey-patching - temporarily overriding an object or function at runtime and then reassigning it back to its original value after tests.

Example of monkey patching fully manually:
```javascript
const originalGetWinner = utils.getWinner;
utils.getWinner = (p1, p2) => p1;
const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
// cleanup
utils.getWinner = originalGetWinner;
```

## jest.fn
jest.fn creates a mock function and creating it with jest.fn allows you to make assertions about how the function is called. This is because jest will keep track of this information for you. You can make assertions like -
utils.getWinner = jest.fn((p1, p2) => p1)
expect(utils.getWinner).toHaveBeenCalledTimes(2)
expect(utils.getWinner).toHaveBeenCalledWith('Kent C Dodds', 'Ken Wheeler')

In review, fundamentally, the jest.fn function accepts an implementation and returns a function that calls that implementation with all of those arguments.

It also keeps track of all the arguments that it's called with so that we can assert how that function is called, allowing us to catch issues in our integration with the function. Example of using jest.fn:
```javascript
const originalGetWinner = utils.getWinner;
utils.getWinner = jest.fn((p1, p2) => p1);
expect(utils.getWinner).toHaveBeenCalledTimes(2);
// cleanup
utils.getWinner = originalGetWinner;
```

# jest.spyOn
To not have to manually cleanup, we can use jest.spyOn which takes an object and a prop. It is responsible for tracking the original value. Then it provides a mockRestore function which we can use to restore the originalValue to that object.
```javascript
jest.spyOn(utils, "getWinner"); // replaces with mock function that has methods .mockImplementation, .mockRestore etc
utils.getWinner.mockImplementation((p1, p2) => p1); // tell the mock function what to call
expect(utils.getWinner).toHaveBeenCalledTimes(2);
utils.getWinner.mockRestore(); // tell the mock function to replace itself with the original value
```

## jest.mock
jest.spyOn is still monkey-patching. Monkey-patching works well with commonjs but not so well with es modules, because an ESModule export does not allow monkey-patching on exports (?). Instead we have to mock the entire module so when our test subject requires the file they get our mocked version instead.

Example of mocked module:
```javascript
const thumbWar = require("../thumb-war");
const utilsMock = require("../utils");

jest.mock("../utils", () => {
  return {
    getWinner: jest.fn((p1, p2) => p1),
  };
});

test("returns winner", () => {
  expect(winner).toBe("dan");
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  utilsMock.getWinner.mockReset(); // here most likely it resets the call count and other meta information, it does not un-mock anything, since its not necessary
});
```

We can put this jest.mock call anywhere, and Jest will ensure that our mock is used when the thumb-war file requires the utils module. Before Jest runs the above code, it moves the jest.mock call to the top of the file to ensure that mock is in place before any of our modules are loaded.

The way jest.mock works is by manipulating the module system internals. To make jest.mock from scratch we would need to use the internal features of node's require. It would look something like this:
```javascript
const utilsPath = require.resolve("../utils");
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1),
  },
};

// cleanup
delete require.cache[utilsPath];
```

# mock directory
Often you’ll want to mock the same file throughout all the tests in your codebase. You can make a shared mock file in Jests's **mocks** directory which Jest can load for us automatically. In the directory, make the file the same name as the file you want to mock. Then inside mock out the portion that needs mocking, example:
```javascript
module.exports = {
  getWinner: jest.fn((p1, p2) => p1),
};
```
Then in the test file, you can use jest.mock without the second argument -
```javascript
jest.mock("../utils");
const thumbWar = require("../thumb-war");
const utils = require("../utils");
utils.getWinner.mockReset();
```

## DOM Testing Library
DOM Testing Library can be used with any library or framework (like react) as long as that library renders to a DOM. There are specialized forms of DOM Testing Library like 'react-testing-library', however, the base DOM Testing Library can be used as well. Example:
```javascript
import "@testing-library/jest-dom/extend-expect"; // most likely creates a global document object (DOM) for us to use
import React from "react";
import ReactDOM from "react-dom";
import { getQueriesForElement, fireEvent } from "@testing-library/dom";

// react component to test
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  );
}

// takes react component, but returns vanilla DOM testing tools
function render(ui) {
  // create regular dom element to use as container
  const container = document.createElement("div");
  // render elements to test into container using whatever framework
  ReactDOM.render(ui, container);

  // add the dom element into the body
  // especially needed in react's case because react binds event handlers using body, so we can't test a container thats isolated from main dom structure
  document.body.appendChild(container);
  return {
    // get framework agnostic set of tools to test dom
    ...getQueriesForElement(container), // this is framework agnostic, notice how it takes a DOM element as input, not a react component or anything else react specific
    container,
    cleanup() {
      // undo the react stuff
      ReactDOM.unmountComponentAtNode(container);
      // undo the vanilla dom stuff
      document.body.removeChild(container);
    },
  };
}

test("renders a counter", () => {
  const { getByText, cleanup } = render(<Counter />);
  const counter = getByText("0");
  fireEvent.click(counter);
  expect(counter).toHaveTextContent("1");

  fireEvent.click(counter);
  expect(counter).toHaveTextContent("2");
  cleanup();
});
```
React binds all event handlers to the body, so we need to append any container we render with ReactDOM to the body. Then we should cleanup by unmounting the component along some other things perhaps.


## Testing Intro

(What does it mean to 'spy on function calls'?)

@testing-library/react - uses ReactDOM to render a component for testing
@testing-library/user-event - helps simulate user input like typing and clicking
@testing-library/dom - helps find elements that are rendered by our components
jest - runs our tests, reports results
jsdom - simulates a browser when running in a Node environment

Jest is responsible for finding all our test files and executing them. Jest looks for all files (in src/ ?) that end in .spec.js or .test.js or are placed in a folder called **test**.

In jest documentation it says 'Jest can be used in projects that use webpack'. What exactly does that mean?
In npm init jest@latest it asks - Which provider should be used to instrument code for coverage? options are v8 and babel. What does this mean exactly?

## Matchers
Jest uses "matchers" to let you test values in different ways. The simplest way to test a value is with exact equality. expect().toBe(). expect() returns a 'expection object' .toBe is a matcher. When jest runs, it tracks failing matchers so that it can print out nice error messages for you.

toBe uses Object.is to test exact equality.

If you want to check the value (shape?) of an object, use toEqual:
```javascript
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```
toEqual ignores object keys with undefined. To take these into account use toStrictEqual instead.

You can test for the opposite of a matcher using .not:
```javascript
test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
``

In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want:
- toBeNull matches only null
- toBeUndefined matches only undefined
- toBeDefined is the opposite of toBeUndefined
- toBeTruthy matches anything that an if statement treats as true
- toBeFalsy matches anything that an if statement treats as false

Number matchers include:
```javascript
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
`  expect(value).toBeLessThanOrEqual(4.5);
  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

String matchers include:
```javascript
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});
test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});
```

Array and iterable matchers include:
```javascript
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];
test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});
```

If you want to test whether a particular function throws an error when its called, use expect(() => compileAndroidCode()).toThrow().

Jest docs say - Return a promise from your test, and Jest will wait for that promise to resolve. If the promise is rejected, the test will fail. If the promise resolves, you can further test the resolved value using matchers.
For example:
```javascript
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
```
With async / await syntax:
```javascript
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});
```

Presumably, you don't need to return anything, because all async funcs return a promise by default, and if any promise rejects within the func, the returned promises ends up with rejection state.

Look into this later:
```javascript
test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (error) {
    expect(error).toMatch("error");
  }
});
```

If you expect a promise to be rejected, use the .catch method. Make sure to add expect.assertions to verify that a certain number of assertions are called. Otherwise, a fulfilled promise would not fail the test:
```javascript
test("the fetch fails with an error", () => {
  expect.assertions(1);
  return fetchData().catch((error) => expect(error).toMatch("error"));
});
```
Look into the above later. why is expect.assertions(1) needed? whats going on exactly? The returned promise is rejected, so the test should fail automatically, and so expect.assertions is needed? but what does it do exactly.

If using callbacks, you need to be careful because Jest tests complete once they reach end of their execution. This means the assertion must go off before the exeuction of the parent test function ends. To get around this when using callbacks, use the 'done' function provided to tests.
```javascript
test("the data is peanut butter", (done) => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```
If done is never called then the test will fail. If it's called with error, test will fail.


## Setup And Teardown

describe blocks are a way to organize and/or group tests.

If you have some work you need to do repeatedly for many tests, you can use beforeEach and afterEach hooks. Example:
```javascript
beforeEach(() => {
  initializeCityDatabase();
});
afterEach(() => {
  clearCityDatabase();
});
test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});
test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});
```

beforeEach and afterEach can handle asynchronous code in the same ways that tests can handle asynchronous code - they can either take a done parameter or return a promise -
```javascript
beforeEach(() => {
  return initializeCityDatabase();
});
```

If the promise resolves we know it successed otherwise it failed.
For one-time setup:
```javascript
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});
```

beforeAll and afterAll are useful for asynchronous one-time setup because writing it at the top of the file would be difficult if its asynchronous. (But not impossible right? Maybe would require IIFE?)

You can scope setups using describe blocks:
```javascript
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

describe("matching cities to foods", () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});
```

The top level beforeEach is executed before the beforeEach inside the describe block.

Because Jest runs the tests asynchronously, its better to use before and after handlers instead of doing setup inside the file or inside describe blocks.

If a test is failing, one of the first things to check should be whether the test is failing when it's the only test that runs. To run only one test with Jest, temporarily change that test command to a test.only:
```javascript
test.only("this will be the only test that runs", () => {
  expect(true).toBe(false);
});
test("this test will not run", () => {
  expect("A").toBe("A");
});
```
If you have a test that often fails when it's run as part of a larger suite, but doesn't fail when you run it alone, it's a good bet that something from a different test is interfering with this one. You can often fix this by clearing some shared state with beforeEach. If you're not sure whether some shared state is being modified, you can also try a beforeEach that logs data.


# Mock Functions
There are two ways to mock functions: Either by creating a mock function to use in test code, or writing a manual mock to override a module dependency.

We can use a mock function the then inspect the mock's state to ensure the callback is invoked as expected.

All mock functions have this special .mock property, which is where data about how the function has been called and what the function returned is kept.

mockCallback.mock.calls is an array or arrays. The outer array items represent each time the function was called, the inner array items are the arguments the mock was called with. mockCallback.mock.results is an array with the return values of each call.

Mock functions can also be used to inject test values into your code during a test:
```javascript
const myMock = jest.fn();
console.log(myMock());
// > undefined
myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);
console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```
Try to avoid the temptation to implement logic inside functions that are not directly being tested. No need to make a complicated mock function, if instead you can have the mock return a series of values that you want with .mockReturnValueOnce().


## mocking modules

If we want to test:
```javascript
import axios from "axios";
class Users {
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }
}
export default Users;
```

We can mock the axios module so we dont hit the api:
```javascript
import axios from "axios";
import Users from "./users";

jest.mock("axios");

test("should fetch users", () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then((data) => expect(data).toEqual(users));
});
```

We provide a mockResolvedValue for axios.get that returns the data we want our test to assert against.

Question: I thought jest.mock(path) without the second argument specifying what the module should return means that jest gets the file from **mock** folder? In the above example, does jest.mock('axios') mean that everything it originally returns is replaced with empty mock until specific mock is specified?

## Mocking Partials

Portions of a module can be mocked while keeping the rest of the module the same:
Module to mock:
```javascript
export const foo = "foo";
export const bar = () => "bar";
export default () => "baz";
```
In test:
```javascript
//test.js
import defaultExport, { bar, foo } from "../foo-bar-baz";
jest.mock("../foo-bar-baz", () => {
  const originalModule = jest.requireActual("../foo-bar-baz");
  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => "mocked baz"),
    foo: "mocked foo",
  };
});

test("should do a partial mock", () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe("mocked baz");
  expect(defaultExport).toHaveBeenCalled();
  expect(foo).toBe("mocked foo");
  expect(bar()).toBe("bar");
});
```

Still, there are cases where its useful to go beyond the ability to specify return values and full-on replace the implementation of a mock function. This can be done with jest.fn or mockImplemention or mockImplementationOnce.

With jest.fn:
```javascript
const myMockFn = jest.fn((cb) => cb(null, true));
myMockFn((err, val) => console.log(val));
// > true
```

The mockImplementation method is useful when you need to define the default implementation of a mock function that is created from another module:
```javascript
jest.mock("../foo"); // this happens automatically with automocking
const foo = require("../foo");
// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```

When you need to recreate a complex behavior of a mock function such that multiple function calls produce different results, use the mockImplementationOnce method:
```javascript
const myMockFn = jest
  .fn()
  .mockImplementationOnce((cb) => cb(null, true))
  .mockImplementationOnce((cb) => cb(null, false));
myMockFn((err, val) => console.log(val));
// > true
myMockFn((err, val) => console.log(val));
// > false
```

When the mocked function runs out of implementations defined with mockImplementationOnce, it will execute the default implementation set with jest.fn (if it is defined):
```javascript
const myMockFn = jest
  .fn(() => "default")
  .mockImplementationOnce(() => "first call")
  .mockImplementationOnce(() => "second call");

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

In order to make it less demanding to assert how mock functions have been called, we've added some custom matcher functions for you:
```javascript
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();
// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);
// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);
// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
```

Jest runs in node, but node does not support 'import' statements.

Jest is automatically picking up Babel configuration and applying it to our test code. (the reason for this must be that if you have a babel config in your project, it means you want your source code to be run through babel before it runs. Now ofcourse we are needing to run portions of our source code to test it, so it makes sense that Jest would assume the portion of the source code it runs for testing will need to be run through babel first.)

Jest automatically sets process.env.NODE_ENV to 'test' when it runs. (The babel preset '@babel/preset-env' handles esmodule syntax, but if you have raw webpack, you might want webpack to handle it to do tree-shaking, so you want - ['@babel/preset-env', {modules: false}], but for test environment you want modules: 'commonjs', so you can use process.env_NODE_ENV for that.

In summary, you need babel to compile es modules in jest tests.

Jest simulates a browser environment in node using a module called JS DOM. Jest test environments actually have window global object at all times, unless you specify to jest that your test env should be node only. To signify this you can run `npm run test -- --env=node`. Instead of having to specify in command you can specify environment in `jest.config.js` file -
```javascript
module.exports = {
  testEnvironment: "jest-environment-node", // no window in environment
  // testEnvironment: 'jest-environment-jsdom',
};
```

## css
Its' uncommon to test css. When jest encounters a css import we need to tell it whats going on since that is unexpected. It's expecting only commonjs (see above for esmodules - we can have babel config that Jest will run our test code through before executing if we want to use esmodules.) So for css modules, we need to create a mock and then stub out the actual css module. (Remember that importing css modules into js files is only possible due to webpack and its css-loader and style-loader.) What we can do is use the moduleNameMapper config option in jest.config.js to map css modules to a different file. We'll create file mock in a test folder named style-mock.js -
```javascript
// style-mock.js
module.exports = {};
```
And in jest.config.js:
```javascript
module.exports = {
  // testEnvironment: 'jest-environment-node',
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.css$": require.resolve("./test/style-mock.js"),
  },
};
```

We have webpack configured to handle CSS files with the CSS-loader and the style-loader. Webpack is managing this for our application and we simply needed to make Jest manage the same thing for our tests. So now whenever a css file import is encountered in test files, './test/style-mock.js' is being imported instead which is just an empty object. This means components don't get to pull in styles in test, but that should be fine as styles are not usually tested.

Even though styles are not tested, it would be nice if classnames were still attached. But if .module.css files get stubbed out we wont see classes appear in test environment. We can fix that by using a package called 'identity-obj-proxy'. This will return a object that returns the string version of any key thats accessed on it. So 'obj.hello' will return 'hello'. This means when using css modules and we assign classnames like styles.classNameHere, the component will have 'classNameHere' as the class. To do this:
```javascript
module.exports = {
  // testEnvironment: 'jest-environment-node',
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("./test/style-mock.js"),
  },
};
```

## Generate a Serializable value with jest snapshots

Snapshot testing is a way to simplify writing tests and maintaining assertions. As noted in the Jest documentation: “The snapshot artifact should be committed alongside code changes, and reviewed as part of your code review process. Jest uses pretty-format to make snapshots human-readable during code review. On subsequent test runs Jest will simply compare the rendered output with the previous snapshot. If they match, the test will pass. If they don't match, either the test runner found a bug in your code that should be fixed, or the implementation has changed and the snapshot needs to be updated.”

With snapshot tests we can make a change and check the impact of our change. If there's anything unintended, we'll be able to see it in snapshot failures. If a snapshot failure is intended, we just update the snapshot.

For snapshots, you can use expect().toMatchSnapshot() and this will create a snapshot and save it to file under **snapshots** folder. To save the snapshot inline, you can use expect().toMatchInlineSnapshot()

Jest has built in capability of snapshotting and serializing DOM nodes. You can use:
```javascript
import { render } from "@testing-library/react";
import React from "react";
import CalculatorDisplay from "../calculator-display";

test("renders", () => {
  const { container } = render(<CalculatorDisplay value="0" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="css-lq9ahq-calculator-display--CalculatorDisplay"
      >
        <div
          class="autoScalingText"
          data-testid="total"
          style="transform: scale(1,1);"
        >
          0
        </div>
      </div>
    </div>
  `);
});
```

To use snapshots, first you call .toMatchInlineSnapshot() by itself when creating the first snapshot. When running the test, Jest will insert the generated serialized snapshot inline in the file. Test will pass and give output of '..snapshot written' - signifying that a snapshot was created. The next time you run this test it will check against this snapshot. If snapshot failure was intended, update the snapshot using `npx jest -u`. You can pass cli options to the underlying command of a script using `--`. So if the npm script for 'test' is 'jest', you can do `npm test -- -u`.

When taking snapshot of a component styled with emotion, you'll get classnames that end in hashed values. If you change a style in the js file, the snapshot will show a new classname, which is fine, but it would be more helpful if you could see the actual change in the snapshot. For this you can install 'jest-emotion' (renamed to '@emotion/jest' and the serializer is '@emotion/jest/serializer').

Part of the power of snapshots is the ability to provide custom serializers. If using css-in-js library its useful to use this serializer.

If you're using webpack to resolve modules a certain way, for example, making it so modules in a certain folder can be imported like node_modules - import package from 'package', without relative path specified, then you need to make sure Jest does the same thing. This is why for many of the things you can do in Webpack, there are equivalent changes you can make in `jest.config.js`. Add 'moduleDirectories' to specify folders whose modules can be imported as packages:
```javascript
module.exports = {
  // testEnvironment: 'jest-environment-node',
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", path.join(__dirname, "src"), "shared"],
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy", // order matters, .module.css will match next line as well, but we want this to be the one that executes for css modules
    "\\.css$": require.resolve("./test/style-mock.js"),
  },
  snapshotSerializers: ["jest-emotion"],
};
```

Often you’ll have some setup that you want to run before your tests start. If you have a file or module you need to run at the start of every test file then you can use 'setupFilesAfterEnv' option in jest.config.js. One usecase would be if we wanted to extend expect to have more dom-friendly assertions we can install '@testing-library/jest-dom'. Then we can import and run a file from that package at the start of our test so that expect is extended, and we can use expect(component).toHaveTextContent('hello'),like this:
```javascript
import "@testing-library/jest-dom/extend-expect";
```
However, instead of importing this at the start of every file, we can add the 'setupFilesAfterEnv' option:
```javascript
module.exports = {
  // testEnvironment: 'jest-environment-node',
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", path.join(__dirname, "src"), "shared"],
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy", // order matters, .module.css will match next line as well, but we want this to be the one that executes for css modules
    "\\.css$": require.resolve("./test/style-mock.js"),
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotSerializers: ["jest-emotion"],
};
```

When testing individual react components, we may need them to exist within the top-level state providers and routers of the app. One strategy for doing this might be to have react-testing-library's render function to automatically wrap our components with the providers. We can decide to actually export all of react-testing-library from one of our files and modify the functions like render before exporting them. For doing this we might want that file to be imported like a node_module for simplicity. We already saw we can do this with the moduleDirectories option of Jest. However, when eslint sees this, it will raise an error because of a rule that sees a module not resolving. To fix this we need eslint to understand that Jest is setting up addition moduleDirectories for tests. To tell eslint that it should take into account Jest's moduleDirectories option in jest.config.js, we need to install 'eslint-import-resolver-jest'. Then in .eslintrc.js:
```javascript
module.exports = {
  extends: [
    "kentcdodds",
    "kentcdodds/import",
    "kentcdodds/jest",
    "kentcdodds/react",
  ],
  rules: {
    // https://github.com/benmosher/eslint-plugin-import/issues/1446
    "import/named": "off",
  },
  settings: { "import/resolver": "node" },
  overrides: [
    {
      files: ["**/src/**"],
      settings: { "import/resolver": "webpack" },
    },
    {
      files: ["**/__tests__/**"],
      settings: {
        "import/resolver": {
          jest: {
            jestConfigFile: path.join(__dirname, "./jest.config.js"),
          },
        },
      },
    },
  ],
};
```
The above is saying, use node's setting to resolve imports, but in src files use webpack's config for linting import statements, and for test files, use jest's config for linting import statements.


## watch mode
Jest has watch mode that will run tests whenever a file changes. While in watch mode there are options to rerun tests, rerun specific tests, update snapshots interactively, etc. Watch mode can be run in a script like "test:watch": "jest --watch".


## debugger
You can open the jest process in a debugger. Here is a script for that:
"test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
This will stop the process at line of code where 'debugger' is written.
The --runInBand option makes Jest run all its test in one process so we can step through everything.
We can open the debugger with Chrome dev tools.


## Test Coverage
Jest comes with code coverage reporting built-into the framework. You need to add option to script - "test": "jest --coverage", this will output a coverage report, and also create a directory called coverage, which will have the coverage details in html that can be served and opened in the browser.

To tell Jest which files to collect coverage data from, otherwise Jest will check external test utility files which will have 100% coverage because they are run all the time, which will mess up our statistics.
```javascript
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: [
    "node_modules",
    path.join(__dirname, "src"),
    "shared",
    path.join(__dirname, "test"),
  ],
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("./test/style-mock.js"),
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotSerializers: ["jest-emotion"],
  collectCoverageFrom: ["**/src/**/*.js"],
};
```

Jest knows what parts of code has been tested or not by using a babel plugin called babel-plugin-istanbul under the hood. To disable checking certain parts of code that are not important and so do not need to be tested you can used inline comments -
```javascript
/* istanbul ignore next */
if (match) {
}
```

The 4 entities of code babel-plugin-istanbul checks for coverage are statements, branches (in if blocks etc), functions, and lines.

You can set coverage thresholds to make sure additional tests don't lower repository's coverage percentages. Use:
```javascript
const path = require("path");

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: [
    "node_modules",
    path.join(__dirname, "src"),
    "shared",
    path.join(__dirname, "test"),
  ],
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("./test/style-mock.js"),
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotSerializers: ["jest-emotion"],
  collectCoverageFrom: ["**/src/**/*.js"],
  coverageThreshold: {
    global: {
      statements: 31,
      branches: 18,
      functions: 29,
      lines: 29,
    },
    "./src/shared/utils.js": {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
};
```
In the above, the global thresholds are set, and separately the thresholds for an important file are set. This way this file cannot be updated or changed without the given coverage thresholds being met.

When using CI, look into codecov.io for generating a history of coverage reports during CI/CD.

In CI, we don't want to start tests in watch mode, but locally we normally want to run the tests in watch mode. To have flexible scripts we can use package 'is-ci-cli'. Then you can use something like:
```javascript
"test": "is-ci \"test:coverage\" \"test:watch\"",
```

When in CI, env variable CI=1 is usually set, which will allow the script to know which environment it's in.

leaving off at # 19 in testing javascript course

====================

React Testing Library and Jest: The Complete Guide

@testing-library/react offers simpler abstraction for mounting react components to a DOM, instead of using ReactDOM.render().

libraries
- @testing-library/react - Uses ReactDOM to render a component for testing
- @testing-library/user-event - Helps simulate user input like typing and clicking
- @testing-library/dom - Helps find elements that are rendered by our components
- jest - Runs our tests, reports results
- jsdom - Simulates a browser when running in a Node environment

Jest finds all files in the src folder that ends with .spec.js or .test.js or in a folder called **test** and runs them.

Queries - A super important part of testing is finding the elements that our component has created. The React Testing Library Query System is a collection of about 48 functions that are used to find elements.

Partial list of important queries:
- screen.getByRole() - very important
- screen.getAllByRole() - very important
- screen.queryByRole()
- screen.findAllByTitle()
- screen.findAllByDisplayValue()
- screen.findByRole()
- screen.queryAllByRole()
- screen.queryByLabelText()
- screen.findAllByTitle()
- screen.findByTitle()
- screen.getByLabelText()

Aria Roles -
- Aria Roles clarify the purpose of an HTML element
- Traditionally used by screen readers - software to help people understand the content on the screen
- Many HTML elements have an 'implicit' or automatically assigned role
- Elements can be manually assigned a role. Even trained engineers do this incorrectly.

Some ARIA roles assigned automatically to HTML elements
'heading' - h1 h2 h3 h4 h5 h6
'list' - ul li
'button' - button
'link' - a
'textbox' - input, type = 'text' or no type

This entire role system is the primary and preferred way of finding elements.

Matchers (second part of an assertion)
Matchers from Jest
- expect().toHaveLength() - makes sure the value is an array with a particular length
- expect().toEqual() - makes sure the value equals another value (I believe non-strict equality?)
- expect().toContain() - makes sure an array contains a value or make sure a string contains another string
- expect().toThrow() - makes sure a function throws an error when called
- expect(mock).toHaveBeenCalled() - makes sure a mock function (required) has been called

Matchers from React Testing Library (jest-dom extends expect function)
- expect(element).toBeInTheDocument() - Makes sure element is present on the page
- expect(element).toBeEnabled() - Makes sure element (like an input) is not disabled
- expect(element).toHaveClass() - Makes sure element has a class name
- expect(element).toHaveTextContent() - Makes sure element has some particular text
- expect(element).toHaveValue() - Makes sure input, select, or textarea has a value

we use .getByRole if we expect to find exactly one element, if it finds 0 or more than 1, it will throw an error
 
Simulating user events:
user.click(element); - Simulates clicking on the provided element
user.keyboard('asdf'); - Simulates typing 'asdf'
user.keyboard('{Enter}'); - Simulates pressing the Enter key

To simulate typing into an input, click first to select it, then type into it -
await user.click(nameInput)
await user.keyboard('jane')

Mock Functions -
- In English, 'mock' can mean 'not real'
- Fake function that doesn't do anything
- Records whenever it gets called, and the arguments it was called with
- Used very often when we need to make sure a component calls a callback

const mock = jest.fn()
expect(mock).toHaveBeenCalled()
expect(mock).toHaveBeenCalledWith({name: 'jane', email: 'jane@email.com'})

If a label's 'for' (in react htmlFor) attribute matches an input 'id', clicking on the input will focus the input

Inputs should be selected via one of two options:
screen.getByLabelText(/enter email/i) - selects the INPUT based on the text of the label connected via 'for'
screen.getByRole('textbox', { name: /enter email/i }) - selects INPUT based on the text of the label connected via 'for'. (apparently name option does not refer to the name attribute)
('i' in the regular expressions above means don't consider uppercase or lowercase)

To help figure out best way to query for an element, write this out in a test after rendering the component:
screen.logTestingPlaygroundURL()
Then from the console, go to the link. In there find the element you need to highlight, manually give it a large border so that you can click it. Click it to get the suggested way to query for it. use the singular verion if expecting one and only one, otherwise use the plural version (..AllBy..)

Don't obsess over getting the right query. When ways to find elements with the preferred 'role' approach doesn't work, there are two escape hatches -
- data-testid - add an attribute to the html element data-testid="users" and then use screen.getByTestId('users')
- container.querySelector()

import { within } from '@testing-library/react'
Can use the within function to scope query within a selected element. Example:
const rows = within(screen.getByTestId('users')).getAllByRole('rows')

When you render with render(<SomeComponent />), an extra div is wrapped around the component, which can be accessed like this:
const { container } = render(<SomeComponent />)
The 'container' is an html element with all the methods an html element would have, like querySelector which is vanilla selector where CSS selectors can be passed. Example:
const rows = container.querySelectorAll('tbody tr');

quirk:
getByRole('cell', { name: /jane/i }); - it seems the 'name' option is flexible based on the precise query on what it refers to, here it refers to the text context.

To test simple existence:
```javascript
for (let user of users) {
  const name = screen.getByRole("cell", { name: user.name });
  const email = screen.getByRole("cell", { name: user.email });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
}
```

beforeEach(() => {}) is a jest builtin that will run the function before each test, for any setup purposes. However, rendering components in beforeEach is discouraged by React Testing Library so it's not used much when using RTL. Instead do something like this:
```javascript
function renderComponent() {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];
  render(<UserList users={users} />)

  return {
    users,
  }
}

test('render one row per user', () => {
  renderComponent();
  // ...
})
```

screen.debug() in a test allows you print the current html of the component to the console. You can use to make sure the html is changing as you expect visually.

In the above notes, there was confusion about 'name' option of getByRole. Now it's made clear - it refers to the 'accessible name' of an element. The accessible name of an element depends on certain things. If an element has text content, usually that is the accessible name. For inputs with labels, the label text is usually the accessible name. It most likely corresponds to the name most visible on the screen for an element. Usually preferrable to use regex for getting by accessible name.

If a component does not have an accessible name, for example a button with an svg icon, then you can give it an accessible name using aria-label attribute. Example:
```javascript
<button aria-label="sign in">
  <svg />
</button>
```
Notice aria-label is not camelCased in jsx, this is not an error. aria-label intentionally violates camelCase convention for JSX.


### Summary of ARIA and roles:
Selecting elements based upon their role is the preferred way of testing elements with React Testing Library. We use role selectors instead of more classic ways of finding elements, like CSS selectors.

ARIA (Accessible Rich Internet Applications) is a set of attributes that can be added to HTML elements to help make web applications more accessible to users with disabilities. These attributes provide additional information about the purpose and behavior of an element, which can be used by assistive technologies such as screen readers to improve the user experience.

Even though these ARIA roles are an additional topic to memorize, we engineers use them because they allow us to write more flexible tests. In many cases it doesn't matter if an element is presenting text in an `h1` element or an `h3` element. By finding elements based on their role, we can make small changes to a component and not break its respective test. Some engineers do not care for this flexibility. If you don't wish to use ARIA roles, you can always fall back to using standard CSS selectors.

Cheatsheet of common html elements and their roles:
```javascript
<div>
  <a href="/">link</a>
  <button>button</button>
  <footer>contentinfo</footer>
  <h1>heading</h1>
  <header>banner</header>
  <img alt="description" /> img
  <input type="checkbox" /> checkbox
  <input type="number" /> spinbutton
  <input type="radio" /> radio
  <input type="text" /> textbox
  <li>listitem</li>
  <ul>list</ul>
</div>
```

Sometimes multiple elements of the same type will be displayed by a component, and you will need to find a particular instance of that element. You can be more specific by finding elements based upon their role _and_ their accessible name.

The accessible name of most elements is the text placed between the JSX tags. For example, the accessible name of `<a href="/">Home</a>` is `Home`.

Elements with a defined acessible name can be selected by passing a filtering object to the `getByRole` method.

Self-closing elements (also known as 'void elements') like `input`, `img`, and `br` cannot contain text. Defining accessible names for them is done differently. To define an accessible name for `input` elements in particular, you can associate the input with a `label`. The `input` element should have an assigned `id` prop, and the label should have an identical `htmlFor` prop. Once this link has been formed, the `input` can then be selected by using the `label` text as an accessible name.

If you're working with a void element (like a `br` or an `img`), or if you're working with an element that doesn't show plain text, you can apply an accessible name by using the `aria-label` attribute.

A common component that does not have a role (?) is the form element. (Perhaps this changed because chatgpt says forms have aria role of 'form'.) Add aria-label to forms to target them with ByRole selectors. 

Don't be afraid to add accessible names to components so you can target them with getByRole.


### Query Functions
All query functions are accessed through the `screen` object in a test. These query functions _always_ begin with one of the following names: `getBy`, `getAllBy`, `queryBy`, `queryAllBy`, `findBy`, `findAllBy`.

These names indicate the following:
1. Whether the function will return an element or an array of elements
2. What happens if the function finds 0, 1, or > 1 of the targeted element
3. Whether the function runs instantly (synchronously) or looks for an element over a span of time (asynchronously)

Looking for a Single Element?
            0 matchs          1 match         >1 match          Notes
getBy       Throws error      Element         Throws error
queryBy     null              Element         Throws error
findBy      Throws error      Element         Throws error      Looks for an element over the span of 1 second

Looking for a Multiple Element?
            0 matchs          1 match         >1 match          Notes
getAllBy    Throws error      []Element       []Element
queryAllBy  []                []Element       []Element
findAllBy   Throws error      []Element       []Element         Looks for elements over the span of 1 second

When to use each:
Goal of test
Prove an element exists getBy, getAllBy
Prove an element does not exist queryBy, queryAllBy
Make sure an element eventually exists findBy, findAllBy

Favor using getBy, getAllBy to prove an element exists. Here is common way to test for existence:
```javascript
const email = screen.getByRole("cell", { name: user.email });
expect(email).toBeInTheDocument();
```

You'll notice that the assertion is not needed because .getByRole will throw an error if the element is not in document, so no need to add assertion that will throw error if element is not in document. However, it is still good practice to include the assertion.

Favor queryBy when proving an element does not exist. Here is common way to test for non-existence:
```javascript
const element = screen.queryByRole("textbox");
expect(element).not.toBeInTheDocument();
```

As you can see, the reason queryBy prefix exists is because if you want to assert that an element does not exist, you can't use getBy because it will preemptively throw an error. With queryBy, if an item that's not supposed to show up is gotten, then the assertion will correctly throw error. If the element, doesn't exist, itll be null, which will cause teh assertion to pass, even though its a bit strange to expect(null).not.toBeInTheDocument(). You can see the unelegant nature of making design choices for a library here.

Favor findBy, findAllBy when data fetching. findBy, findAllBy are async functions, so they need to be awaited. .findBy polls every few milliseconds until 1 second is over.

React Testing Library provides many different query functions. Each begins with a name like `getBy`, `findBy`, etc. The names also have common endings. The different name endings indicate how the query for an element will be performed:

| ByRole | Finds elements based on their implicit or explicit ARIA role |
| ByLabelText | Find form elements based upon the text their paired labels contain |
| ByPlaceholderText | Find form elements based upon their placeholder text |
| ByText | Find elements based upon the text they contain |
| ByDisplayValue | Find elements based upon their current value |
| ByAltText | Find elements based upon their `alt` attribute |
| ByTitle | Find elements based upon their `title` attribute |
| ByTestId | Find elements based upon their `data-testid` attribute |

Always prefer using query functions ending with ByRole, only use others if 'ByRole' is not an option.

getByText(value) if value is a string, it will check the entire text against the value. If partial match is enough, use regex. /hello/ will match elements whose text has 'hello'.


### Matchers
Matchers help make sure that a value is what we expect it to be. Jest comes with many matchers and @testing-library/jest-dom has many for the DOM specifically.

# 3 difficult aspects of testing
- module mocks
- navigation
- 'act'

Testing usually requires you to have a deep understanding of the libraries your project uses. Some of these libraries don't like to be used in a test environment.

The Link component from react-router requires a context provider. So if that is not set up in the test environment, then error will be thrown when trying to render a component that has a Link. You can use react-router's  MemoryRouter for testing purposes.

If you are doing data fetching inside an useEffect, you will run into act() warnings. You need to understand 3-4 different topics to understand these warnings -
- unexpected state updates in tests are bad
- the act function defines a window in time where state updates can (and should) occur
- react testing library uses 'act' behind the scenes for you
- To solve act warnings, you should use a 'findBy'. Usually you don't want to follow the advice of the warning.

Act is a function implemented by react-dom that defines a window in time where state updates can and should occur.

Test written without RTL (to better understand act):
```javascript
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

test('clicking the button loads users', () => {
  act(() => {
    render(<UsersList />, container);
  });

  const button = document.querySelector('button');
  await act(async () => {
    button.dispatch(new MouseEvent('click'));
  });

  const users = document.querySelectorAll('li');
  expect(users).toHaveLength(3);
});
```

The above tells our tests that we expect state of UsersList to be changed because of button click. React will process all state updates + useEffects before exiting the 'act'. If we're not using React Testing Library, if we ever are going to run some code that's going to change our state, it must be wrapped in an act function call. Because we're using that act function, two things are going to occur - it's giving us a window in time where we can safely update our state and we won't see act warning and, React is going to process all the pending state updates and useEffects before exiting the 'act'. (Presumably this means act will keep track of what async functions are pending from the action and will wait for them to resolve and the resulting render before exiting, which is exactly when we want to assert against the UI.)

act is used to wait for all pending async functions (and theyre resultant re-renders) that originate from an action.

act warning means our state might have updated when we weren't ready for it, (perhaps after our tests already ran).

React Testing Library calls act for you -
- screen.findBy.. (polls within 1 second)
- screen.findAllBy.. (polls within 1 second)
- waitFor (waits for 1 second)
- user.keyboard (synchronous?)
- user.click (synchronous?)
  The above all call 'act' for you. This is the preferred way of using 'act' when using RTL.

Act warnings will tell you that code that causes React state updates should be wrapped into act(). But when using React Testing Library, you want to use the above tools instead (since they call act underneath the hood for you).

Options for Solving Act Warnings
1. Use a 'findBy' or 'findAllBy' to detect when the component has finished its data fetching
2. Use an 'act' to control when the data-fetching request gets resolved. More on this later.
3. Use a module mock to avoid rendering the troublesome component
4. Use an 'act' with a 'pause'.

Anytime you have an useEffect function that contains any kind of async code and after the promise gets resolved, we update some state, we are almost alwasy going to see an act warning.

Use 'findBy' to wait for an element that will asynchronously be rendered later on. You might need to do this at the beginning of a test to wait for something that needs to appear, even though that is not what you're testing, otherwise initial state updates and rerenders will happen outside of act. This is important to understand - you need to 'findBy' the thing whose appearance means state updates and async activity are done. 

In some cases it might be fine for state updates and rerenders to happen outside of act, but you still want to have all state actions and rerenders occur within act by convention. (It might be necessary too to be honest.) To help figure out what you need to wait for you can do the following:
```javascript
test("", async () => {
  renderComponent();

  screen.debug();
  await pause();
  screen.debug();
});

const pause = () => new Promise(resolve => setTimeout(() => resolve, 100));
```

If you're getting an act warning from a child component that is not important to your test, you can mock it out instead of waiting for it with findBy. To mock a child component, find the source file of the child component and do the following:
```javascript
jest.mock('../tree/FileIcon', () => {
  // Content of FileIcon.js
  return () => 'File Icon Component'
});
import RepositoriesListItem from './RepositoriesListItem';
```
In the above, the RepositoriesListItem will import the mock module when it itself is being imported into the test.

An absolute last ditch solution for dealing with act warning is the following:
```javascript
test("", async () => {
  renderComponent();

  await act(async () => {
    await pause();
  })
});

const pause = () => new Promise(resolve => setTimeout(() => resolve, 100));
```
You want to do this to get rid of act warning if there really is no other way. 



## data fetching

We usually want to mock data fetching. 3 options to do so:
1. mock the file that contains the data fetching code
2. use a library to 'mock' axios (fetch) - get axios (fetch) to return fake data
3. create a manual mock for axios

It's not so great to mock the file that contains the data fetching code completely because you end up testing less code. The better approach is number 2, get axios or fetch to return fake data using a library such as MSW. MSW allows you to intercept actual network requests and respond with fake data.

MSW Setup:
- Create test file
- Understand the exact URL, method, and return value of requests that your component will make
- Create a MSW handler to intercept that request and return some fake data for your component to use
- Set up the beforeAll, afterEach and afterAll hooks in your test file
- in a test, render the component. wait for an element to be visible

```javascript
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

const handlers = [
  rest.get('/api/repositories/', () => {
    const language = req.url.searchParams.get('q').split('language:')[1];

    return res(
      ctx.json({
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` }
        ]
      })
    )
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers(); // not needed in this case since we are not changing handlers, but good practice
});

afterAll(() => {
  server.close();
});

test('renders two links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // wait for msw to respond component to rerender with new elements made with that response
  const languages = [
    'javascript',
    'typescript',
    'rust',
    'go',
    'python',
    'java'
  ];

  for (let language of languages) {
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`);
    });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`)
  }
});
```

One pattern to not use - do not define your msw handlers in one place to import into every test. This is because doing it this way means you'll be locked into a particular response for each api route. Instead you might want to have custom responses for each test to better test exactly whats needed.

Use this pattern instead:
In each test file we want to be able to to this:
```javascript
createServer([
  {
    path: '/api/repositories',
    method: 'get', // should not be needed as it should set as default
    res: (req, res, ctx) => {
      return {
        items: [{}, {}]
      }
    }
  },
  {
    path: '/api/repositories',
    method: 'post',
    res: (req, res, ctx) => {
      return {
        items: [{}, {}, {}, {}]
      }
    }
  }
]);
```

test/server.js
```javascript
import {setupServer} from 'msw/node';
import {rest} from 'msw';

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map(config => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(
        ctx.json(
          config.res(req, res, ctx)
        )
      )
    })
  })
  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
   afterAll(() => {
    server.close();
   });
}
```

## Order of Execution
Code in a test file is not executed start to finish. The tests are collected and stored in state as they are encountered, then after everything else outside of test funtions are executed (we've reached bottom of file), then tests and relevant hooks (beforeAll, etc) are executed. So code written between two test functions are not executed between those test function calls. To organize code and tests, we can use the describe function to group tests together. describe blocks scope beforeAll, beforeEach, afterAll, to their child tests.


## Debugging Tests
Options for debugging tests:
1. Use test.only or describe.only to limit the number of tests executed
2. Set up a debugger
3. Classic console.logs

Be aware of caching when using third party code, (or even your own code!). Even if you mock out responses of data fetching functions, if there is a caching mechanism in front of it, you will get cached response which can lead to unexpected behavior. Getting cached responses on subsequent tests is a major source of bugs and headache.  


# Cypress
Cypress is a JavaScript based Test Automation Tool & Framework. Cypress can be used for End-to-End tests as well as Component tests. 

E2E testing is for testing complete application flows, whereas Component Tests are for testing individual UI elements. There is also Unit Testing, which is for testing small individual building blocks of an application, like an individual function.

After installing cypress, you can use it with the command `npx cypress open`, which will open a desktop application that launches its own browser (you can pick chrome, edge, firefox, etc). The browser it launches is wrapped in a testing application that runs the tests found in the /cypress/e2e folder, in xxx.cy.js files.
Example Cypress Test Suite and Test:
```javascript
/// <reference types="Cypress" />
// add the above reference tag to get auto-completion for cy 
describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.main-header img') // takes CSS selector, will get ALL matching elements, implicit assertion
    cy.get('.main-header').find('img') // proper chaining, don't chain .get with another .get, .find only works after .get
  })
  it('should display the page title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1) // explicit assertion
    cy.get('h1').contains('My Cypress Course Tasks')
    // cy.contains('My Cypress Course Tasks') for finding element with particular text anywhere in the page
  })
})
```

.get gets ALL matching elements, will be array if there are multiple

Implicit vs Explicit
.get implicitly asserts for existence, so explicit assertions with .should are not always necessary.

cy.get().get() does not work as one would expect, second .get() searches whole page. use .get().find() instead. .find made for chaining, can only be used after .get chain.

.click() to simulate click. By default, clicks center of element. If something is in the way of the element, click() will fail, unless you pass a force: true flag.

Each test runs in isolation in fresh environment.

## Setup & Adding Tests
npm install cypress
npx cypress open
Store tests (it()) in suites (describe())

## Adding Steps / Commands
Use the cy object to define the executable steps. 
Commands and queries can be chained.

## Selecting Elements
Select elements via CSS with queries - get() + find() 
Select by text via contains()

## Simulating User Interaction
Use actions like click() or type()

## Assertions
Many queries have built-in (implicit) assertions like get()
You can add explicit assertions via .should()
Add as many assertions as needed to test different flow states.


## Selecting Elements - The Best Practice Way

The best practice way for selecting elements is adding a custom attribute data-cy="something-something" to an element then using `cy.get('[data-cy="something-something"]'). Similar to id attribute it can be used to uniquely target elements. This attribute is only for testing purposes.

You can chain assertions after queries.

You can alias element or elements gotten from a query so you can reuse, like a variable. saving to a variable directly does not give you access to the element itself, but a wrapper object. Best practice is to use alias with .as(). 

To access the underlying element(s), you can use the .then method on queries. It gives you a callback you can run with the element passed to you as parameter.

The then() method can be chained after other Cypress queries to get direct access to the "subjects" of those queries. For example, the subject of get('form') would be the selected form element(s). Therefore, the concrete value received by the function passed to then() depends on the query before then(). When receiving an element (e.g., as it's the case for get('form').then(el => ...)), you can inspect that element inside of the function passed to then(). you actually get a "wrapper object" around the DOM element(s) that was / were selected.  you can also get (even more) direct access to the actual DOM element(s) via el[0] (for the first selected element), el[1] (for the second selected element, if available) etc.

You can simulate special key presses like so:
```javascript
cy.get('[data-cy="contact-input-email"]').type("john.doe@example.com{enter}");
```

## Time for Assertion
By default, 4 seconds is given for each assertion to see if condition is met.

blur means when an input loses focus. can be simulated with .blur(). Use focus() first before blur to maintain pointer status.

The application opened by npx cypress open is called Cypress Studio.

`npx cypress run` executes tests in headless mode, without showing you UI, just running the tests and giving you results. It then gives you videos of tests (and screenshots if failed test) in the cypress directory.

Sometimes tests can fail in headless mode that passed in studio mode. This is usually not because of actual test failures, but likely selecting bugs, try using different selectors especially if not using the data-cy attribute. .then can also be an issue. Prefer .should whenever possible.

you can use cy.screenshot() to take on-demand screenshots.

.should((el) => {}) works like .then and can be used in headless mode, you can write mocha/chai assertions inside.

## Selecting Elements
Prefer the data-cy attribute selector
It's less error-prone than other selectors

## Use Aliases
Re-use query results via aliases
Create and use aliases via as('name') & '@name'

## Get Element Access
Use then() for more direct element access
Use should(() => {}) if then() fails in headless mode

## Different Assertion Approaches
should() vs expect()
Some should()s yield new subjects for chaining (need to see docs)



You can use the cypress.config.js file to change configuration settings globally for all tests. If you only want to change config settings for a particular test suite or test you can pass an object as second argument to describe or it with config values.

# Timeouts
For every command Cypress waits X seconds to see if it succeeds.

You can specify browser to headless mode like this - `npx cypress run --browser chrome`, and also specify in config

# Custom Commands and Queries
custom command - shortcuts for more complex command chains
custom query - synchronous, chainable, retriable commands


All the testing code you write in .cy.js files are run in the browser to test the application. If you need to run things in node, maybe after the fact, then set up event listeners in the cypress.config.js file in setupNodeEvents.



## Cypress Configuration
Global & local (test or suite specific)
Set timeout values, browsers, baseUrl & more

## Hooks
before(), beforeEach() etc..
Test preparation or cleanup

## Custom Commands & Queries
Outsource shared logic & command combinations
Don't overuse these features

## Tasks
Allow you to run code outside of the browser
Example: Seed database, store data in files...


# Stub
A stub is a replacement for an existing function / method.


Note: the .then method is used to gain direct access to elements or the subject its targetting, because all cypress commands written in tests are compiled into something else before actualy being run in the browser later on.

you can use .get to get more than just dom element. you can get reference to stubbed functions so you can assert that they were called, etc

Fixtures
Fixtures are bits of json data that are shared across tests.

Spies
A listener that's attached to a function / method, used for evaluating / asserting function calls, does not change or replace the function (unlike stubs)

Manipulating the Clock
You can actually speed up time during testing, so that you don't have to wait the exact amount of time a user would wait inbetween actions. So if you hav set interval or set timeout, you can speed things up by using cy.clock and cy.tick.


## Stubs and Spies
Stubs: Replace existing methods
Spies: Add listeners to existing methods

## Fixtures
Store dummy testing data in central place
Access via fixture() and use in your tests

## Manipulating the Clock
Use cy.clock() to manipulate the clock
Then use cy.tick() to advance time


# Using databases
Your tests should not test production or development databases. You should make a testing database.  

Use dotenv-cli library to use different .env files to help with using the right database for the right environment.

To ensure test isolation, we should seed test database before each test.

We can use interceptors so we don't have to send actual http requests in tests. 

## Dealing with Network Requests
### Allow
Let the website do its requests
Potential Problem: Database is hit with test data
Solution: Use a separate testing database

### Intercept
Intercept + spy: Request passes & you can spy on it
Intercept + stub: Request is blocked & stub response is used

### Trigger Manually
Test API endpoints from inside your tests directly
Ideal for API testing or for decoupling frontend & backend



## Network Requests
Can be intercepted (and blocked)
Manually trigger requests for API testing

## Test Database
Should be used when hitting the database
Ensures test isolation & avoids breaking live data

## Authentication
Nothing special in general
Custom commands simplify your auth-dependent tests


Visit https://github.com/cypress-io/cypress-realworld-app for a real world example of a cypress test suite.

