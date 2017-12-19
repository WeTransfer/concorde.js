#!/usr/bin/env bash

set -e

# Checkout master branch
echo "[GIT] Checking out master...."
# git checkout master

# Pull the latest code from origin
echo "[GIT] Pulling latest changes..."
# git pull --rebase origin master

# Create a new branch to release from
echo "[GIT] Creating a new branch..."
date=`date +r%Y-%m-%d-%s`
git checkout -b release/$date

node_modules/.bin/lerna publish --conventional-commits --yes

git push --no-verify --follow-tags --set-upstream origin release/$date
