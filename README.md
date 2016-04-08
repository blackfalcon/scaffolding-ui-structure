## Gulp Starter

This is a starter project template that uses LibSass to compile Sass with Gulp.

## Project Setup

* Clone the repo

```
$ git clone https://github.com/blackfalcon/gulp-sass-demo.git
```

* Install Node dependencies

```
$ npm install
```

## About the Gulpfile

#### Sass or SCSSS, you choose! 

```
gulp.src('./scss/{,*/}*.{scss,sass}')
```

By using this combination of file types, you can use either the Sass or SCSS syntax in your application. WIN!

#### Output style

```
outputStyle: 'expanded', //alt options: nested, compact, compressed
```

Here you can set the different output styles you want for your application. In development you may want `expanded`, but for a production build, you would want to use `compressed`. Other options include `nested` and `compact`, because ... things. 

#### includePaths:

You WILL want to include additional libraries to assist in the building of your CSS codes and Bourbon is a leading library to use. After installing `node-bourbon`, the library will be placed in a relative location in `node_modules`. While you *could* import the lib via a relative path in your Sass, why would you?

The preferred method is to use the following within your `.pipe(sass())` options:

```
includePaths: require('node-bourbon').includePaths
```

Now in your Sass, simple refer to the lib via `@import "bourbon"` and profit!


#### Autoprefixer

If you are not using Autoprefixer, what are you waiting for? This really is the best solution ever for dealing with vendor prefixing support. 

In this repo, there are two examples of how to use this with your project. There is a stand-alone version, `gulp-autoprefixer` and then there is the version that is scoped within the `posts` function. Read the comments in the `gulp file.js` for details. 

For the standalone: 

```
.pipe(gulpautoprefixer({ browsers: ['last 4 versions'], cascade: false }))
```

Within the Postcss function scope:

```
.pipe(postcss([
  autoprefixer({ browsers: ['last 4 versions'], cascade: false })
]))
```

#### Sourcemaps

```
.pipe(sourcemaps.write('.'))
```

Sourcemaps are the essential debugging tool for Sass. Fully supported by Chrome inspector. This particular setting will tell Sass to generate the sourcemaps and place it in the same directory location as the generated CSS file. 

This also requires the following header reference:

```
var sourcemaps = require('gulp-sourcemaps');
```

It also requires `gulp-sourcemaps` npm package be installed as well (see package.json). 

For more information on using Sourcemaps and Sass, please read [Using Source Maps to Debug Sass in Chrome](http://www.sitepoint.com/using-source-maps-debug-sass-chrome/)

#### Set your destination

The output CSS can be placed anywhere in your application, simple adjust this location argument: 

```
.pipe(gulp.dest('./css'));
```

## Usage

The gulpfile in this project is setup to run `gulp-sass` and to watch the Sass file for changes. Use the `gulp` command to run a single process.

```
$ gulp
```

Run `$ gulp build:css` to target the Sass processing task specifically. 

Run `$ gulp sass:watch` to run the watcher.

__BEWARE__ the gulp watcher is pretty sensitive, if you are running the watcher and you notice that your views are not updating with new CSS, you may have caused an error in the Sass output and this may gave crashed the watcher. Keep an eye on the terminal. 