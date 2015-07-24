#!/usr/bin/env node
'use strict';

var repl = require('repl'),
    replServer = repl.start({ prompt: '>> ' });

replServer.context.sanitize = require('./lib/sanitize');
replServer.context.R = require('ramda');
