#!/usr/bin/env bash

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  export DISPLAY=:99.0
  sh -e /etc/init.d/xvfb +extension RANDR start
  sleep 3
fi

npm test
