#!/bin/bash

imgDir='../frontend/public/img/club-img'

for file in $imgDir/*.png ; do 
  convert $file ${file:0:-3}jpg
  rm $file
done
