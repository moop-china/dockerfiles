#!/bin/bash
# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

set -e

if [[ ! -z "${JUPYTERHUB_API_TOKEN}" ]]; then
  # launched by JupyterHub, use single-user entrypoint
  echo "1"
  exec /usr/local/bin/start-singleuser.sh "$@"
elif [[ ! -z "${JUPYTER_ENABLE_LAB}" ]]; then
  echo "2"
  . /usr/local/bin/start.sh jupyter lab "$@"
else
  echo "3"
  . /usr/local/bin/start.sh jupyter notebook "$@"
fi
