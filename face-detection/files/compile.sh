source activate $ENV_NAME
rm $PRO_HOME/RetinaFace/rcnn/cython/*.so
cd $PRO_HOME/RetinaFace
make
cp $PRO_HOME/RetinaFace/rcnn/cython/*.so /usr/local/bin/