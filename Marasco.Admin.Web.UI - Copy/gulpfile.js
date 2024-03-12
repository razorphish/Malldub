var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({ lazy: true });
var port = process.env.PORT || config.defaultPort;
/**
 * Help task
 */
gulp.task('help', $.taskListing);

/**
 * Deafault Task: Injecting 'help'
 */
gulp.task('default', ['help']);

/**
 * JSCS Ace Task: Analyzing the ace.js file
 * with JSCS and JSHint
 */
gulp.task('jscs_ace', function () {
  return gulp.src('./src/client/app/core/ace.js')
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint({
      'camelcase': false,
      'maxcomplexity': false,
      'maxstatements': false,
      'globals': { '$': false, 'ace': false, 'Pace': false }
    }))
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.jshint.reporter('fail'));
});

/**
 * Vet Task: Analyzing all JS files
 * with JSCS and JSHint
 */
gulp.task('vet', ['jscs_ace'], function () {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.jshint.reporter('fail'));
});

/**
 * Styles Task: Compiling all the less files
 * to css files
 */
gulp.task('styles', ['clean-styles'], function () {
  log('Compiling Less --> CSS');

  return gulp
    .src([config.less])
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
    .pipe(gulp.dest(config.temp));
});
/**
* Fonts Task: Copying fonts from
* './bower_components/font-awesome/fonts/',
* './bower_components/bootstrap/fonts/',
* './src/client/fonts/' folders
* to './build/fonts/' folder
*/
gulp.task('fonts', ['clean-fonts'], function () {
  log('Copying fonts');

  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * UI-Grid Fonts Task: Copying UI-Grid fonts from
 * './src/client/styles/' folder to
 * './build/styles/' folder
 */
gulp.task('ui-grid-fonts', ['clean-ui-grid-fonts'], function () {
  log('Copying UI-Grid fonts');
  return gulp
    .src(config.uigridfonts)
    .pipe(gulp.dest(config.build + 'styles'));
});
/**
* Images Task: Copying images from
* './src/client/images/' folder to
* './build/images/' folder
* and compressing them to optimization level 4
*/
gulp.task('images', ['clean-images'], function () {
  log('Copying and compressing the images');

  return gulp
    .src(config.images)
    .pipe($.imagemin({ optimizationLevel: 4 }))
    .pipe(gulp.dest(config.build + 'images'));
});
/**
* Web Config Task: Copying web.config to
* './build/' folder
*/
gulp.task('web.config', ['clean-webconfig'], function () {
  log('Copying Web.Config');
  return gulp
    .src('./Web.config')
    .pipe(gulp.dest(config.build));
});

gulp.task('clean-webconfig', function (done) {
  clean(config.build + 'Web.config', done);
});

/**
 * Favicon Task: Copying favicon.ico from
 * './src/server/' to
 * './build/' folder
 */
gulp.task('favicon.ico', ['clean-favicon'], function () {
  log('Copying favicon.ico');
  return gulp
    .src(config.favicon)
    .pipe(gulp.dest(config.build));
});

gulp.task('clean-favicon', function (done) {
  clean(config.build + 'favicon.ico', done);
});

/**
 * CKEditor Migrate Task: Migrating ckeditor
 * and files from
 * './src/client/ckeditor/' folder to
 * './build/ckeditor' folder
 */
gulp.task('ckeditor-migrate', ['clean-ckeditor-migrate'], function () {
  log('Migrating ckeditor and files');
  return gulp
    .src(config.ckeditor)
    .pipe(gulp.dest(config.build + 'ckeditor'));
});

/**
 * Environment config migrate: Migrating environment config
 * and files from
 * './src/client/app/environments.config/' folder to
 * './build/environments.config' folder
 */
gulp.task('environment-config-migrate', ['clean-environment-config'], function () {
  log('Migrating environment config files');
  return gulp
    .src(config.environmentConfig)
    .pipe(gulp.dest(config.build + 'environments.config'));
});
/**
 * JSON Task: Copying all json files from
 */
/*jshint maxcomplexity:10 */
gulp.task('json', ['clean-json'], function () {
  log('Copying and json files');
  log('Json Files cleaned: ' + config.json);
  var prefix;
  var env = args.env;
  var configJson = config.json;

  if (env === 'all') {
    configJson = config.jsonAll;
  } else {
    switch (env) {
      case 'dev':
        prefix = 'Development.';
        break;
      case 'qa':
      case 'qatest':
      case 'stag':
      case 'stage':
        prefix = 'QA.';
        break;
      case 'prod':
      case 'production':
        prefix = 'Production.';
        break;
      default:
        prefix = 'Local.';
        break;
    }

    log(prefix);
    log(config.envJsonFolder + prefix + config.envJsonFile);
    gulp
      .src(config.envJsonFolder + prefix + config.envJsonFile)
      .pipe($.rename(config.envJsonFile))
      .pipe(gulp.dest(config.build + 'app'));
  }

  return gulp
    .src(configJson)
    .pipe(gulp.dest(config.build + 'app'));
});

gulp.task('clean', function (done) {
  var delconfig = [].concat(config.build, config.temp);
  log('Cleaning: ' + $.util.colors.blue(delconfig));
  del(delconfig, done);
});

/**
 * Clean Fonts Task: Cleaning fonts from
 * './build/fonts/../' folder
 */
gulp.task('clean-fonts', function (done) {
  clean(config.build + 'fonts/**/*.*', done);
});

/**
 * Clean UI Grid Fonts Task: Cleaning ui-grid-fonts
 * from './build/styles/../' folder
 */
gulp.task('clean-ui-grid-fonts', function (done) {
  clean(config.build + 'styles/**/*.*', done);
});

/**
 * Clean Images Task: Cleaning images from
 * './build/images/../' folder
 */
gulp.task('clean-images', function (done) {
  clean(config.build + 'images/**/*.*', done);
});

/**
 * Clean CKEditor Migrate Task: Cleaning ckeditor
 * and files from './build/ckeditor' folder
 */
gulp.task('clean-ckeditor-migrate', function (done) {
  clean(config.build + 'ckeditor', done);
});

/**
 * Clean JSON Task: Cleaning json files from
 * './build/app/../' folder
 */
gulp.task('clean-json', function (done) {
  clean(config.build + 'app/**/*.json', done);
});

/**
 * Clean JSON Task: Cleaning environment config files
 * './build/app/environments.config/..' folder
 */
gulp.task('clean-environment-config', function (done) {
  clean(config.build + 'environments.config', done);
});

/**
 * Clean Styles Task: Cleaning all css files
 * from './.tmp/../' folder
 */
gulp.task('clean-styles', function (done) {
  clean(config.temp + '**/*.css', done);
});

/**
 * Clean Code Task: Cleaning JS and HTML files
 * from './.tmp/../', './build/../' and
 * './build/js/../' folder
 */
gulp.task('clean-code', function (done) {
  var files = [].concat(
    config.temp + '**/*.js',
    config.build + '**/*.html',
    config.build + 'js/**/*.js'
  );
  clean(files, done);
});

/**
 * LESS Watcher Task: Watching less file at
 * './src/client/styles/styles.less' and
 * returning them to Style Task
 */
gulp.task('less-watcher', function () {
  gulp.watch([config.less], ['styles']);
});

/**
 * Template Cache Task: Copying html files
 * from './src/client/app/../' folder to
 * './.tmp/../' folder after minifying them
 * and loaded them directly to the cache
 */
gulp.task('templatecache', ['clean-code'], function () {
  log('Creating AngularJS $templateCache');

  return gulp
    .src(config.htmltemplates)
    .pipe($.htmlmin({ empty: true }))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.temp));
});

/**
 * Wiredep Task: Wire up the bower css js and
 * app.js files into index.html
 */
gulp.task('wiredep', function () {
  log('Wire up the bower css js and our app js into the html');
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js.app)))
    .pipe($.inject(gulp.src(config.js.ckeditor,
      { read: false }),
      { starttag: '<!-- inject:js:ckeditor -->' }))
    .pipe($.inject(gulp.src([]
      .concat(
      config.js.ace,
      config.js.custom),
      { read: false }),
      { starttag: '<!-- inject:js:ace -->' }))
    .pipe(gulp.dest(config.client));
});

/**
 * Inject Task: Injecting app css to index.html and calling
 * the wiredep task (for injecting bower, css, js and app.js
 * files to index.html file
 */
gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
  log('Wire up the app css into the html, and call wiredep ');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe(gulp.dest(config.client));
});

/**
 * Build Task: Building all the images, fonts, web.config,
 * favicon.ico, ui-grid-fonts, json and ckeditor files.
 */
gulp.task('build', ['optimize', 'images', 'fonts', 'web.config', 'favicon.ico', 'ui-grid-fonts',
  'json', 'ckeditor-migrate', 'environment-config-migrate'], function () {
    log('Building everything');

    var msg = {
      title: 'gulp build',
      subtitle: 'Deployed to the build folder',
      message: 'Running `gulp serve-build`'
    };
    log('Cleaning: ' + $.util.colors.blue(config.temp));
    del(config.temp);
    log(msg);
    notify(msg);
  });

/**
 * Serve Specs Task: Running the spec runner for dev env
 */
gulp.task('serve-specs', ['build-specs'], function (done) {
  log('run the spec runner');
  serve(true /* isDev */, true /* specRunner */);
  done();
});

/**
 * Build Specs Task: Injecting the testlibraries, spechelpers,
 * specs and templates to spec.html
 */
gulp.task('build-specs', ['templatecache'], function () {
  log('building the spec runner');

  var wiredep = require('wiredep').stream;
  var options = config.getWiredepDefaultOptions();
  var specs = config.specs;

  options.devDependencies = true;

  if (args.startServers) {
    specs = [].concat(specs, config.serverIntegrationSpecs);
  }

  return gulp
    .src(config.specRunner)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.testlibraries),
      { name: 'inject:testlibraries', read: false }))
    .pipe($.inject(gulp.src([].concat(config.js.app, config.js.custom))))
    .pipe($.inject(gulp.src(config.specHelpers),
      { name: 'inject:spechelpers', read: false }))
    .pipe($.inject(gulp.src(specs),
      { name: 'inject:specs', read: false }))
    .pipe($.inject(gulp.src(config.temp + config.templateCache.file),
      { name: 'inject:templates', read: false }))
    .pipe(gulp.dest(config.client));
});

/**
 * Optimize Task: Optimizing the JS, CSS and HTML files
 */
gulp.task('optimize', ['inject', 'test'], function () {
  log('Optimizing the javascript, css, html');

  var assets = $.useref.assets({ searchPath: './' });
  var templateCache = config.temp + config.templateCache.file;
  var cssFilter = $.filter('**/*.css');
  var jsLibFilter = $.filter('**/' + config.optimized.lib);
  var jsAppFilter = $.filter('**/' + config.optimized.app);
  var jsAceFilter = $.filter('**/' + config.optimized.ace);

  return gulp
    .src(config.index)
    .pipe($.plumber())
    .pipe($.inject(
      gulp.src(templateCache, { read: false }), {
        starttag: '<!-- inject:templates:js -->'
      }))
    .pipe(assets)
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(jsLibFilter)
    .pipe($.uglify())
    .pipe(jsLibFilter.restore())
    .pipe(jsAppFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsAppFilter.restore())
    .pipe(jsAceFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsAceFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(config.build))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(config.build));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
  var msg = 'Bumping versions';
  var type = args.type;
  var version = args.version;
  var options = {};
  if (version) {
    options.version = version;
    msg += ' to ' + version;
  } else {
    options.type = type;
    msg += ' for a ' + type;
  }
  log(msg);

  return gulp
    .src(config.packages)
    .pipe($.print())
    .pipe($.bump(options))
    .pipe(gulp.dest(config.root));
});

/**
 * Serve Build Task: Serving the build
 */
gulp.task('serve-build', ['build'], function () {
  serve(false /* isDev */);
});

/**
 * Serve Dev Task: Serving the dev and calling
 * inject task
 */
gulp.task('serve-dev', ['inject'], function () {
  serve(true /* isDev */);
});

/**
 * Test Task: Testing and calling
 * the vet and templatecache task
 */
gulp.task('test', ['vet', 'templatecache'], function (done) {
  startTests(true /* singleRun */, done);
});

/**
 * Auto Test Task: Testing and calling
 * the vet and templatecache task
 */
gulp.task('autotest', ['vet', 'templatecache'], function (done) {
  startTests(false /* singleRun */, done);
});

////////////

/**
 * Serve Function: Serving the node requests for
 * dev and build environment
 * --restart: nodemon restarted and browserSync has been called
 * --start: nodemon started and startBrowserSync has been called
 * --crash: nodemon crashed due to script scrashed for some reason
 * --exit: nodemon exited
 */
function serve(isDev, specRunner) {
  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: [config.server]
  };

  return $.nodemon(nodeOptions)
    .on('restart', function (ev) {
      log('*** nodemon restarted');
      log('files changed on restart:\n' + ev);
      setTimeout(function () {
        browserSync.notify('reloading now ...');
        browserSync.reload({ stream: false });
      }, config.browserReloadDelay);
    })
    .on('start', function () {
      log('*** nodemon started');
      startBrowserSync(isDev, specRunner);
    })
    .on('crash', function () {
      log('*** nodemon crashed: script crashed for some reason');
    })
    .on('exit', function () {
      log('*** nodemon exited cleanly');
    });
}

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * notify Function: Notifies about the gulp events
 */
function notify(options) {
  var notifier = require('node-notifier');
  var notifyOptions = {
    sound: 'Bottle',
    contentImage: path.join(__dirname, 'gulp.png'),
    icon: path.join(__dirname, 'gulp.png')
  };
  _.assign(notifyOptions, options);
  notifier.notify(notifyOptions);
}

/**
 * startBrowser Function: Starting the browser and syncs the files
 * for dev and non dev environments
 */
function startBrowserSync(isDev, specRunner) {
  if (args.nosync || browserSync.active) {
    return;
  }

  log('Starting browser-sync on port ' + port);

  if (isDev) {
    gulp.watch([config.less], ['styles'])
      .on('change', changeEvent);
  } else {
    gulp.watch([config.less, config.js.app, config.html], ['optimize', browserSync.reload])
      .on('change', changeEvent);
  }

  var options = {
    proxy: 'localhost:' + port,
    port: 8001,
    files: isDev ? [
      config.client + '**/*.*',
      '!' + config.less,
      config.temp + '**/*.css'
    ] : [],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0 //1000
  };

  if (specRunner) {
    options.startPath = config.specRunnerFile;
  }

  browserSync(options);
}

/**
 *Start Tests
 */
function startTests(singleRun, done) {
  var child;
  var fork = require('child_process').fork;
  var karma = require('karma').server;
  var excludeFiles = [];
  var serverSpecs = config.serverIntegrationSpecs; //TODO

  if (args.startServers) { // gulp test --startServers
    log('Starting server');
    var savedEnv = process.env;
    savedEnv.NODE_ENV = 'dev';
    savedEnv.PORT = 8888;
    child = fork(config.nodeServer);
  } else {
    if (serverSpecs && serverSpecs.length) {
      excludeFiles = serverSpecs;
      log(excludeFiles);
    }
  }

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    exclude: excludeFiles,
    singleRun: !!singleRun
  }, karmaCompleted);

  function karmaCompleted(karmaResult) {
    log('Karma completed!');
    if (child) {
      log('Shutting down the child process');
      child.kill();
    }
    if (karmaResult === 1) {
      done('karma: tests failed with code ' + karmaResult);
    } else {
      done();
    }
  }
}

/**
 * clean Function: Cleans up the paths specified
 */
function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}

/**
 * log Function: Logs the messages with the font color blue
 */
function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
