# Mooplab Docker images

## 基础镜像

建议普通用户从标准镜像开始定制

* baseimage:

中文化的基础镜像

* pro_standard:

中文化的标准镜像，如果仅仅需要加入python包，而不需要其他命令配合，那么无需修改Dockerfile，将Conda环境中所需的包加入requirement.txt, jupyter所需的python包加入requirement_pip.txt

* cplusplusimage:
C++基础镜像

* ch_locallization:
中文化项目，包括界面，matplib以及latex

## Docker Build

``` bash
docker build -t registry.mooplab.com/moop-release/jupyter-chinese/standard:20190625 -f Dockerfile .
```
