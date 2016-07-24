#!/usr/bin/env bash

echo "Getting node executable path"

NODE_EXEC_PATH=$(which node)

echo "Exporting node executable path"

export NODE_PATH=$NODE_EXEC_PATH

echo "Running tests"

istanbul cover electron-mocha -- --ui bdd --timeout 80000 --reporter spec --inline-diffs --bail build

if [ -f coverage/lcov.info ]; then
    codeclimate-test-reporter < coverage/lcov.info
fi
