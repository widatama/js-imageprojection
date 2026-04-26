require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
    moduleResolution: 'node',
  },
});

const GlobalsPolyfills = require('@esbuild-plugins/node-globals-polyfill').default;
const NodeModulesPolyfills = require('@esbuild-plugins/node-modules-polyfill').default;
const karmaEsbuild = require('karma-esbuild');
const karmaFirefoxLauncher = require('karma-firefox-launcher');
const karmaTap = require('karma-tap');
const karmaTapPrettyReporter = require('karma-tap-pretty-reporter');

module.exports = (config) => {
  config.set({
    plugins: [karmaEsbuild, karmaFirefoxLauncher, karmaTap, karmaTapPrettyReporter],
    browsers: ['FirefoxHeadless'],
    frameworks: ['tap'],
    reporters: ['tap-pretty'],
    tapReporter: {
      prettifier: 'tap-summary',
    },
    files: [
      './test/**/*.test.ts',
      { pattern: './test/test-image.png', watched: false, included: false, served: true },
    ],
    preprocessors: {
      './test/**/*.test.ts': ['esbuild'],
    },
    esbuild: {
      plugins: [GlobalsPolyfills({ process: true }), NodeModulesPolyfills()],
    },
    client: {
      captureConsole: true,
    },
    port: 9899,
    autoWatch: false,
    singleRun: true,
    colors: true,
  });
};
