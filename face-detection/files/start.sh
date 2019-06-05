#!/bin/bash
source activate $ENV_NAME
cp /usr/local/bin/*so $PRO_HOME/RetinaFace/rcnn/cython
jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root