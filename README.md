Popcorn
===============

![Screenshot](assets/image/screenshot.jpg)

[Live Demo](http://montagejs.org/apps/popcorn/)

This demo application showcases how to structure and optimize a MontageJS application for tablets.

##Installation

To run this demo locally you need:

* A web server of your choice. MontageJS applications are client-side applications with no particular back-end dependency.
* Cloned GitHub repo of this demo.

To run the Popcorn demo locally, follow these steps:

1. Clone the popcorn [GitHub repo](https://github.com/montagejs/popcorn) in your desktop.

2. Spin up your preferred HTTP server and point your browser to the associated port to serve the popcorn directory.

    > During development MontageJS applications rely on XHR to load their various components and modules, which is why you will need a web server to serve the demo.

    > If you happen to have [minit](https://github.com/montagejs/minit), the Montage Initializer, installed (`npm install minit -g`) you can run `minit serve` from within the demo directory to set up a server on demand.

##Dependencies
The npm packages Popcorn depends on are versioned inside of the node_modules directory, in keeping with Node.js best practices.
To update dependencies you'll need to have node and npm installed.

## Application Structure

Folder / File | Description |
------------ | ------------- 
assets | Contains global styles and images for the application.
model | Contains the data model.
index.html | Is the entry-point HTML document.
LICENSE.md | Contains copyright information.
package.json | Describes your app and its dependencies.
README.md | Provides information about the demo application and how to install it.
ui | Contains the user interface components of the demo application.
node_modules | Contains the dependencies that power the demo application.

## Contact Us

Got questions? Join us on [irc.freenode.net#montage](http://webchat.freenode.net/?channels=montage).

Got feedback or want to report a bug? Let us know by creating a new [GitHub issue](https://github.com/montagejs/popcorn).

## Credit

This demo application was created by [MontageJS](http://montagejs.org).

