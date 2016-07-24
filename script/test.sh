#!/usr/bin/env bash

NODE_EXEC_PATH=$(which node)

export NODE_PATH=$NODE_EXEC_PATH

"$TRAVIS_BUILD_DIR/node_modules/.bin/electron-mocha build --ui bdd --timeout 80000 --reporter spec --inline-diffs --bail $TRAVIS_BUILD_DIR/build"
