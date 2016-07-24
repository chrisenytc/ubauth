#!/usr/bin/env bash

echo "Entering in app directory"

cd app || exit

echo "Installing app dependencies"

npm install
