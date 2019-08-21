FROM jupyter/base-notebook

LABEL maintainer="WangZheng<wangzheng@datadynamic.io>"

USER root

COPY ./files/ ./

RUN cp ./temporary/sources.list /etc/apt/sources.list \
     && apt-get update\
    # chinese localization
    && apt-get install -y fontconfig \
    ttf-mscorefonts-installer\
    texlive-xetex\
    latex-cjk-chinese\
    texlive-fonts-recommended\
    language-pack-zh-hans language-pack-zh-hans-base\
    # Add sctelcom op C++/C 
    build-essential asciidoc binutils bzip2 gawk gettext git \
    libncurses5-dev libz-dev patch unzip zlib1g-dev lib32gcc1 \
    libc6-dev-i386 subversion flex uglifyjs git-core gcc-multilib \
    p7zip p7zip-full msmtp libssl-dev texinfo libglib2.0-dev xmlto \ 
    qemu-utils upx libelf-dev autoconf automake libtool autopoint zlib* \
    && apt-get -y autoremove && apt-get -y autoclean\
    && rm -rf /var/lib/apt/lists/* \

RUN rm /opt/conda/conda-meta/pinned\
    && conda install -c conda-forge matplotlib jupyter_contrib_nbextensions babel autopep8 \
    && conda clean --all -y 

ENV LC_ALL=zh_CN.UTF-8 LANG=zh_CN.UTF-8 LANGUAGE=zh_CN:zh:en_US:en
RUN bash -c '/bin/echo -e "y\n" | bash ./temporary/config.sh'

ENTRYPOINT ["bash"]
CMD ["/usr/local/bin/my_start.sh"]

