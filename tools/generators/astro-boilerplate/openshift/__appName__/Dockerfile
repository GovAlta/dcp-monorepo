# This is a minimal Dockerfile for app deployment.
FROM registry.access.redhat.com/ubi9/nginx-120

ARG PROJECT
COPY ./.openshift/${PROJECT}/nginx.conf "${NGINX_CONF_PATH}"
COPY ./dist/apps/${PROJECT} .

CMD nginx -g "daemon off;"
