FROM jupyter/base-notebook:38f518466042

LABEL maintainer="mooplab"

USER root

RUN apt-get update\
    # chinese localization
    && apt-get install -y fontconfig \
    ttf-mscorefonts-installer\
    texlive-xetex\
    latex-cjk-chinese\
    texlive-fonts-recommended\
    language-pack-zh-hans language-pack-zh-hans-base\
    graphviz\
    libevent-dev \
    gcc \
    locales\
    && apt-get -y autoremove && apt-get -y autoclean\
    && rm -rf /var/lib/apt/lists/* 

COPY ./requirements* ./

RUN rm /opt/conda/conda-meta/pinned\
    && conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/ \
    # && conda install -y -c conda-forge -c simpleitk --file requirements.txt \
    && conda install -c conda-forge jupyter_contrib_nbextensions babel autopep8 \
    && conda clean --all -y \
    # notebooks' dependences from Tsinghua pypi mirror
    && pip install --no-cache-dir -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements_pip.txt \
    # TOC extension and babel
    && conda install -c conda-forge jupyter_contrib_nbextensions\
    babel\
    # extensions
    autopep8

ARG NB_USER="jovyan"
ARG NB_UID="1000"
ARG NB_GID="100"

ENV LC_ALL=zh_CN.UTF-8 
ENV LANG=zh_CN.UTF-8 
ENV LANGUAGE=zh_CN:zh:en_US:en
ENV HOME=/home/$NB_USER 
ENV PATH=$CONDA_DIR/bin:$PATH

ENV ENV_NAME="base" 

COPY ./files/ ./

RUN chown -R $NB_USER:$NB_GID ${HOME} \
    && cp $HOME/my_start.sh /usr/local/bin/my_start.sh \
    && bash -c '/bin/echo -e "y\n" | bash ./temporary/config.sh'\
    && fix-permissions /home/$NB_USER

USER $NB_USER
WORKDIR $HOME
ENTRYPOINT ["bash"]
CMD ["/usr/local/bin/my_start.sh"]
