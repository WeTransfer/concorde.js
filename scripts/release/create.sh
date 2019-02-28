#!/usr/bin/env bash

set -e

# Checkout master branch
echo "[GIT] Checking out master...."
git checkout master

node_modules/.bin/lerna bootstrap
node_modules/.bin/lerna publish --conventional-commits --github-release
