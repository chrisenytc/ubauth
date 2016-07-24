#!/usr/bin/env bash

echo "Building the package"

npm run release -- --sign "$CODESIGN_KEY"

echo "Loading package file"

PKG=$(cat ./app/package.json)

echo "Getting app version"

VERSION=$(echo "$PKG" | jq '.version')

CLEANED_VERSION=${VERSION//\"}

echo "Exporting app version"

export APP_VERSION=${CLEANED_VERSION}

echo "Deploying version ${APP_VERSION} to GitHub releases. ¯\\_(ツ)_/¯"
