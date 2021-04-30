#!/bin/bash
source activate $ENV_NAME
jupyter nbextension enable autosavetime/main
jupyter nbextension enable hide_input_all/main
jupyter nbextension enable execute_time/ExecuteTime
jupyter nbextension enable hinterland/hinterland
jupyter nbextension enable highlighter/highlighter
jupyter nbextension enable widgetsnbextension
jupyter nbextension enable runtimer/main
jupyter nbextension enable toc2/main

set -e

. /usr/local/bin/start.sh $wrapper jupyter notebook "$@"
