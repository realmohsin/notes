the "real" width and height of an svg is set by the internals.
the height and width of the outside svg element represents size of the 'window' over the real
svg's size.
if given a viewBox attribute, that together with the width and height scales the window and underlying coordinate system.

the above mechanics are not completely necessary to understand.  For webdev we primarly just need to take an svg and be able to size it correctly and change it's color based on some state.

Ways to use svgs in react - https://blog.logrocket.com/how-to-use-svgs-react/ 
Use the above resource and after you learn webpack, understand the various methods and the corresponding plugins/loaders and configurations needed

arguably the best way to use svg's in react is by treating them as components. (this is similar to just inlining svgs). You can wrap the svg manually in a react component function, or make this workflow easier by using SVGR through webpack. SVGR transforms svg's into react components for you, stripping unnecessary metadata. See https://react-svgr.com/docs/webpack/ for how to implement in webpack project.

Note: The following had to be done in Uptycs repo to import svgs - 
import { ReactComponent as TotalAssetsIcon } from "../../total-assets-icon.svg"
^ while in the svgr-webpack docs it shows you can use default export with no ReactComponent needing to be specified. Need to look into this more.

Going back to solving our two main concerns - sizing it as we need it, and changing color possibly based on state. To do this with component strategy - ensure that the viewBox by itself captures the entire svg. Then set the width and height of the svg element to both be 100%, then set fill attributes inside to be 'currentColor'. Now with that in place, you can change the size and color of the container of the svg and to affect the svg.

Performance concern? Using svg's through image elements might be better performance because it will be loaded separately through an API call, whereas using svg's as a react component means it will be inlined in the html. Right? Maybe small SVG's above the fold should be inlined, but larger ones below the fold should in image elements? How would lazy loading work? Can that be a thing here?