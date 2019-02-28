#!/usr/bin/env bash

set -e

if [[ -z "${GH_TOKEN}" ]]; then
  echo "Error: A GH_TOKEN environment variable is required."
  exit 1
fi

if [[ -z "${NPM_TOKEN}" ]]; then
  echo "Error: A NPM_TOKEN environment variable is required."
  exit 1
fi

# Checkout master branch
echo "[GIT] Checking out master..."
git checkout master

node_modules/.bin/lerna bootstrap
node_modules/.bin/lerna publish --conventional-commits --github-release
