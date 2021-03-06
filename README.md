# Hoodie Integration Tests
[![Build Status](https://travis-ci.org/hoodiehq/hoodie-integration-test.svg)](https://travis-ci.org/hoodiehq/hoodie-integration-test)
[![Dependency Status](https://david-dm.org/hoodiehq/hoodie-integration-test.svg)](https://david-dm.org/hoodiehq/hoodie-integration-test)
[![devDependency Status](https://david-dm.org/hoodiehq/hoodie-integration-test/dev-status.svg)](https://david-dm.org/hoodiehq/hoodie-integration-test#info=devDependencies)

*NOTE: When running this locally make sure to download and start the [Selenium Server](http://www.seleniumhq.org/download/) first*
*NOTE: currently this package has to be consumed via [grunt-subgrunt](https://github.com/tusbar/grunt-subgrunt).*

This repo includes a test scenario that mirrors the Hoodie end-user-experience from install & setup to first run. It exists to ensure that Hoodie is usable at all times by all users.

Tests can be run on [Travis](https://travis-ci.org) and/or locally.

```js
require('hoodie-integration-test')();
```

That's all (:

Should you be prompted to enter credentials like so `Please enter your CouchDB _admin credentials:` kill all running CouchDB processes.
```bash
ps ax | grep couch | awk '{print $1}' | xargs kill
``` 

## Local setup

```bash
grunt dev # creates a hoodie app for local debugging
```
