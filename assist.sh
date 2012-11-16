#!/bin/bash

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TEMP=$HERE/.tmp_dir

if [ ! -d $TEMP ];
    then
        mkdir $TEMP
fi

cd  $TEMP
curl -s -o assist.zip https://nodeload.github.com/montagejs/assist/zip/master && tar -xf assist.zip

$TEMP/assist-master/scripts/_install.sh $HERE "$@"

rm -rf $TEMP