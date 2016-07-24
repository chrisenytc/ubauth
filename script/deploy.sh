#!/usr/bin/env bash

#npm run release -- --sign "$CODESIGN_KEY"

PKG=$(cat ./app/package.json)

VERSION=$(echo "$PKG" | jq '.version')

CLEANED_VERSION=${VERSION//\"}

export APP_VERSION="$CLEANED_VERSION"

echo "Deploying version '$APP_VERSION' to GitHub releases. ¯\\_(ツ)_/¯"
