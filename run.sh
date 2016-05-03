#!/bin/sh

if ! $(type nodemon > /dev/null); then 
	echo "Install nodemon first:\n\tnpm install -g nodemon"
	exit
fi

#node main.js
nodemon main.js
