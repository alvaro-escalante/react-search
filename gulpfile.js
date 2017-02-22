'use strict'
// File paths
const paths = {
	templates: {
		src: 'src/',
		dest: 'dist/'
	},
	images: {
	  src:  'src/static/img/',
	  dest: 'dist/static/img/'
	},
	scripts: {
		src:  'src/static/js/',
		dest: 'dist/static/js/'
	},
	styles: {
		src:  'src/static/sass/',
		dest: 'dist/static/css/'
	},
	assets: {
		src:  'src/static/assets/',
		dest: 'dist/static/assets/'
	},
	bower: {
  	src:  'src/static/bower_components/',
  	dest: 'dist/static/bower_components/'
	}
};

// Initialization
const gulp = require('gulp'),
			source = require('vinyl-source-stream'),
			friendlyFormatter = require("eslint-friendly-formatter"),
			$ = require('gulp-load-plugins')({
			    pattern: '*',
			    camelize: true
			}),
			prefix = { browsers: [
				'iOS >= 8',
				'Chrome >= 30',
				'Explorer >= 11',
				'Last 2 Edge Versions',
				'Firefox >= 25'
			]},
			browserSync = $.browserSync.create(),
			reuseTab = require('browser-sync-reuse-tab')(browserSync),
			build = !!$.util.env.build;


// CSS - SASS
gulp.task('styles',() => {
	const onError = function(err) {
		$.notify({
			title: 'CSS Error',
			subtitle: 'Syntax error in CSS!',
			message: err.message,
			sound: 'Beep'
		}).write(err);
		this.emit('end');
	};

  gulp.src(paths.styles.src + 'styles.sass')
  	.pipe($.plumber({errorHandler: onError}))
  	.pipe($.newer(paths.styles.dest))
		.pipe(build ? $.util.noop() : $.sourcemaps.init())
  	.pipe($.sass())
  	.pipe($.concat('styles.min.css'))
  	.pipe(build ? $.autoprefixer(prefix) : $.util.noop())
  	.pipe(build ? $.bytediff.start() : $.util.noop())
  	.pipe(build ? $.cssnano() : $.util.noop())
  	.pipe(build ? $.bytediff.stop() : $.util.noop())
  	.pipe(build ? $.util.noop() : $.sourcemaps.write('./_maps'))
  	.pipe(gulp.dest(paths.styles.dest))
  	.pipe(browserSync.stream({match: '*.css'}));
});

// REACT.JS - Scripts 
gulp.task('scripts',() => {
	//Map errors
	const mapError = function(error) {
		return $.notify({
			title: 'Javascript Error',
			subtitle: 'Syntax error in script!',
			message: error,
			sound: 'Beep',
			icon: 'node_modules/gulp-notify/assets/gulp-error.png'
		}).write(error);
		this.emit('end');
	},
	// Completes the final file outputs
	bundle = browserify => {
  	browserify
  	.bundle()
  	.on('error', mapError) // Map error reporting
  	.pipe(source('main.jsx')) // Set source name
  	.pipe($.vinylBuffer()) // Convert to gulp pipeline
  	.pipe(build ? $.bytediff.start() : $.util.noop())
  	.pipe(build ? $.uglify({mangle: {except: ['dataLayer']}}) : $.util.noop())
  	.pipe(build ? $.bytediff.stop() : $.util.noop())
  	.pipe($.rename('main.min.js')) // Rename the output file
  	.pipe(gulp.dest(paths.scripts.dest)) // Set the output folder
  	.pipe($.duration(('Scripts compiled time'))) // Output time timing of the file creation
  	.pipe(browserSync.stream()); // Reload the view in the browser
	}
  const browserify = $.browserify(paths.scripts.src + 'main.jsx') // Browserify
    .plugin($.watchify) 
    .transform($.eslintify)
    .transform($.babelify);
  
  bundle(browserify); // Run the bundle the first time (required for Watchify to kick in)
  browserify.on('update',() => bundle(browserify)) // Re-run bundle on source updates
});	

// HTML 
gulp.task('html',() => {
  gulp.src(paths.templates.src + '**/*.php')
  	//.pipe($.htmlmin({collapseWhitespace: true, minifyJS: true, minifyCSS: true}))
  	.pipe($.newer(paths.templates.dest))
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(browserSync.stream());
});

// Images
gulp.task('images',() => {
  gulp.src(paths.images.src + '**/*',{base: paths.images.src})
    .pipe($.plumber(function(error) {
        $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
        this.emit('end');
    }))
    .pipe($.newer(paths.images.dest))
    .pipe(build ? 
    	$.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }) :
    	$.util.noop())
    .pipe(gulp.dest(paths.images.dest))
});

// Assets
gulp.task('assets',() => {
  gulp.src(paths.assets.src + '**/*') 
  	.pipe($.newer(paths.assets.dest))
  	.pipe(gulp.dest(paths.assets.dest));
});

// Bower
gulp.task('bower',() => gulp.src(paths.bower.src + '**/*').pipe(gulp.dest(paths.bower.dest)));

// Minify React library for production
gulp.task('prod-environment', () => process.env.NODE_ENV = 'production');

// Clear Cache
gulp.task('clear',() => $.cache.clearAll());

// Clean destination dir and clear cache
gulp.task('clean', ['clear'], (done) => {
	$.del.sync([paths.templates.dest + '*']);
	done();
});

// BrowserSync 
gulp.task('browser-sync', ['scripts'], () => {
	browserSync.init(paths.styles.dest + '*.css', {
		server: './dist/',
		notify: false, // Will not show notify banner on reload or injected
		open: false, // Will not open a browser window automatically
		online: false // Will not attempt to determine your network status
	}, reuseTab);
	// Watchers
	gulp.watch(paths.styles.src + '**/*.sass', ['styles']);
	gulp.watch(paths.templates.src + '**/*.php', ['html']);
	gulp.watch(paths.images.src + '**/*', ['images']).on('change', browserSync.reload);
	gulp.watch(paths.assets.src + '**/*', ['assets']).on('change', browserSync.reload);
});

// Default development version task 
gulp.task('default', ['clean', 'styles', 'images', 'html', 'assets', 'bower'], () => {
  gulp.start('browser-sync');
});

// Production build useage gulp pro --build
gulp.task('pro', ['prod-environment', 'clean', 'styles', 'images', 'html', 'assets', 'bower'], () => {
  gulp.start('browser-sync');
});