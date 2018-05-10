#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l cvservice.log -a $WDIR/node_modules/http-server/bin/http-server --cors -c-1 -p 8089
