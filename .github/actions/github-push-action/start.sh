#!/bin/sh
set -e

INPUT_BRANCH=${INPUT_BRANCH:-master}
INPUT_FORCE=${INPUT_FORCE:-false}
INPUT_TAGS=${INPUT_TAGS:-true}
INPUT_DIRECTORY=${INPUT_DIRECTORY:-'.'}
_FOLLOW_TAGS_OPTION='--no-follow-tags'
_FORCE_OPTION=''
REPOSITORY=${INPUT_REPOSITORY:-$GITHUB_REPOSITORY}

echo "follow_tags: $INPUT_FOLLOW_TAGS";
echo "Push to branch $INPUT_BRANCH";
[ -z "${INPUT_GITHUB_TOKEN}" ] && {
    echo 'Missing input "github_token: ${{ secrets.GITHUB_TOKEN }}".';
    exit 1;
};

if ${INPUT_FORCE}; then
    _FORCE_OPTION='--force'
fi

if ${INPUT_TAGS}; then
    _TAGS='--tags'
fi

cd ${INPUT_DIRECTORY}

remote_repo="https://${GITHUB_ACTOR}:${INPUT_GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

echo "_TAGS: ${_TAGS}"
echo "_FORCE_OPTIONS: ${_FORCE_OPTION}"
echo "_FOLLOW_TAGS_OPTION: ${_FOLLOW_TAGS_OPTION}"
git push "${remote_repo}" HEAD:${INPUT_BRANCH} --follow-tags $_FORCE_OPTION $_TAGS;
