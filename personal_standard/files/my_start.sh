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
# jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root --NotebookApp.notebook_dir=$HOME --no-browser
/usr/local/bin/start-notebook.sh --ip=0.0.0.0 --port=8888 --NotebookApp.notebook_dir=$HOME --no-browser
