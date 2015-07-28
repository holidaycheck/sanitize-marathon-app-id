[![NPM Version](https://img.shields.io/npm/v/sanitize-marathon-app-id.svg?style=flat)](https://www.npmjs.org/package/sanitize-marathon-app-id)
[![Build Status](https://img.shields.io/travis/holidaycheck/sanitize-marathon-app-id/master.svg?style=flat)](https://travis-ci.org/holidaycheck/sanitize-marathon-app-id)
[![Coverage Status](https://img.shields.io/coveralls/holidaycheck/sanitize-marathon-app-id.svg?style=flat)](https://coveralls.io/r/holidaycheck/sanitize-marathon-app-id)
[![Dependencies](http://img.shields.io/david/holidaycheck/sanitize-marathon-app-id.svg?style=flat)](https://david-dm.org/holidaycheck/sanitize-marathon-app-id)

# sanitize-marathon-app-id

> :put_litter_in_its_place: Sanitize marathon app ids.

[Marathon](https://mesosphere.github.io/marathon) only allows a [limited character set](https://mesosphere.github.io/marathon/docs/rest-api.html#id) to be used in an app id.
If you generate these ids automatically based on e.g. current system information it is useful to sanitize the app id and filter all characters which are not allowed.

## Install

```
$ npm install sanitize-marathon-app-id
```

## Usage

### Programmatic usage

```js
var sanitize = require('sanitize-marathon-app-id');

var appId = sanitize('FOO_λ_BAR_1.0.0'); // → foo-bar-1-0-0
```

### CLI

```
$ sanitize-marathon-app-id --help

  Sanitize marathon app ids.

  Usage
    sanitize-marathon-app-id <input>
```
