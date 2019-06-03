#!/bin/bash
source activate $ENV_NAME
jupyter nbextension enable toc2/main
jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root --NotebookApp.notebook_dir=$HOME
