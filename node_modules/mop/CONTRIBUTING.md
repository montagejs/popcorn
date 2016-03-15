Contributing
============

Releasing
---------

 * Testing
     - `rm -rf node_modules; npm install` to make sure you're testing the
        latest deps
     - `npm test`
     - `MOP_VERSION=. MR_VERSION=latest npm run integration`
     - `MOP_VERSION=. MONTAGE_VERSION=latest npm run integration`
     - these should have been covered by Travis before any code was merged, but
       nice to double check.
 * Docs
    - Update `CHANGES.md`
    - Update supported Montage and Mr versions at the top of the `README.md`
 * Publish
     - `npm version patch` or other variation of `npm version`
     - `npm publish`
     - `git push origin master`
     - `git push origin --tags`
 * Publicity
     - Post to mailing list
     - Tweet from @montagejs
