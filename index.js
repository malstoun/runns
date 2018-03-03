#!/usr/bin/env node

const path = require('path')
const fs = require('fs');
const runns = require('./lib/runns');

const [
	node,
	runner,
	...args
] = process.argv;

const pack = require(path.resolve(process.cwd(), 'package.json'));

if (pack && pack.runns) {
	runns(runner, args, pack.runns);
} else {
	process.exit(1);
}
