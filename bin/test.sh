#!/usr/bin/env bash

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  export DISPLAY=":99.0"
  sh -e /etc/init.d/xvfb start +extension RANDR
  sleep 8
fi

NODE_EXEC_PATH=$(which node)

export NODE_PATH=$NODE_EXEC_PATH

./node_modules/.bin/electron-mocha build --ui bdd --timeout 80000 --reporter spec --inline-diffs --bail build
