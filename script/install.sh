#!/usr/bin/env bash

if [[ "$TRAVIS" == true ]]; then
  NVM_ROOT="${HOME}/.nvm"
  rm -rf "$NVM_ROOT"
  git clone https://github.com/creationix/nvm.git "$NVM_ROOT"
  # shellcheck disable=SC1090
  source "${NVM_ROOT}/nvm.sh"
  nvm install "$NODE_VERSION"
  node --version
  npm --version
else
  bundle install
  overcommit --install
fi


 cd app || exit

 npm install

 cd .. || exit
