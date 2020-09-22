FROM jupyter/base-notebook

LABEL maintainer="mooplab_personal"

USER root

RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && apt-get update\
    # chinese localization
    && apt-get install -y build-essential fontconfig \
    ttf-mscorefonts-installer\
    texlive-xetex\
    latex-cjk-chinese\
    texlive-fonts-recommended\
    language-pack-zh-hans language-pack-zh-hans-base\
    libevent-dev \
    locales\
    # customer package
    vim git curl\
    graphviz\
    && apt-get -y autoremove && apt-get -y autoclean\
    && rm -rf /var/lib/apt/lists/* 

COPY ./requirements* ./

RUN rm /opt/conda/conda-meta/pinned \
    && conda install -c conda-forge \
	jupyter_contrib_nbextensions \
	babel \
	autopep8 \
	pip \
	ipywidgets

RUN pip install --no-cache-dir -r requirements_pip.txt -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com \
    # install mooplab packages
    && pip install https://github.com/sharkwang/pandas-profiling/releases/download/v2.9.0zh_CN/pandas_profiling-2.9.0zh_CN-py2.py3-none-any.whl \
    && conda clean --all -y 

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
    && fix-permissions /home/$NB_USER \
    && fix-permissions /opt/conda/etc/jupyter \
    && sed -i s@/cdn.plot.ly/@/cdn.mooplab.com/@g /opt/conda/lib/python3.8/site-packages/plotly/io/_html.py \
    && sed -i s@/cdn.plot.ly/@/cdn.mooplab.com/@g /opt/conda/lib/python3.8/site-packages/plotly/io/_base_renderers.py

USER $NB_USER
WORKDIR $HOME
ENTRYPOINT ["bash"]
CMD ["/usr/local/bin/my_start.sh"]
