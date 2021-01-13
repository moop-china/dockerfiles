#!/bin/bash
# python version == 2.7 or > 3.3 and need to run under conda env
# root privilege and under root path
# 默认字体和shell是在同一文件夹下
# call by dockerfile

conda info -e
python --version

# prepare environment variables
echo 'import sys' > python_lib_path.py
echo 'from distutils.sysconfig import get_python_lib; print (get_python_lib())' >> python_lib_path.py
# /opt/conda/lib/python3.7/site-packages
lib_path=`python python_lib_path.py`

echo 'import matplotlib' > matplotlib_path.py
echo 'import os' >> matplotlib_path.py
echo 'from matplotlib.font_manager import fontManager' >> matplotlib_path.py
echo "print(os.path.dirname(fontManager.defaultFont['ttf']))" >> matplotlib_path.py
matplotlib_font_path=`python matplotlib_path.py`

echo 'import matplotlib' > matplotlib_path.py
echo 'print(matplotlib.matplotlib_fname())' >> matplotlib_path.py
matplotlib_setting_path=`python matplotlib_path.py`

rm matplotlib_path.py
rm python_lib_path.py

# -------
echo 'setting jupyter interface...'
i18n_path=${lib_path}'/notebook/i18n'
cp $HOME/temporary/n* ${i18n_path}/zh_CN/LC_MESSAGES

cd ${i18n_path}
npm install -g po2json

pybabel compile -D notebook -f -l zh_CN -i zh_CN/LC_MESSAGES/notebook.po -o zh_CN/LC_MESSAGES/notebook.mo
pybabel compile -D nbui -f -l zh_CN -i zh_CN/LC_MESSAGES/nbui.po -o zh_CN/LC_MESSAGES/nbui.mo

# po2json -p -F -f jed1.x -d nbjs zh_CN/LC_MESSAGES/nbjs.po zh_CN/LC_MESSAGES/nbjs.json

# set the default lang on server
sed -i "4 i export LC_ALL=zh_CN.UTF-8" /usr/local/bin/start.sh
sed -i "4 i export LANG=zh_CN.UTF-8" /usr/local/bin/start.sh
sed -i "4 i export LANGUAGE=zh_CN:zh:en_US:en" /usr/local/bin/start.sh

# -------
echo 'preparing fonts...'
cd $HOME
chmod 777 ./temporary -R
mkdir /usr/share/fonts/chinese
cp ./temporary/msyh.ttf /usr/share/fonts/chinese
cp ./temporary/simhei.ttf /usr/share/fonts/chinese
# note that the pwd already changed
cd /usr/share/fonts/chinese
sudo mkfontscale
sudo mkfontdir
fc-cache

# ------
echo 'checking font family...'
txt=`fc-list :lang=zh`
font='Microsoft YaHei'
font_one='Microsoft YaHei'
font_two='SimHei'
if [[ $txt == *$font_one* ]]
then
    echo 'Microsoft YaHei found'
    font='Microsoft YaHei'
elif [[ $txt == *$font_two* ]]
then
    echo 'SimHei found'
    font='SimHei'
else
    exit
fi

# ------
echo 'config matplotlib'
cp /usr/share/fonts/chinese/simhei.ttf $matplotlib_font_path
cp /usr/share/fonts/chinese/msyh.ttf $matplotlib_font_path

sed -i "s/#font.family/font.family/" $matplotlib_setting_path
sed -i "s/#font.sans-serif/font.sans-serif/" $matplotlib_setting_path
sed -i "s/#axes.unicode_minus/axes.unicode_minus/" $matplotlib_setting_path
sed -i "s/font.sans-serif     :/font.sans-serif     : Microsoft YaHei, SimHei,/" $matplotlib_setting_path


# ------
echo 'config latex'
template_path=${lib_path}'/nbconvert/templates/latex/'
article=${template_path}'article.tplx'
base=${template_path}'base.tplx'
# if it is necessary to check the existent content to avoid duplicate?
# add setting to article, and delete ascii_only from base
sed -i "/\\documentclass\[11pt\]{article}/a \\\\\usepackage{indentfirst}\n\\\\usepackage{xeCJK}\n\\\\setCJKmainfont{${font}}" $article
sed -i "s/ | ascii_only//" $base

# ------
echo 'config jupyter'
jupyter notebook --y --generate-config
cp ${HOME}/temporary/jupyter_notebook_config.py /home/jovyan/.jupyter
path=${HOME}'/.jupyter/jupyter_notebook_config.py'
sed -i "/c.NotebookApp.notebook_dir/c c.NotebookApp.notebook_dir = '$notebook_dir' " $path

# ------
echo 'matpolotlib rebuild'
echo 'from matplotlib.font_manager import _rebuild' > rebuild.py
echo '_rebuild()' >> rebuild.py
python rebuild.py
rm rebuild.py

# ------
chmod 777 /home/jovyan/.jupyter/nbconfig/notebook.json

jupyter contrib nbextensions install
jupyter nbextension list
jupyter nbextension enable autosavetime/main
jupyter nbextension enable hide_input_all/main
jupyter nbextension enable execute_time/ExecuteTime
jupyter nbextension enable hinterland/hinterland
jupyter nbextension enable highlighter/highlighter

# -copy customer-----
mkdir -p /home/jovyan/.jupyter/custom/
cp ${HOME}/temporary/custom.* /home/jovyan/.jupyter/custom/

# ------
rm -r ${HOME}/temporary

echo 'please manually flash cache if exist, under $HOME/.cache/matplotlib'

source activate $ENV_NAME
python -m ipykernel install --user --name reco_base --display-name "Python (reco_base)"
