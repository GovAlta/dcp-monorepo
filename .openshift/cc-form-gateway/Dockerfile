FROM registry.redhat.io/rhel9/nodejs-18

ARG PROJECT

COPY ./dist/apps/${PROJECT} .

CMD npm run -d service dist/apps/${PROJECT}/main.js