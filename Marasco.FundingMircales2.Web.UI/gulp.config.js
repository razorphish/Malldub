module.exports = function () {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var report = './report/';
    var root = './';
    var server = './src/server/';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({ devDependencies: true })['js'];

    var config = {
        /**
         * Files paths
         */
        alljs: [
            './src/**/*.js',
            './*.js',
            '!./Gruntfile.js',
            '!' + client + 'libraries/**/*.js',
            '!' + client + 'app/acs/**/*.js',
            '!' + client + 'app/core/ace.js',
            '!' + client + 'app/acs/**/*.js',
            '!' + client + 'ckeditor/**/*.js',
            '!' + client + '**/*.spec.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        build: './build/',
        ckeditor: client + 'ckeditor/**/*.*',
        client: client,
        css: [
            temp + 'styles.css',
            client + '**/*.css',
            '!' + client + 'ckeditor/**/*.css'],
        environmentConfig: client + 'environments.config/**/*.*',
        fonts: [
            './bower_components/font-awesome/fonts/**/*.*',
            './bower_components/bootstrap/fonts/**/*.*',
            client + 'fonts/**/*.*'
        ],
        favicon: server + 'favicon.ico',
        uigridfonts: [
            client + 'styles/ui-grid.*'
        ],
        html: clientApp + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        json: ['./src/client/app/**/*.json',
            '!./src/client/app/appConstants.json'],
        envJsonFile: 'appConstants.json',
        envJsonFolder: './src/client/environments.config/',
        jsonAll: ['./src/client/app/**/*.json'],
        index: client + 'index.html',
        js: {
            app: [
                clientApp + '**/*.module.js',
                clientApp + '**/*.js',
                '!' + clientApp + 'acs/**/*.js',
                '!' + clientApp + '**/*.spec.js'
            ],
            ace: [
                client + 'libraries/ace/*.js'
            ],
            custom: [
                client + 'libraries/**/*.js',
            ],
            ckeditor: [
                client + 'ckeditor/ckeditor.js'
            ]
        },
        less: client + 'styles/styles.less',
        report: report,
        root: root,
        server: server,
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js',
            ace: 'ace.js'
        },

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'ep.axis.core',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * specs.html, our HTML spec runner
         */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specs: [clientApp + '**/*.spec.js'],

        /**
         * Karma and testing settings
         */
        specHelpers: [client + 'test-helpers/*.js'],
        serverIntegrationSpecs: [
            client + 'tests/server-integration/**/*.spec.js',
            client + 'ckeditor/**/*.js'],

        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js'

    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
                ),
            exclude: [].concat(
                ),
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
