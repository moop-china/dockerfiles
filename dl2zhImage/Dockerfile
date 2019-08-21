FROM jupyter/base-notebook

LABEL maintainer="mooplab"

# CMD ["start-notebook.sh"] from https://hub.docker.com/r/jupyter/base-notebook/dockerfile

USER root

COPY ./files/ ./

RUN apt-get update\
    # chinese localization
    && apt-get install -y fontconfig \
    ttf-mscorefonts-installer\
    texlive-xetex\
    latex-cjk-chinese\
    texlive-fonts-recommended\
    language-pack-zh-hans language-pack-zh-hans-base\
    graphviz\
    && apt-get -y autoremove && apt-get -y autoclean\
    && rm -rf /var/lib/apt/lists/* \
    # TOC extension and babel
    && pip install pydotplus image\
    && conda update -n base conda \
    # && pip install torch torchvision --upgrade -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && conda install -c conda-forge jupyter_contrib_nbextensions babel gensim scikit-image autopep8 \
    && pip install mxnet d2lzh \ 
    # && conda install pytorch-cpu torchvision-cpu -c pytorch \
    # notebooks' dependences
    && conda clean --all -y

ENV LC_ALL=zh_CN.UTF-8 LANG=zh_CN.UTF-8 LANGUAGE=zh_CN:zh:en_US:en
# $HOME is '/home/jovyan'
RUN bash -c '/bin/echo -e "y\n" | bash ./temporary/config.sh'

ENTRYPOINT ["bash"]
CMD ["/usr/local/bin/my_start.sh"]

# /usr/local/bin/start-notebook.sh
