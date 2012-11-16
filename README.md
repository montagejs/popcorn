Sample Montage application
===============

This application is an example of how a Montage application can be structured and implemented.

This application depends on the Montage framework which isn't included in the repository. There are two easy ways to
install the Montage framework so that it can be loaded by this application.

If you have npm installed already simply type
```
npm install
```

If do not have npm you can use assist.sh script. This will download montage as a sibling to your application's directory
and create a symlink in the node_modules directory of the application.
```
./assist.sh link montage
```