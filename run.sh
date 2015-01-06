#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l cvservice.log -a $WDIR/server/cvservice.js
