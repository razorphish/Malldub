grunt.loadNpmTasks('grunt-sonar-runner');
grunt.initConfig({
  sonarRunner: {
              analysis: {
                  options: {
                      debug: true,
                      separator: '\n',
                      dryRun: false,
                      sonar: {
                          host: {
                              url: 'http://den.sonar.tfs.corp.epsilon.com:9000'
                          },
 
                          projectKey: 'Axis.UI:Dev',
                          projectName: 'Axis.UI',
                          projectVersion: '0.10',
                          sources: ['test'].join(','),
                          language: 'js',
                          sourceEncoding: 'UTF-8'
                      }
                  }
              }
          }
});