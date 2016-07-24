#!/usr/bin/env bash

echo "Updating brew"

brew update

echo "Installing jq module"

brew install jq

if [[ "$TRAVIS" == true ]]; then
  echo "Installing NVM"

  NVM_ROOT="${HOME}/.nvm"
  rm -rf "$NVM_ROOT"
  git clone https://github.com/creationix/nvm.git "$NVM_ROOT"
  # shellcheck disable=SC1090
  source "${NVM_ROOT}/nvm.sh"

  echo "Installing node.js"

  nvm install "$NODE_VERSION"
  node --version
  npm --version
else
  bundle install
  overcommit --install
fi

echo "Installing development dependencies"

npm install
