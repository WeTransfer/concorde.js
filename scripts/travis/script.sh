#!/bin/bash
set -e

# Lint our code
npm run lint
# Test our code and sen tge report
npm run test:ci
