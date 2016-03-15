#!/bin/bash

git clone git@github.com:tmpvar/jsdom.git

LEVELS="level1 level2 level3"

cd jsdom

for level in $LEVELS; do
    git subtree split --prefix=lib/jsdom/$level --branch $level
done

git checkout --orphan dom
git rm -rf .
touch README
git add README
git commit -m "Initial commit"

for level in $LEVELS; do
    git subtree add --prefix=$level $level
done


git filter-branch --prune-empty --index-filter 'git ls-tree -r --name-only --full-tree $GIT_COMMIT | grep -v "^src/pyfedpkg$" |grep -v "^src/fedpkg" |grep -v "^git-changelog" | xargs git rm --cached -r' -- --all
