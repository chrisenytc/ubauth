#!/usr/bin/env bash

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
    export CERTIFICATE_P12=${TRAVIS_BUILD_DIR}/Certificate.p12;
    echo "$CERTIFICATE_OSX_P12" | base64 — decode > "$CERTIFICATE_P12";
    export KEYCHAIN=build.keychain;
    security create-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN;
    security default-keychain -s $KEYCHAIN;
    security unlock-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN;
    security import "$CERTIFICATE_P12" -k $KEYCHAIN -P "$CERTIFICATE_PASSWORD" -T /usr/bin/codesign;
fi
