#!/usr/bin/env bash

if [[ "$TRAVIS" != true ]]; then
    bundle install
    overcommit --install
fi

 cd app || exit

 npm install

 cd .. || exit
