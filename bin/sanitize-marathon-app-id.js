#!/usr/bin/env node

'use strict';

var meow = require('meow'),
    sanitize = require('../lib/sanitize'),
    cli = meow({
        help: [
            'Usage',
            '  sanitize-marathon-app-id <input>'
        ],
        pkg: '../package.json'
    }),
    inputText = cli.input[0];

if (!inputText) {
    cli.showHelp();
} else {
    /* eslint-disable no-console */
    console.log(sanitize(cli.input[0]));
}
