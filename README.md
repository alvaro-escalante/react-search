Web Development Tools - Search - ReactJS, SASS and GTM
===============

<img src="http://studiolance.co.uk/git/reactjs-gtm.jpg" width="600px">
<img src="http://studiolance.co.uk/git/reactjs-search.jpg" width="600px">

A search application written with ReactJS to view technology tools and languages used for web development.
And an implementation of GTM to track virtual page views, seach and click interations.


Live example
------------

<a target="_blank" href="https://notoriousseo.com/alvaro/react-search/">react-search</a>


Quick start
-----------

Clone the repo and run 'npm run setup'. For all subsequent uses, just run 'gulp'.

For production run gulp pro --build to minified react version and uglify as well as picture compression

Note, Windows users may need to run the initial command more than once for it to complete successfully.

General usage notes
-------------------

- Make all changes in src/ directory, minified/compressed stuff is then output by gulp to dist/ (dist/ is deleted everytime gulp is run).
- Images should be put in src/static/img/. Gulp will apply compression without reducing their quality.
- JavaScript should go in src/static/js/main.jsx. Gulp will perform eslint on your code and compress main.min.js (and any other js files in that directory) into a single, minified js file.


Use of Gulp
------------

There is a `gulpfile.js` within this repository to make development much. All you need to do is:

- Install Node (http://nodejs.org) & Gulp (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- Run `npm run setup`

This will install all the dependencies found in `package.json` (The `node_modules` folder that is generated when you run this command should be created on a case-by-case basis and not pushed to a repository), install the Bower dependencies found in `package.json` and run the local server through the `gulp` command.

Note for Windows users with Git Bash: you may need to run 'npm run setup' a couple of times for it to finally work.
  
This will open up a tab in your browser, running a server at `localhost:3000` (unless you have set up a proxy server address - details on how to change this are in the `gulpfile.js` file).

Gulp features
-------------

Name | Version | Description
--- | --- | ---
**babel-eslint** | ^7.0.0 | Babel-eslint allows you to lint ALL valid Babel code with the ESLint
**babel-plugin-add-module-exports** | ^0.2.1 | Adds module exports support for Babel
**babel-plugin-react-html-attrs** | ^2.0.0 | Transforms HTML attributes in JSX to their React equivalents
**babel-plugin-transform-class-properties** | ^6.16.0 | Transforms ES5 static class properties and allows ES6 syntax
**babel-preset-es2015** | ^6.16.0 | Babel preset to make node@6 fully ES2015 compatible
**babel-preset-react** | ^6.16.0 | Transforms React JSX to their React equivalents
**babelify** | ^7.3.0 | Uses next generation JavaScript ES6
**bower** | ^1.5.2 | Package manager
**browser-sync** | ^2.16.1 | Local server enabling instant DOM injection to all devices connected when a file is changed
**browserify** | ^13.1.0 | Recursively analyze all the require() calls and build a bundle in a single script tag
**del** | ^1.2.1 | Enables the deleting of files
**eslint-friendly-formatter** | ^2.0.6 | Simple formatter/reporter for eslint 
**eslint-plugin-react** | ^6.4.1 | React specific linting rules for ESLint
**eslintify** | ^3.1.0 | Stream module for verifying JavaScript programs with ESLint and browserify
**fs** | 0.0.1-security | File system module for the File generation task 
**gulp** | ^3.9.1 | Task runner to automate various tasks
**gulp-autoprefixer** | ^3.1.1 | Adds prefixes to css after conversion.
**gulp-bytediff** | ^0.2.1 | Shows a the difference between file sizes before and after gulp tasks have run
**gulp-cache** | ^0.2.10 | Enables caching of piped files to prevent tasks being run unnecessarily
**gulp-concat** | ^2.6.1 | Concatenates files
**gulp-cssnano** | ^2.1.2 | Minifies CSS files to reduce file sizes
**gulp-duration** | 0.0.0 | Track the duration of parts of your gulp tasks
**gulp-htmlmin** | ^3.0.0 | Minifies html files (including its JS and CSS) to reduce file sizes
**gulp-imagemin** | ^2.4.0 | Compresses images - packaged with gifsicle, jpegtran, optipng, and svgo
**gulp-load-plugins** | ^1.3.0 | Handles the `require()` functions for all plugins in `package.json`
**gulp-newer** | ^0.5.2 | Ensure that gulp tasks only run on files that have changed rather than all files
**gulp-notify** | ^2.2.0 | Enables the use of native notifications to display when tasks are complete
**gulp-plumber** | ^1.1.0 | Prevent pipe breaking caused by errors from gulp plugins
**gulp-rename** | ^1.2.2 | Allows files to be renamed via JS
**gulp-sass** | ^2.3.2 | Sass plugin for Gulp
**gulp-sourcemaps** | ^1.6.0 | Maps CSS styles in Less for the browser console
**gulp-uglify** | ^2.0.0 | Minifies JS files
**gulp-util** | ^3.0.7 | Utility functions for gulp plugins
**react** | ^15.3.2 | An npm package to get you immediate access to React,
**react-dom** | ^15.3.2 | An npm package to get you immediate access to ReactDOM
**stream-combiner2** | ^1.1.1 | Utility functions for gulp plugins
**util-merge** | ^1.0.0 | Simple merge function, acts as the Object.assign
**vinyl-buffer** | ^1.0.0 | Convert streaming vinyl files to use buffers
**vinyl-source-stream** | ^1.1.0 | Use conventional text streams at the start of your gulp or vinyl pipelines
**watchify** | ^3.7.0 | Update any source file and your browserify bundle will be recompiled on the spot

### BrowserSync
  
The main component of this Gulp setup is BrowserSync. This plugin provides the following advantages for development:  
* Simultaneous page scrolling for all devices connected to the same link  
* Clicking links or populating form fields on one device will duplicate this behaviour on all other linked devices  
* A dashboard at `localhost:3001` where you can send commands to all connected devices, perform actions and do network throttle testing.

