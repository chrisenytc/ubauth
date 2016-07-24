#!/usr/bin/env bash

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
    echo "Exporting Certificate file"
    export CERTIFICATE_P12=${TRAVIS_BUILD_DIR}/Certificate.p12;
    echo "Decoding Certificate"
    echo "$CERTIFICATE_OSX_P12" | base64 -D > "$CERTIFICATE_P12";
    echo "Exporting Keychain file"
    export KEYCHAIN=${TRAVIS_BUILD_DIR}/build.keychain;
    echo "Creating Keychain"
    security create-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN";
    echo "Setting Keychain as default"
    security default-keychain -s "$KEYCHAIN";
    echo "Unlocking Keychain"
    security unlock-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN";
    echo "Importing '${CERTIFICATE_P12}' to '${KEYCHAIN}'"
    security import "$CERTIFICATE_P12" -k "$KEYCHAIN" -P "$CERTIFICATE_PASSWORD" -T /usr/bin/codesign;
    echo "Certificate imported to '${KEYCHAIN}'"
fi
