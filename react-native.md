React Native gives you collection of special React components that are compiled to native UI elements for Android and iOS platforms. 
React Native exposes certain native platform APIs to JavaScript. 
React Native is like react-dom - it connects React to a specific platform.


react-dom       android                iOS              React Native
<div>           android.View           UIView           <View>
<input>         android.EditText       UITextField      <TextInput>

React Native maps (and compiles) re-usable components to respective platform equivalents.


UI Elements are compiled to native views. But the logic, JavaScript code outside of components, are NOT compiled, instead they are executed in a JavaScript thread thats hosted by React Native in the native app that was built. React Native spins up a JavaScript process as part of the native app that's being built, and it manages this process for you, and allows this process to talk to the underlying native platform.

Expo is a framework that provides features like file-based routing, universal libraries and the ability to write plugins that modify native code without having to manage native files. 

You can eject out of Expo and use React Native CLI if needed. One advantage of React Native CLI is that it integrates with native code better if that is needed.

```bash
npx create-expo-app --template blank <project-name>
``` 
