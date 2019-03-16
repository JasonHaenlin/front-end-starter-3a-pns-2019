require('dotenv').config()
const gulp = require('gulp');
const sonarqubeScanner = require('sonarqube-scanner');

gulp.task('sonar', function (callback) {
  sonarqubeScanner({
    serverUrl: process.env.SONAR_HOST_URL,
    token: process.env.SONAR_AUTH_TOKEN,
    options: {
      'sonar.projectKey': 'ps6-otake-front',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': '**/*.spec.ts',
      'sonar.exclusions': '**/*.module.ts, **/*.spec.ts',
      'sonar.typescript.tslint.configPath': 'tslint.json',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
    }
  }, callback);
});
