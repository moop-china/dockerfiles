#!/bin/bash
source activate $ENV_NAME
jupyter nbextension enable toc2/main
cp /usr/local/bin/*so $PRO_HOME/RetinaFace/rcnn/cython
# jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root
bash /usr/local/bin/start-notebook.sh --ip=0.0.0.0 --port=8888 