FROM registry.redhat.io/rhel9/nodejs-18

ARG PROJECT

COPY . .

CMD npm run -d service dist/apps/${PROJECT}/main.js