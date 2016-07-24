#!/usr/bin/env bash

npm run release -- --sign "$CODESIGN_KEY"

PKG=$(cat "$TRAVIS_BUILD_DIR"/app/package.json)

VERSION=$(echo "$PKG" | jq '.version')

CLEANED_VERSION=${VERSION//\"}

export APP_VERSION=${CLEANED_VERSION}

echo "Deploying version ${APP_VERSION} to GitHub releases. ¯\\_(ツ)_/¯"

export RELEASED_PACKAGE_FILENAME="${TRAVIS_BUILD_DIR}/releases/ubauth-${APP_VERSION}-darwin-x64.dmg"
