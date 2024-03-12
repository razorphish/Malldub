# Axis 2.0
Axis is a dealer enrollment program built 

## Requirements

- Install Node
- Open Windows Command
- Type `npm install -g node-inspector bower gulp`

## Quick Start
Prior to taking the course, clone this repo and run the content locally
```bash
$ npm install
$ bower install
$ npm start
```

## Troubleshooting
If you having trouble downloading bower components follow the steps given below based on the error you get.

*git config --global url."https://".insteadOf git://

if you are getting error like *'bower' is not recognized as an internal or external command, operable program or batch file, follow the steps given below:

Step 1: Execute command npm install �g bower
Step 2:	add User variable in Environment variables:
    1.	Variable name: NODE_PATH,   Value: %AppData%/npm/node_modules
    2.	Add Value: <%AppData folder path%>\Roaming\npm  to Variable name : path

if you are getting error meesage like  

*/ bower ECMDERR Failed to execute "git ls-remote --tags --heads git://github.com/rwjblue/ember-cli-test-loader.git", exit code of #128
Additional error details:
fatal: unable to connect to github.com:
github.com[0: 192.30.252.128]: errno=Operation timed out /*

follow the steps given below:

Step 1: execute command *bower cache-clean
Step 2: execute command *git config --global url."https://".insteadOf git://

# VS Code plugins >> JSCS Linter
The JSCS Linter is available in the Visual Studio Code Gallery. To install, press F1 and select Extensions: Install Extensions 
and then search for and select JSCS Linting.

Install JSCS in your workspace (or globally using the -g switch).
# install locally to the workspace
npm install jscs

Once installed, the JSCS Linter will automatically analyze your JavaScript files and return style warnings based on the rules you define in a .jscsrc file or in your settings

#Configuring the JSCS Linter
The best way to configure how the linter flags issues in your code is to create a .jscsrc file in the root of your workspace. The VS Code JSCS Linter will look for this file first and if no .jscsrc file is found it will look into your custom Settings.

Here are the available settings options:
Enable or disable the JSCS Linter for JavaScript files in this workspace.
"jscs.enable": boolean

The JSCS preset to use, possible values: airbnb, crockford, google, grunt, idiomatic, jquery, mdcs, node-style-guide, wikimedia, wordpress, yandex.
"jscs.preset": string

Disable the JSCS Linter if no .jscsrc configuration file is found, default is false.
"jscs.disableIfNoConfig": boolean

# VS Code plugins >> JSHINT
The JSHINT is available in the Visual Studio Code Gallery. To install, press F1 and select Extensions: Install Extensions 
and then search for and select JSHINT.