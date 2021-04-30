FROM registry.mooplab.com:8443/moop-images/mooplab-base-gpu

LABEL maintainer="mooplab_personal"

USER root

COPY ./requirements* ./

RUN conda install -c pytorch \
    pytorch torchvision cudatoolkit=10.2 \
    && conda clean --all -y 

RUN pip install --no-cache-dir -r requirements_pip.txt \
    && conda clean --all -y 
