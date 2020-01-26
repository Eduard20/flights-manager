#!/bin/bash
COLOR_RESET="$(tput sgr0)"
COLOR_GREY="$(tput setaf 243)"

if [ ! -z "$1" ] && [ "$1" != "-html" ]; then
  JEST_CMD="jest $1 --coverage --collectCoverageFrom=src/**/$1.ts"
else
  JEST_CMD="jest --coverage"
fi

printf '\n%s%s\n%s\n\n%s' $COLOR_GREY 'Running command:' "$JEST_CMD" $COLOR_RESET
eval $JEST_CMD

if [[ "$@" == *"-html"* ]]; then
    opn coverage/lcov-report/index.html
fi