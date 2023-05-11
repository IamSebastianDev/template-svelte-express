/** @format */

import { execSync } from 'node:child_process';

const commands = [
    'rm -rf .git', // remove the existing git repository
    'git init', // initialize a new git repository
    'git branch -m main', // rename the master branch to main branch
    'rm ./reset.js', // remove the reset file
    'git add . && git commit -m "chore: initial commit"', // create a initial commit
    'git checkout -b development', // create and checkout a development branch
];

// Execute the docker build command
execSync(commands.join(' && '), { stdio: 'inherit' });
