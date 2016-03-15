Montage Testing
===============================

MontageJS uses some pure unit tests that are straightforward [Jasmine specs][1].

 To install the test code, run `npm install` in your project folder. This installs
 the [montage-testing][2] package, which adds some useful utilities for writing
 jasmine tests. You will need the file run-tests.html.

 For an example of how we implement unit testing, see the [digit][3] repository:

 * [run-tests][4] loads our test environment.
 * `data-module="test/all"` inside the final script tag tells the system to load [test/all.js][5].
 * all.js specifies a list of module ids for the runner to execute.

 >Note that in this example, all the tests load a page in an iframe using
 `TestPageLoader.queueTest()`. These are akin to integration tests since they test
 the component in a real environment.

 We also test some components by [mocking their dependencies][6].


 [1]: https://github.com/montagejs/montage/blob/master/test/core/super-spec.js        "Jasmine specs"
 [2]: https://github.com/montagejs/montage-testing        "montage-testing"
 [3]: https://github.com/montagejs/digit        "digit"
 [4]: https://github.com/montagejs/digit/blob/master/run-tests.html        "run-tests"
 [5]: https://github.com/montagejs/digit/tree/master/test        "test/all.js"
 [6]: https://github.com/montagejs/montage/blob/master/test/base/abstract-button-spec.js        "mocking their dependencies"

 Last edited: March 12, 2014
