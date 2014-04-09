montage-native
==============

This is the Montage package template.

Note: Before working on your package you will need to add montage to it.

```
npm install .
```

Layout
------

The template contains the following files and directories:

* `ui/` – Directory containing all the UI .reel directories.
* `package.json` – Describes your app and its dependencies
* `README.md` – This readme. Replace the current content with a description of your app
* `overview.html`
* `overview/` – Directory that contains the files for the overview page. This is a different package so you will need to require the component using montage-native/*.
  * `main.reel` – The main interface component where you can add the components to show.
* `node_modules/` – Directory containing all npm packages needed, including Montage. Any packages here must be included as `dependencies` in `package.json` for the Montage require to find them.
* `test/` – Directory containing tests for your package.
  * `all.js` – Module that point the test runner to all your jasmine specs.
* `run-tests.html` – Page to run jasmine tests manually in your browser
* `testacular.conf.js` – This is the testacular configuration file. You can start testacular by running `node_modules/testacular/bin/testacular start`

Create the following directories if you need them:

* `locale/` – Directory containing localized content.
* `scripts/` – Directory containing other JS libraries. If a library doesn’t support the CommonJS "exports" object it will need to be loaded through a `<script>` tag.

